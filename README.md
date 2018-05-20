# React Native Measure Text

Measure text height and/or width without laying it out.

[![npm version](https://badge.fury.io/js/react-native-measure-text.svg)](https://badge.fury.io/js/react-native-measure-text)

## Installation

### Automatic installation

Run

`$ yarn add react-native-measure-text`

or, if you want the latest features, then run:

`$ yarn add react-native-measure-text@next`

And then:

`$ react-native link react-native-measure-text`

### Manual installation

#### iOS

1.  In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.  Go to `node_modules` ➜ `react-native-measure-text` and add `RNMeasureText.xcodeproj`
3.  In XCode, in the project navigator, select your project. Add `libRNMeasureText.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4.  Run your project (`Cmd+R`)<

#### Android

1.  Open up `android/app/src/main/java/[...]/MainActivity.java`

* Add `import io.github.airamrguez.RNMeasureTextPackage;` to the imports at the top of the file
* Add `new RNMeasureTextPackage()` to the list returned by the `getPackages()` method

2.  Append the following lines to `android/settings.gradle`:
    ```
    include ':react-native-measure-text'
    project(':react-native-measure-text').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-measure-text/android')
    ```
3.  Insert the following lines inside the dependencies block in `android/app/build.gradle`:
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
const fontFamily = 'Anton';

class Test extends Component {
  state = {
    heights: [],
  }
  async componentDidMount() {
    const heights = await MeasureText.heights({(
      texts, /* texts to measure */
      width, /* container width */
      fontSize,
      fontFamily /* fontFamily is optional! */
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
              fontFamily,
              height: heights[i],
            }}
          >
            {text}
          </Text>
        ))}
    </View>
  }
}
```

## API

`MeasureText.heights(options)`

Returns a promise that resolves to all the heights of the texts passed in options.

`MeasureText.widths(options)`

Returns a promise that resolves to all the widths of the texts passed in options.

Measure options:

* `texts`: An array of texts to measure.
* `width`: Container width when you want to measure the height.
* `height`: Container height when you want to measure the width.
* `fontSize`: The size of the font.
* `fontFamily`: The name of a _custom_ font or a _preinstalled_ font. This is optional.

## How to use a custom font?

Follow these steps:

1.  Create `assets/fonts` at the root of your React Native project.
2.  Add this piece of JSON into your `package.json` file:

```
  "rnpm": {
    "assets": [
      "./assets/fonts/"
    ]
  }
```

3.  If you want to use the same font cross-platform, in order to avoid platform incompatibility issues, be sure that your font file name matches the font name! For example if the font name is "Anton" the file should be named "Anton.ttf". You can specify different fonts for each platform if you want.
4.  Run the command `react-native link` on the root of your project to link the added fonts.

You're ready to go!
