/*
Use a ScrollView to show all items of the list

Problem: What happens if the list grows even more?
ScrollView always renders to complete view regardless of if the part
is on the screen or not. 

We need something which renders "on demand" => see next chapter
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TextInput,
  View,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    let items = '';
    for (let idx = 0; idx < 50000; idx++) {
      // not shown on iOS at all
      // takes very long on Android to render the first view
      items += 'item - ' + idx + ' - \n';
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
                  items: state.items + "\n" + state.addItemText,
                  addItemText: ''
                }
              }
            })}
            title="Add"
          />
        </View>
        <ScrollView>
          <Text style={styles.itemList}>
            {this.state.items}
          </Text>
        </ScrollView >
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