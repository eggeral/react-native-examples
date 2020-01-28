import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class ItemList extends Component {

  render() {
    return <FlatList
      data={this.props.items}
      keyExtractor={item => '' + item.id}
      refreshing={this.props.isFetching}
      onRefresh={() => this.props.onRefresh()}
      renderItem={({ item }) => {
        return <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => this.props.onEditItem(item.id)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              {item.count && item.count > 1 &&
                <Text visible style={styles.itemText}> ({item.count})</Text>
              }
            </View>
          </TouchableOpacity>
          <View style={styles.spacer}></View>
          <Button style={styles.itemDeleteButton} title="-" onPress={() => this.props.onDeleteItem(item.id)}></Button>
        </View>
      }}
    >
    </FlatList >
  }

}

const styles = StyleSheet.create({

  itemText: {
    flex: 0,
    fontSize: 16
  },

  itemDeleteButton: {
  },

  spacer: {
    flex: 1
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

});

