import React, { Component } from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

export default class App extends Component {

  render() {

    // SafeAreaView tries to avoid cut outs and round edges
  
    // KeyboardAvoidingView tries to move the input field away from the keyboard
    // padding changes the CSS property paddingBottom of the KeyboardView
    // position moves the whole view up
    // I never rely got this to work :-( except for "position"
    // CMD-K to show the keyboard on iOS

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style = {{ flex: 1 }} behavior="position">
          <Text>Hello World 1</Text>
          <TextInput style={styles.input} placeholder="Enter something"></TextInput>
          <Text>Hello World</Text>
          <TextInput style={styles.input} placeholder="Enter something"></TextInput>
          <Text>Hello World</Text>
          <TextInput style={styles.input} placeholder="Enter something"></TextInput>
          <Text>Hello World</Text>
          <TextInput style={styles.input} placeholder="Enter something"></TextInput>
          <Text>Hello World</Text>
          <TextInput style={styles.input} placeholder="Enter something"></TextInput>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingBottom: 60
  }
})
