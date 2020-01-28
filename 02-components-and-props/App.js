import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// -01- Components can be simple functions (Pure Components)
function Welcome(props) {
  // props holds the properties (props) of a component
  return <Text>Hello, {props.name}</Text>
}

// -02- Components can also be class
class Willkommen extends Component {
  // this.props holds the properties of a component
  render() {
    // Never try to change properties like this:
    // this.props.name = 'Never change properties!'
    return <Text>Hello, {this.props.name}</Text>
  }
}

export default class App extends Component {
  render() {
    const welcomeText = 'Test'
    return (
      <View style={styles.container}>
        { /* -03- props can be set using an attribute of the tag */ }
        <Welcome name="React"/>
        <Welcome name="Native"/>
        { /* -04- {} can hold references to variables or any JS expression} */ }
        <Willkommen name={welcomeText + ' - WORLD!'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});