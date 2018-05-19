
package io.github.airamrguez;

import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

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

    TextPaint paint = createTextPaint(fontSize);
    WritableArray results = Arguments.createArray();

    for (int i = 0; i < texts.size(); i++) {
      String text = texts.getString(i);
      float spacingMultiplier = 1;
      float spacingAddition = 0;
      boolean includePadding = false;
      StaticLayout layout = new StaticLayout(
              text,
              paint,
              width,
              Layout.Alignment.ALIGN_NORMAL,
              spacingMultiplier,
              spacingAddition,
              includePadding
      );

      results.pushDouble((double)layout.getHeight());
    }

    promise.resolve(results);
  }

  @ReactMethod
  public void widths(ReadableMap options, Promise promise) {
    int height = Math.round((float)options.getDouble("height"));
    ReadableArray texts = options.getArray("texts");
    float fontSize = (float)options.getDouble("fontSize");

    TextPaint paint = createTextPaint(fontSize);
    WritableArray results = Arguments.createArray();

    for (int i = 0; i < texts.size(); i++) {
      String text = texts.getString(i);
      results.pushDouble((double)paint.measureText(text));
    }

    promise.resolve(results);
  }

  @Deprecated
  @ReactMethod
  public void measure(ReadableMap options, Promise promise) {
    heights(options, promise);
  }

  private TextPaint createTextPaint(float fontSize) {
    TextPaint paint = new TextPaint();
    paint.setAntiAlias(true);
    paint.setTextSize(fontSize);
    return paint;
  }

  private final ReactApplicationContext reactContext;
}
