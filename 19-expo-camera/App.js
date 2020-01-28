// A lot of phone hardware can be accessed using the cross platform (android/ios/web) Expo API
// Not every feature is available on all platforms

// -01- expo install expo-camera
// access to camera works on device only. Not in the simulator

import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class App extends Component {

  state = { hasPermission: null, type: Camera.Constants.Type.back }

  componentDidMount() {

    // -02- ask for permission to use the camera. If already granted the response is granted otherwise the user is asked
    Permissions.askAsync(Permissions.CAMERA).then(result => {
      this.setState({ hasPermission: result.status === 'granted' });
    });

  }

  takePicture() {
    if (this.camera) {
      this.camera.takePictureAsync().then(picture => {
        this.setState({ imageUri: picture.uri });
      });
    }
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
        {
          // -03- use ref to get a reference of the camera
          // -04- barcode scanner [https://www.qrcode-generator.de]

          // ref= gets the camera so we can access it from the component
        }
        <Camera style={styles.camera}
          ref={ref => this.camera = ref}
          onBarCodeScanned={scanned => this.setState({ data: scanned.data })}
        >
        </Camera>
        <View style={styles.cameraControl}>
          <Image style={styles.preview} source={{ uri: this.state.imageUri }}></Image>
          <Text style={styles.data}>{this.state.data}</Text>
          <Button title="Take" onPress={() => this.takePicture()}></Button>
        </View>
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
  camera: {
    flex: 1
  },
  cameraControl: {
    height: 100,
    flexDirection: 'row'
  },
  preview: {
    flex: 1
  }

});