// -01- expo install expo-barcode-scanner

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class App extends Component {

  state = { hasPermission: null }

  componentDidMount() {

    Permissions.askAsync(Permissions.CAMERA).then(result => {
      this.setState({ hasPermission: result.status === 'granted' });
    });

  }

  render() {

    if (this.state.hasPermission === null) {
      return <Text>Trying to get Camera permission</Text>;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner style={styles.scanner}
          onBarCodeScanned={({ type, data }) => this.setState({ type, data })}
        />
        <Text style={styles.preview}>{this.state.type + ' - ' + this.state.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 48
  },
  scanner: {
    flex: 1
  },
  preview: {
    height: 100
  }

});