import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class QrCodeScannerScreen extends Component {

  state = { hasPermission: null, scanned: false }

  static navigationOptions = {
    title: 'Scan QR Code'
  };

  componentDidMount() {

    Permissions.askAsync(Permissions.CAMERA).then(result => {
      this.setState({ hasPermission: result.status === 'granted' });
    });

  }

  handleBarCodeScanned = (type, data) => {

    console.log("Scanned", type, data);
    this.props.navigation.getParam('onScanned')(data);
    this.props.navigation.goBack();

  };

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
          onBarCodeScanned={({ type, data }) => this.handleBarCodeScanned(type, data)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scanner: {
    flex: 1
  },


});