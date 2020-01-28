import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends Component {
  render() {
    return (
      <View>
        {
          // The size of a view can be set using height and width styles
          // Default unit is pixel
          // Pixel are density independent pixel
          // auto (default) wraps the content
        }
        <View style={{ height: 100, width: 100, backgroundColor: 'red' }}></View>
        <View style={{ height: 200, width: 200, backgroundColor: 'green' }}></View>
        <View style={{ height: 50, width: '75%', backgroundColor: 'blue' }}></View>


        <View style={{ height: 300, width: 400, backgroundColor: 'lightgray' }}>
          {
            // Setting flex:1 tells the View to fill up all the space of its parent
            // When having more than one child View with flex >=1 the space is shared
            // between the children according to their flex value
          }
          <View style={{ flex: 1, backgroundColor: 'lightblue' }}></View>
          <View style={{ flex: 2, backgroundColor: 'blue' }}></View>
          <View style={{ flex: 4, backgroundColor: 'darkblue' }}></View>
        </View>
      </View>
    );
  }
}