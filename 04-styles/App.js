import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MyOutput extends Component {
  render() {
    return <Text style={[this.props.style, { backgroundColor: 'yellow' }]}>Create style props</Text>
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          // Styles are defined by the style prop
          // They work more or less the same way as CSS
          // Just camel case the CSS name 
        }
        <Text style={{ backgroundColor: 'red', fontSize: 30 }}>Styles work like CSS</Text>
        {
          // Styles can be arrays. The last one overrides the previous
          // This can be used for inheritance
        }
        <Text style={[{ backgroundColor: 'red', fontSize: 30 }, { backgroundColor: 'green' }]}>Styles can be Arrays</Text>
        {
          // Pattern: Use StyleSheet.create to create styles
        }
        <Text style={styles.text}>Use StyleSheet.create</Text>
        {
          // Pattern: Use a style prop to cascade styles like in CSS
        }
        <MyOutput style={styles.text}>Use style props</MyOutput>

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
  text: {
    fontSize: 50,
    backgroundColor: 'blue'
  }
});