import React, { Component } from 'react';
import MyText from './MyText'
import {
  Platform,
  StyleSheet,
  Text,
  SafeAreaView,
  View
} from 'react-native';

// ? operator to switch platform specific code
// Platform.OS === 'ios' ? 'red' : 'green'

// Platform.select to switch css
// Platform.select({
//   ios: {
//     backgroundColor: 'red',
//   },
//   android: {
//     backgroundColor: 'blue',
//   }
//  })

// Platform.select to switch a component
const Touchable = Platform.select({
  ios: () => require('react-native').TouchableOpacity,
  android: () => require('react-native').TouchableNativeFeedback,
})();

// Switch components using file names 
// MyText.ios.js, MyText.android.js

export default class App extends Component {

  render() {

    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
        <Text style={styles.text1}>Hello World</Text>
        <Text style={styles.text2}>Hello World</Text>
        <MyText></MyText>
        <Touchable>
          <View style={{ width: 150, height: 100, backgroundColor: 'red' }}>
            <Text style={{ margin: 30 }}>Button</Text>
          </View>
        </Touchable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  text1: {
    color: Platform.OS === 'ios' ? 'red' : 'green',
  },
  text2: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      }
    })
  }
});
