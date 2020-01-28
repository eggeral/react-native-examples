/*
Create components
Use one file for each component (in src/components)
Move the style to the component files
Share state

./node_modules/.bin/json-server ../shop-it-rest-db.json
*/

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddItem from './src/components/AddItem';
import ItemList from './src/components/ItemList';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], isFetching: false };
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

  createItem(item) {
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((newItem) => {
        this.setState({ items: [newItem, ...this.state.items] });
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
        <AddItem
          itemText={this.state.addItemText}
          onChangeText={newText => this.setState({ addItemText: newText })}
          onAdd={item => this.createItem(item)}
        >
        </AddItem>
        <ItemList
          items={this.state.items}
          isFetching={this.state.isFetching}
          onRefresh={() => this.fetchItems()}
          onDeleteItem={id => this.deleteItem(id)}
        >
        </ItemList>
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

});