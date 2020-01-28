/*
- Read the list of items from a REST service
- Write new items to the REST service
- The REST server automatically generates unique ids for items without id
- Add the new item to the local list but do not reload
- Remove items
- Reload items on pull down. See: https://facebook.github.io/react-native/docs/flatlist


run ./node_modules/.bin/json-server ../shop-it-rest-db.json

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
    this.state = { items: [], addItemText: '', isFetching: false };
  }

  fetchItems() {
    this.setState({ isFetching: true });
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((items) => {
        console.log('from server', items);
        this.setState({ items })
        this.setState({ isFetching: false });
      })
      .catch((error) => console.error(error));
  }

  createItem() {
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.addItemText })
    })
      .then((response) => response.json())
      .then((newItem) => {
        this.setState({ addItemText: '', items: [newItem, ...this.state.items] });
      })
      .catch((error) => console.error(error));
  }

  deleteItem(id) {
    fetch('http://localhost:3000/items/' + id, {
      method: 'DELETE',
    }).then(() => {
      this.setState({ items: this.state.items.filter(item => item.id != id) });
    }).catch((error) => console.error(error));
  }


  componentDidMount() {
    this.fetchItems();
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
            onPress={() => {
              if (this.state.addItemText.trim()) {
                this.createItem();
              }
            }}
            title="Add"
          />
        </View>
        <FlatList
          data={this.state.items}
          keyExtractor={item => '' + item.id}
          refreshing={this.state.isFetching}
          onRefresh={() => this.fetchItems()}
          renderItem={({ item }) => {
            return <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Button title="-" onPress={() => this.deleteItem(item.id)}></Button>
            </View>
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

  itemText: {
    flex: 1,
    fontSize: 16
  },

  item: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'row'
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