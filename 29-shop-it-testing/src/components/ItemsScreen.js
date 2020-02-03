import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import ItemList from './ItemList';
import { itemsService } from '../state/ItemsService';
import { itemsQuery } from '../state/ItemsQuery';

export default class ItemsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], loading: false }; 
    this.edit = this.edit.bind(this); // make sure edit uses the right this
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Shop It',
      headerRight: () => (
        <Button
          accessibilityLabel="addButton"
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
    itemsQuery.selectAll().subscribe(items => this.setState({ items }));
    itemsQuery.selectLoading().subscribe(loading => this.setState({ loading }));
    itemsService.get();
    this.props.navigation.setParams({ createItem: item => itemsService.add(item) });
  }

  edit(id) {
    itemsService.setActive(id);
    this.props.navigation.navigate('Item', {
      item: itemsQuery.getEntity(id),
      onOk: item => itemsService.updateActive(item)
    });
  }

  refresh() {
    itemsService.get()
  }

  remove(id) {
    itemsService.remove(id)
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemList
          items={this.state.items}
          isFetching={this.state.loading}
          onEditItem={this.edit}
          onRefresh={this.refresh}
          onDeleteItem={this.remove}
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
