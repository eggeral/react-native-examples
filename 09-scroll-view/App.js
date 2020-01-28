import React, { Component } from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';

export default class App extends Component {

  // -01- A ScrollView is used to be able to scroll if otherwise the View would be
  //   too long for the display

  render() {

    // This is a way to create sub items of a component in a loop.
    // using <ScrollView> {for (...) { <Text> } } </ScrollView> does not work 
    // each child should have a unique key prop
    var rows = [];
    for (var idx = 0; idx < 100; idx = idx + 2) {
      rows.push(<Text key={idx} style={{ backgroundColor: 'red', fontSize: 30 }}>Red</Text>)
      rows.push(<Text key={idx + 1} style={{ backgroundColor: 'blue', fontSize: 30 }}>Blue</Text>)
    }
    return (
      <ScrollView>
        {rows}
      </ScrollView >
    );
  }
}

