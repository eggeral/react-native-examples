import React, { Component } from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component {

  brands = ["VW", "Audi", "Renault", "Mercedes", "Ford"];
  colors = ["Red", "Green", "Blue", "Yellow", "White", "Black"];

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    const vehicles = []
    for (let idx = 0; idx < 1000; idx++) {
      vehicles.push({
        brand: this.brands[this.getRandomInt(this.brands.length)],
        color: this.colors[this.getRandomInt(this.colors.length)],
        year: 1980 + this.getRandomInt(40),
        vin: 'aa' + idx + '-' + this.getRandomInt(1000000) + 'ggh'
      });
    }
    const vehiclesByBrand = vehicles.reduce((accumulator, vehicle) => {
      const existing = accumulator.find(section => section.brand === vehicle.brand);
      if (existing)
        existing.data.push(vehicle);
      else
        accumulator = [...accumulator, { brand: vehicle.brand, data: [vehicle] }];
      return accumulator;
    }, []);

    return (
      <View style={styles.container}>
        {
          // -01- A FlatList only renders the part which is currently in view
        }
        <FlatList
          data={vehicles}
          keyExtractor={item => item.vin}
          renderItem={({ item }) => {
            console.log('flat list render item', item.vin);
            return <Text style={styles.item}>{item.vin} - {item.color} - {item.year}</Text>
          }}
        >
        </FlatList >

        <View style={{ height: 50, backgroundColor: "green" }}></View>
        {
          // -02- A SectionList. Same as FlatList but with section markers
        }
        <SectionList
          sections={vehiclesByBrand}
          keyExtractor={item => item.vin}
          renderItem={({ item }) => {
            console.log('section list render item', item.vin);
            return <Text style={styles.item}>{item.vin} - {item.color} - {item.year}</Text>
          }}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.brand}</Text>}
        >
        </SectionList >

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'lightgrey',
  },
})
