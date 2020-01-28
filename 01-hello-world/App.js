// Setup devel environment first. See ../README.md

// React Native uses ES2015 (import, from, class, extends, etc...) 
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// export default marks the entry point
export default function App() {
  return (
    // JSX syntax for embedding XML into JavaScript
    // Text and View are React Components
    // App itself is also a Component
    // React Applications are made out of Components
    // A basic component consists out of a render method which
    // returns some JSX
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
}

// CSS like styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});