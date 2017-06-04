
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
  public void measure(ReadableMap options, Promise promise) {
    if (!options.hasKey("width")) {
      promise.reject(ERR_INVALID_WIDTH, "missing required width property");
      return;
    }
    if (!options.hasKey("texts")) {
      promise.reject(ERR_INVALID_TEXTS, "missing required texts property");
      return;
    }
    if (!options.hasKey("fontSize")) {
      promise.reject(ERR_INVALID_FONT, "missing required fontSize property");
      return;
    }

    int width = Math.round((float)options.getDouble("width"));
    ReadableArray texts = options.getArray("texts");
    float fontSize = (float)options.getDouble("fontSize");

    TextPaint paint = new TextPaint();
    paint.setAntiAlias(true);
    paint.setTextSize(fontSize);

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

  private static final String ERR_INVALID_WIDTH = "ERR_INVALID_WIDTH";
  private static final String ERR_INVALID_TEXTS = "ERR_INVALID_TEXT";
  private static final String ERR_INVALID_FONT = "ERR_INVALID_FONT";

  private final ReactApplicationContext reactContext;
}
