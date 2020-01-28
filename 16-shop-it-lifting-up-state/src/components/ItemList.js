import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default class ItemList extends Component {

    render() {
        return <FlatList
        data={this.props.items}
        keyExtractor={item => '' + item.id}
        refreshing={this.props.isFetching}
        onRefresh={() => this.props.onRefresh()}
        renderItem={({ item }) => {
          return <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button title="-" onPress={() => this.props.onDeleteItem(item.id)}></Button>
          </View>
        }}
      >
      </FlatList >
    }

}

const styles = StyleSheet.create({

    itemText: {
        flex: 1,
        fontSize: 16
    },

    item: {
        flex: 1,
        alignItems: "center",
        flexDirection: 'row'
    },
});

