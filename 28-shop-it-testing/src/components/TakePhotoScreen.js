import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class TakePhotoScreen extends Component {

  state = { hasPermission: null, type: Camera.Constants.Type.back }

  componentDidMount() {

    Permissions.askAsync(Permissions.CAMERA).then(result => {
      this.setState({ hasPermission: result.status === 'granted' });
    });

  }

  handlePictureTaken = (picture) => {

    this.props.navigation.getParam('onTaken')('data:image/jpeg;base64,'+ picture.base64);
    this.props.navigation.goBack();

  };


  takePicture() {
    if (this.camera) {
      this.camera.takePictureAsync({
        base64: true,
        quality: 0
      }).then(picture => {
        this.handlePictureTaken(picture);
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