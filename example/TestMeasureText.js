import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
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

export default class TestMeasureText extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      heights: 0,
      widths: 0,
    };
  }
  async componentDidMount() {
    const heights = await MeasureText.heights({
      texts: TEXTS,
      width: TEXT_WIDTH,
      fontSize: FONT_SIZE,
    });
    const widths = await MeasureText.widths({
      texts: TEXTS,
      height: TEXT_HEIGHT,
      fontSize: FONT_SIZE,
    });
    this.setState({ heights, widths });
  }
  render() {
    const { heights, widths } = this.state;
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
