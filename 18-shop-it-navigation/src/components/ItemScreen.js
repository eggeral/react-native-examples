import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';


// We do not keep the item as state here because it is already part of the state ot the ItemsScreen
export default class ItemScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Item',
      headerRight: () => {
        const item = navigation.getParam('item');
        return <Button
          disabled={item.name.length <= 0}
          onPress={() => {
            navigation.getParam('onOk')(item);
            navigation.goBack();
          }}
          title="Ok"
        />
      },
    }
  };

  state = { item: {}}

  componentDidMount() {
    const item = this.props.navigation.getParam('item');
    this.setState({ item: item })
  }

  changeItemName(name) {
    this.setState(state => {
      const newItem = { ...state.item, name: name };
      this.props.navigation.setParams({ item: newItem });
      return { item: newItem }
    });
  }

  changeItemCount(count) {
    this.setState(state => {
      const newItem = { ...state.item, count: count };
      this.props.navigation.setParams({ item: newItem });
      return { item: newItem }
    });
  }

  render() {
    return <View style={styles.container}>
      <TextInput
        style={styles.itemNameInput}
        value={this.state.item.name}
        placeholder="Add item"
        onChangeText={newText => this.changeItemName(newText)}
      />
      <View style={styles.countInputContainer}>
        <Button title="less"
          disabled={this.state.item.count <= 1}
          onPress={() => this.changeItemCount(this.state.item.count - 1)}
        ></Button>
        <Text style={styles.countText}>{this.state.item.count}</Text>
        <Button title="more"
          onPress={() => this.changeItemCount(this.state.item.count + 1)}
        ></Button>
      </View>
    </View>
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

  itemNameInput: {
    fontSize: 16
  },

  countInputContainer: {
    marginTop: 25,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },

  countText: {
    fontSize: 16
  }

});