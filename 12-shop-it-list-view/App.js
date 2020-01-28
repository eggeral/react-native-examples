/*
Use a FlatList to show all items of the list

Use an array to store the items

*/

import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  Button,
  TextInput,
  View,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    let items = [];
    for (let idx = 0; idx < 5000000; idx++) {
      items.push({ key: '' + idx, name: 'item - ' + idx + ' -' });
    }
    this.state = { items: items, addItemText: '' };
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
                  items: [{ key: '' + state.items.length, name: state.addItemText }, ...state.items],
                  addItemText: ''
                }
              }
            })}
            title="Add"
          />
        </View>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => {
            return <Text style={styles.item}>{item.name}</Text>
          }}
        >
        </FlatList >
      </View>
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

  item: {
    fontSize: 16
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