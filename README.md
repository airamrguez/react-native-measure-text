# React Native Measure Text
# Both platform support Now!

Measure text height without laying it out.

## Installation

### Automatic installation

`$ npm install react-native-measure-text-with-fontfamily --save`

`$ react-native link`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-measure-text` and add `RNMeasureText.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNMeasureText.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import io.github.airamrguez.RNMeasureTextPackage;` to the imports at the top of the file
  - Add `new RNMeasureTextPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-measure-text'
  	project(':react-native-measure-text').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-measure-text/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-measure-text')
  	```

## Usage
```javascript
import MeasureText from 'react-native-measure-text';

const texts = [
  'This is an example',
  'This is the second line'
];
const width = 100;
const fontSize = 15;

class Test extends Component {
  state = {
    heights: [],
  }
  async componentDidMount() {
    const heights = await MeasureText.measure({(
      texts, /* texts to measure */
      width, /* container width */
      fontSize,
      fontFamily:'Montserrat-Regular',
    );
    this.setState({ heights });
  }
  render() {
    const { heights } = this.state;
    return (
      <View>
        {texts.map((text, i) => (
          <Text
            key={`text-${i}`}
            style={{
              width,
              fontSize,
              height: heights[i],
            }}
          >
            {text}
          </Text>
        ));
      );}
    </View>
  }
}
```
