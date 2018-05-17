#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#elif __has_include("RCTConvert.h")
#import "RCTConvert.h"
#else
#import "React/RCTConvert.h"   // Required when used as a Pod in a Swift project
#endif

#import "RNMeasureText.h"

@implementation RNMeasureText

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

- (NSArray*)measureTexts:(NSArray *)texts width:(float )width font:(UIFont *)font {
    NSMutableArray* results = [[NSMutableArray alloc] init];

    for (NSString* text in texts) {
        NSTextStorage *textStorage = [[NSTextStorage alloc] initWithString:text];
        NSTextContainer *textContainer = [[NSTextContainer alloc] initWithSize: CGSizeMake(width, FLT_MAX)];
        NSLayoutManager *layoutManager = [[NSLayoutManager alloc] init];
        
        [layoutManager addTextContainer:textContainer];
        [textStorage addLayoutManager:layoutManager];
        
        [textStorage addAttribute:NSFontAttributeName value:font
                            range:NSMakeRange(0, textStorage.length)];
        [textContainer setLineFragmentPadding:0.0];
        (void) [layoutManager glyphRangeForTextContainer:textContainer];
        CGRect resultRect = [layoutManager usedRectForTextContainer:textContainer];
        
        [results addObject:@{
            @"width": @(resultRect.size.width),
            @"height": @(resultRect.size.height)
        }];
    }

    return results;
}

- (NSArray*)measureWithOptions:(NSDictionary *)options rejecter:(RCTPromiseRejectBlock)reject {
    
    if (options[@"width"] == nil) {
        reject(@"invalid_width", @"missing required width property", nil);
        return nil;
    }
    if (options[@"texts"] == nil) {
        reject(@"invalid_texts", @"missing required texts property", nil);
        return nil;
    }
    if (options[@"fontSize"] == nil) {
        reject(@"invalid_fontSize", @"missing required fontSize property", nil);
        return nil;
    }

    float width = [RCTConvert float:options[@"width"]];
    NSArray *texts = [RCTConvert NSArray:options[@"texts"]];
    CGFloat fontSize = [RCTConvert CGFloat:options[@"fontSize"]];
    UIFont *font = options[@"fontFamily"] == nil
        ? [UIFont systemFontOfSize: fontSize]
        : [UIFont fontWithName:options[@"fontFamily"] size:fontSize];
    
    return [self measureTexts:texts width:width font:font];
}

RCT_EXPORT_METHOD(measureSizes:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSArray *sizes = [self measureWithOptions:options rejecter:reject];
    if (sizes == nil) return;

  resolve(sizes);
}

RCT_EXPORT_METHOD(measure:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSArray *sizes = [self measureWithOptions:options rejecter:reject];
    if (sizes == nil) return;

    NSMutableArray* results = [[NSMutableArray alloc] init];
    for (NSDictionary* size in sizes) {
        [results addObject:size[@"height"]];
    }
  resolve(results);
}

@end
