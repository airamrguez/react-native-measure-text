import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  PixelRatio,
  Platform,
} from 'react-native';
import MeasureText from 'react-native-measure-text';

const BASE_FONT_SIZE = 15;
const FONT_SIZE =
  Platform.OS === 'ios'
    ? BASE_FONT_SIZE
    : BASE_FONT_SIZE * PixelRatio.getFontScale();

const TEXTS = [
  'This is a first string',
  'The second string is slightly bigger',
  'Bacon ipsum dolor amet capicola filet mignon flank venison ball tip pancetta cupim tenderloin bacon beef shank.',
];

const TEXT_WIDTH = 100;
const TEXT_HEIGHT = 20;

// This example is using preinstalled fonts in the device, but
// you can use custom fonts.
const PREINSTALLED_FONT = Platform.select({
  ios: 'EuphemiaUCAS',
  android: 'monospace',
});
const ANTON_FONT = 'Anton';

export default class TestMeasureText extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      heights: 0,
      widths: 0,
      useAntonFont: false,
    };
  }
  componentDidMount() {
    this.measure();
  }
  async measure() {
    const { useAntonFont } = this.state;
    const fontFamily = useAntonFont ? ANTON_FONT : PREINSTALLED_FONT;
    const [heights, widths] = await Promise.all([
      MeasureText.heights({
        texts: TEXTS,
        width: TEXT_WIDTH,
        fontSize: FONT_SIZE,
        fontFamily,
      }),
      MeasureText.widths({
        texts: TEXTS,
        height: TEXT_HEIGHT,
        fontSize: FONT_SIZE,
        fontFamily,
      }),
    ]);
    this.setState({ heights, widths });
  }
  toggleFont = () => {
    this.setState(
      state => ({
        useAntonFont: !state.useAntonFont,
      }),
      this.measure,
    );
  };
  render() {
    const { heights, widths, useAntonFont } = this.state;
    let buttonText;
    let fontFamily;
    if (useAntonFont) {
      buttonText = 'Switch to preinstalled fonts';
      fontFamily = ANTON_FONT;
    } else {
      buttonText = 'Switch to Anton font';
      fontFamily = PREINSTALLED_FONT;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text>Height examples:</Text>
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
                  fontFamily,
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
                  fontFamily,
                  width: widths[i],
                  backgroundColor: 'orangered',
                  color: '#fff',
                }}
              >
                {text}
              </Text>
            </View>
          ))}
          <Button onPress={this.toggleFont} title={buttonText} />
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
