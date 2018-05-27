import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Switch,
  PixelRatio,
  Platform,
} from 'react-native';
import MeasureText from 'react-native-measure-text';

const FONT_SIZE = 15;

const TEXTS = [
  'This is a first string',
  'The second string is slightly bigger',
  'Bacon ipsum dolor amet capicola filet mignon flank venison ball tip pancetta cupim tenderloin bacon beef shank.',
];

const TEXT_WIDTH = 108;
const TEXT_HEIGHT = 20;

// This example is using preinstalled fonts in the device, but
// you can use custom fonts.
const PREINSTALLED_FONT = Platform.select({
  ios: undefined,
  android: 'monospace',
});
const CUSTOM_FONT = 'Arvo';

export default class TestMeasureText extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      heights: 0,
      widths: 0,
      useCustomFont: false,
      fontWeight: 'normal',
    };
  }
  componentDidMount() {
    this.measure();
  }
  async measure() {
    const { useCustomFont, fontWeight } = this.state;
    const fontFamily = useCustomFont ? CUSTOM_FONT : PREINSTALLED_FONT;
    const [heights, widths] = await Promise.all([
      MeasureText.heights({
        texts: TEXTS,
        width: TEXT_WIDTH,
        fontSize: FONT_SIZE,
        fontWeight,
        fontFamily,
        fontWeight,
      }),
      MeasureText.widths({
        texts: TEXTS,
        height: TEXT_HEIGHT,
        fontSize: FONT_SIZE,
        fontWeight,
        fontFamily,
        fontWeight,
      }),
    ]);
    this.setState({ heights, widths });
  }
  toggleFont = () => {
    this.setState(
      state => ({
        useCustomFont: !state.useCustomFont,
      }),
      this.measure,
    );
  };
  toggleFontWeight = () => {
    this.setState(
      state => ({
        fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold',
      }),
      this.measure,
    );
  };
  render() {
    const { heights, widths, useCustomFont, fontWeight } = this.state;
    let buttonText;
    let fontFamily;
    if (useCustomFont) {
      buttonText = 'Switch to preinstalled fonts';
      fontFamily = 'Arvo';
    } else {
      buttonText = 'Switch to Arvo font';
      fontFamily = PREINSTALLED_FONT;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text>Height examples:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Switch
              value={fontWeight === 'bold'}
              onValueChange={this.toggleFontWeight}
            />
            <Text>Use bold style</Text>
            <Button onPress={this.toggleFont} title={buttonText} />
          </View>
          {TEXTS.map((text, i) => (
            <View
              key={`text-block-${i}`}
              style={{ backgroundColor: 'aliceblue' }}
            >
              <Text>
                Text: {i} Height: {heights[i]} Width: {widths[i]}
              </Text>
              <Text
                style={{
                  width: TEXT_WIDTH,
                  fontSize: FONT_SIZE,
                  fontWeight,
                  fontFamily,
                  fontWeight,
                  height: heights[i],
                  backgroundColor: 'coral',
                  color: '#fff',
                }}
              >
                {text}
              </Text>
            </View>
          ))}
          <Text style={{ marginTop: 15 }}>Width examples:</Text>
          {TEXTS.map((text, i) => (
            <View
              key={`text-block-${i}`}
              style={{ backgroundColor: 'aliceblue' }}
            >
              <Text>
                Text: {i} Width: {widths[i]}
              </Text>
              <Text
                style={{
                  height: TEXT_HEIGHT,
                  fontSize: FONT_SIZE,
                  fontWeight,
                  fontFamily,
                  fontWeight,
                  width: widths[i],
                  backgroundColor: 'orangered',
                  color: '#fff',
                }}
              >
                {text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
