#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#elif __has_include("RCTConvert.h")
#import "RCTConvert.h"
#else
#import "React/RCTConvert.h"   // Required when used as a Pod in a Swift project
#endif

#import "React/RCTFont.h"
#import "RNMeasureText.h"

@implementation RNMeasureText

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(heights:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    float width = [RCTConvert float:options[@"width"]];
    NSArray *texts = [RCTConvert NSArray:options[@"texts"]];
    CGFloat fontSize = [RCTConvert CGFloat:options[@"fontSize"]];
    NSString *fontFamily = [RCTConvert NSString:options[@"fontFamily"]];
    NSString *fontWeight = [RCTConvert NSString:options[@"fontWeight"]];

    NSMutableArray* results = [[NSMutableArray alloc] init];
    UIFont *font = [self getFont:fontFamily size:fontSize weight:fontWeight];

    for (NSString* text in texts) {
        NSTextContainer *textContainer = [[NSTextContainer alloc] initWithSize: CGSizeMake(width, FLT_MAX)];

        CGRect resultRect = [self fitText:text withFont:font container:textContainer];
        [results addObject:[NSNumber numberWithFloat:resultRect.size.height]];
    }
    resolve(results);
}

RCT_EXPORT_METHOD(widths:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    float height = [RCTConvert float:options[@"height"]];
    NSArray *texts = [RCTConvert NSArray:options[@"texts"]];
    CGFloat fontSize = [RCTConvert CGFloat:options[@"fontSize"]];
    NSString *fontFamily = [RCTConvert NSString:options[@"fontFamily"]];
    NSString *fontWeight = [RCTConvert NSString:options[@"fontWeight"]];
    
    NSMutableArray* results = [[NSMutableArray alloc] init];
    UIFont *font = [self getFont:fontFamily size:fontSize weight:fontWeight];
    
    for (NSString* text in texts) {
        NSTextContainer *textContainer = [[NSTextContainer alloc] initWithSize: CGSizeMake(FLT_MAX, height)];

        CGRect resultRect = [self fitText:text withFont:font container:textContainer];
        [results addObject:[NSNumber numberWithFloat:resultRect.size.width]];
    }
    resolve(results);
}

/**
 * Deprecated, use heights instead.
 */
RCT_EXPORT_METHOD(measure:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [self heights:options resolver:resolve rejecter:reject];
}

- (CGRect)fitText:(NSString*)text withFont:(UIFont *)font container:(NSTextContainer *)textContainer {
    NSTextStorage *textStorage = [[NSTextStorage alloc] initWithString:text];
    NSLayoutManager *layoutManager = [[NSLayoutManager alloc] init];

    [layoutManager addTextContainer:textContainer];
    [textStorage addLayoutManager:layoutManager];
    
    [textStorage addAttribute:NSFontAttributeName value:font
                        range:NSMakeRange(0, [textStorage length])];
    [textContainer setLineFragmentPadding:0.0];
    (void) [layoutManager glyphRangeForTextContainer:textContainer];
    return [layoutManager usedRectForTextContainer:textContainer];
}

- (UIFont *)getFont:(NSString *)fontFamily size:(CGFloat)fontSize weight:(NSString*)fontWeight {
    if (fontWeight == nil) {
        fontWeight = @"normal";
    };
    return fontFamily == nil ?
        [RCTConvert UIFont:@{@"fontWeight": fontWeight, @"fontSize": [NSNumber numberWithFloat:fontSize]}] :
        [RCTConvert UIFont:@{@"fontFamily": fontFamily, @"fontSize": [NSNumber numberWithFloat:fontSize], @"fontWeight": fontWeight}];
}
@end
