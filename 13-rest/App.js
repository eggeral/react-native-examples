// add "json-server": "0.15.1" to package.json devDependencies
// npm install
// create ../vehicles-db.json file - The folder is important! That way expo ignores changes to the file!
// run ./node_modules/.bin/json-server ../vehicles-db.json


import React, { Component } from 'react';
import {
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

export default class App extends Component {

  state = {
    vehicles: []
  };

  fetchVehicles() {
    fetch('http://localhost:3000/vehicles')
      .then((response) => response.json())
      .then((vehicles) => this.setState({ vehicles }))
      .catch((error) => console.error(error));
  }

  createVehicle() {
    fetch('http://localhost:3000/vehicles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.vin,
        brand: this.state.brand,
        color: this.state.color,
        year: this.state.year
      })
    }).catch((error) => console.error(error));
  }

  componentDidMount() {
    this.fetchVehicles();
  }

  render() {
    return (
      <View style={styles.container}>

        <Button title="Reload" onPress={() => this.fetchVehicles()}></Button>
        <TextInput value={this.state.vin}
          onChangeText={text => this.setState({ vin: text })} placeholder="Vin"></TextInput>
        <TextInput value={this.state.brand}
          onChangeText={text => this.setState({ brand: text })} placeholder="Brand"></TextInput>
        <TextInput value={this.state.color}
          onChangeText={text => this.setState({ color: text })} placeholder="Color"></TextInput>
        <TextInput value={this.state.year}
          onChangeText={text => this.setState({ year: text })} type="number" placeholder="Year"></TextInput>
        <Button title="Create" onPress={() => this.createVehicle()}></Button>
        <FlatList
          data={this.state.vehicles}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <Text style={styles.item}>{item.id} - {item.color} - {item.year}</Text>
          }}
        >
        </FlatList >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
})
