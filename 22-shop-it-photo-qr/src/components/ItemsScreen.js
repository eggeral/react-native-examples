import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import ItemList from './ItemList';
import update from 'immutability-helper';

const server = "192.168.134.82"

export default class ItemsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], isFetching: false, currentItem: { name: '', count: 1 } };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Shop It',
      headerRight: () => (
        // we are in a static method so we have no access to the component instance
        <Button
          onPress={() => navigation.navigate('Item', {
            item: { name: '', count: 1 },
            onOk: navigation.getParam('createItem')
          })}
          title="Add"
        />
      ),
    }
  };

  componentDidMount() {
    this.fetchItems();
    this.props.navigation.setParams({ createItem: item => this.createItem(item) });
  }

  fetchItems() {
    this.setState({ isFetching: true });
    fetch('http://' + server + ':3000/items')
      .then((response) => response.json())
      .then((items) => {
        this.setState({ items })
        this.setState({ isFetching: false });
      })
      .catch((error) => console.error(error));
  }

  createItem(item) {
    fetch('http://' + server + ':3000/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((newItem) => {
        this.setState({ items: [...this.state.items, newItem] });
      })
      .catch((error) => console.error(error));
  }

  updateItem(item) {
    fetch('http://' + server + ':3000/items/' + item.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((newItem) => {
        const itemIndex = this.state.items.findIndex(it => it.id === item.id);
        const newItems = update(this.state.items, { $merge: { [itemIndex]: newItem } })

        this.setState({ items: newItems });
      })
      .catch((error) => console.error(error));
  }

  deleteItem(id) {
    fetch('http://' + server + ':3000/items/' + id, {
      method: 'DELETE',
    }).then(() => {
      this.setState({ items: this.state.items.filter(item => item.id != id) });
    }).catch((error) => console.error(error));
  }

  edit(id) {
    const item = this.state.items.find(it => it.id === id);
    this.props.navigation.navigate('Item', {
      item,
      onOk: item => this.updateItem(item)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemList
          items={this.state.items}
          isFetching={this.state.isFetching}
          onEditItem={(id) => this.edit(id)}
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
    marginTop: 10,
    marginBottom: 50,
    flex: 1,
    flexDirection: 'column',
  },

});
