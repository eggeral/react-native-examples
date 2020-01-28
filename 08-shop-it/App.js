/*
= Implement a shopping list. 

* A TextInput and a Button to add items. 
* A Text to show the items.

= Consider the layout.
* TextInput and Button should be on the top.
* Button should be at the top right corner.
* try using https://yogalayout.com/playground/

Problem: What happens if the list grows out of the screen => next chapter "ScrollView"
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: '', addItemText: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addItemsContainer}>
          <TextInput
            style={styles.addItemsInput}
            value={this.state.addItemText}
            placeholder="Add item"
            onChangeText={newText => this.setState({ addItemText: newText })}
          />
          <Button
            style={styles.addItemsButton}
            onPress={() => this.setState((state) => {
              if (state.addItemText) {
                return {
                  items: state.items + "\n" + state.addItemText,
                  addItemText: ''
                }
              }
            })}
            title="Add"
          />
        </View>
        <Text style={styles.itemList}>
          {this.state.items}
        </Text>
      </View >
    );

  }
}

const styles = StyleSheet.create({

  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    flexDirection: 'column',
  },

  itemList: {
    flex: 1,
    fontSize: 28
  },

  addItemsContainer: {
    flexDirection: 'row',
    height: 36
  },

  addItemsInput: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    padding: 5,
    fontSize: 28,
    flex: 1
  },

  addItemsButton: {
    width: 50
  }
});