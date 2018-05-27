
package io.github.airamrguez;

import android.os.Build;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.content.res.AssetManager;
import java.lang.Math;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import com.facebook.react.views.text.ReactFontManager;

public class RNMeasureTextModule extends ReactContextBaseJavaModule {
  public RNMeasureTextModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNMeasureText";
  }  

  @ReactMethod
  public void heights(ReadableMap options, Promise promise) {
    int width = Math.round((float)options.getDouble("width"));
    ReadableArray texts = options.getArray("texts");
    float fontSize = (float)options.getDouble("fontSize");
    String fontFamily = options.getString("fontFamily");
    String fontWeight = options.getString("fontWeight");

    TextPaint paint = createTextPaint(fontSize, fontFamily, fontWeight);
    WritableArray results = Arguments.createArray();

    for (int i = 0; i < texts.size(); i++) {
      String text = texts.getString(i);
      float spacingMultiplier = 1;
      float spacingAddition = 0;
      boolean includePadding = false;
      Layout layout;
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
        layout = new StaticLayout(
          text,
          paint,
          width,
          Layout.Alignment.ALIGN_NORMAL,
          1.f,
          0.f,
          includePadding
        );
      } else {
        layout = StaticLayout.Builder.obtain(text, 0, text.length(), paint, width)
          .setAlignment(Layout.Alignment.ALIGN_NORMAL)
          .setLineSpacing(0.f, 1.f)
          .setIncludePad(includePadding)
          .setBreakStrategy(textBreakStrategy)
          .setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_NORMAL)
          .build();
      }
      results.pushDouble(layout.getHeight());
    }

    promise.resolve(results);
  }

  @ReactMethod
  public void widths(ReadableMap options, Promise promise) {
    int height = Math.round((float)options.getDouble("height"));
    ReadableArray texts = options.getArray("texts");
    float fontSize = (float)options.getDouble("fontSize");
    String fontFamily = options.getString("fontFamily");
    String fontWeight = options.getString("fontWeight");

    TextPaint paint = createTextPaint(fontSize, fontFamily, fontWeight);
    WritableArray results = Arguments.createArray();

    for (int i = 0; i < texts.size(); i++) {
      String text = texts.getString(i);
      results.pushDouble(paint.measureText(text));
    }
    promise.resolve(results);
  }

  @Deprecated
  @ReactMethod
  public void measure(ReadableMap options, Promise promise) {
    heights(options, promise);
  }

  private TextPaint createTextPaint(float fontSize, String fontFamily, String fontWeight) {
    TextPaint paint = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);
    paint.setTextSize(fontSize * this.reactContext.getResources().getConfiguration().fontScale);
    AssetManager assetManager = getReactApplicationContext().getAssets();
    Typeface typeface = ReactFontManager.getInstance().getTypeface(fontFamily, getFontWeight(fontWeight), assetManager);
    paint.setTypeface(typeface);
    return paint;
  }

  /**
   * Android P is adding new typefaces. This should be updated by that time.
   */
  private int getFontWeight(String fontWeight) {
    switch (fontWeight) {
      case "bold":
      case "500":
      case "600":
      case "700":
      case "800":
      case "900":
        return Typeface.BOLD;
      case "normal":
      case "100":
      case "200":
      case "300":
      case "400":
      default:
        return Typeface.NORMAL;
    }
  }

  private final ReactApplicationContext reactContext;
  private int textBreakStrategy = (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) ? 0 : Layout.BREAK_STRATEGY_HIGH_QUALITY;
}
