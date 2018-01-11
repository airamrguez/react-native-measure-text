import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, PixelRatio, Platform } from 'react-native';
import MeasureText from 'react-native-measure-text-with-fontfamily';

const BASE_FONT_SIZE = 15;
const FONT_SIZE = Platform.OS === 'ios'
  ? BASE_FONT_SIZE
  : BASE_FONT_SIZE * PixelRatio.getFontScale();

const TEXTS = [
  'This is a first string',
  'The second string is slightly bigger',
  'Bacon ipsum dolor amet capicola filet mignon flank venison ball tip pancetta cupim tenderloin bacon beef shank.',
  'Small',
];

const TEXT_WIDTH = 100;

async function measureTexts(texts, width, fontSize) {
  return await MeasureText.measure({
    texts,
    width,
    fontSize
  });
}
async function measureTextSizes(texts, width, fontSize) {
  return await MeasureText.measureSizes({
    texts,
    width,
    fontSize
  });
}

export default class TestMeasureText extends Component {
 constructor(...args) {
   super(...args);
   this.state = {
     heights: [],
     sizes: [],
   };
 }
 async componentDidMount() {
   const heights = await measureTexts(TEXTS, TEXT_WIDTH, FONT_SIZE);
   const sizes = await measureTextSizes(TEXTS, TEXT_WIDTH, FONT_SIZE);
   this.setState({ heights, sizes });
 }
 render() {
   const { heights, sizes } = this.state;
   return (
     <View style={styles.container}>
       <ScrollView style={{ flex: 1 }}>
         {TEXTS.map((text, i) => (
           <View key={`text-block-${i}`} style={{backgroundColor: 'aliceblue'}}>
             <Text>Text: {i} Height: {heights[i]}, width: {sizes[i] && sizes[i].width}</Text>
             <View style={{position: 'relative'}}>
               <Text
                 style={{
                   width: TEXT_WIDTH,
                   fontSize: FONT_SIZE,
                   height: heights[i],
                   backgroundColor: 'coral',
                   color: '#fff'
                 }}
              >
                 {text}
               </Text>
               <View style={[{position: 'absolute', backgroundColor: 'green', opacity: 0.3, top: 0}, sizes[i]]}/>
             </View>
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
   margin: 10
 },
 instructions: {
   textAlign: 'center',
   color: '#333333',
   marginBottom: 5
 }
});
