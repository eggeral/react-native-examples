import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, TextInput, Image } from 'react-native';
import { QrCodeButton, CameraButton } from './Buttons';
export default class ItemScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Item',
      headerRight: () => {
        const item = navigation.getParam('item');
        return <Button
          disabled={item.name.length <= 0}
          onPress={() => {
            navigation.getParam('onOk')(navigation.getParam('item'));
            navigation.goBack();
          }}
          accessibilityLabel="okButton"
          title="Ok"
        />
      },
    }
  };

  state = { item: {} }

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

  changeItemPhoto(photo) {
    this.setState(state => {
      const newItem = { ...state.item, photo: photo };
      this.props.navigation.setParams({ item: newItem });
      return { item: newItem }
    });
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.nameInputContainer}>
        <TextInput
          style={styles.itemNameInput}
          value={this.state.item.name}
          placeholder="Add item"
          accessibilityLabel="itemNameInput"
          onChangeText={newText => this.changeItemName(newText)}
        />
        <QrCodeButton
          onPress={() => {
            this.props.navigation.navigate('QrCodeScanner', {
              onScanned: data => this.changeItemName(data)
            })
          }} />
      </View>
      <View style={styles.countInputContainer}>
        <Button title="less"
          disabled={this.state.item.count <= 1}
          accessibilityLabel="lessButton"
          onPress={() => this.changeItemCount(this.state.item.count - 1)}
        ></Button>
        <Text style={styles.countText}>{this.state.item.count}</Text>
        <Button title="more"
          accessibilityLabel="moreButton"
          onPress={() => this.changeItemCount(this.state.item.count + 1)}
        ></Button>
      </View>
      <View style={styles.takePhotoContainer}>
        <CameraButton
          accessibilityLabel="takePhotoButton"
          onPress={() => this.props.navigation.navigate('TakePhoto', {
            onTaken: data => this.changeItemPhoto(data)
          })} />
        <Image style={styles.photo} source={{ uri: this.state.item.photo }}></Image>
        {this.state.item.photo &&
          <Button title="X"
            accessibilityLabel="clearPhotoButton"
            onPress={() => this.changeItemPhoto(undefined)}
          ></Button>
        }
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

  nameInputContainer: {
    marginTop: 0,
    flex: 0,
    flexDirection: 'row',
  },

  itemNameInput: {
    fontSize: 16,
    flex: 1
  },

  countInputContainer: {
    marginTop: 10,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },

  takePhotoContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center'
  },

  countText: {
    fontSize: 16
  },

  photo: {
    flex: 1,
    marginTop: 10,
    width: 300,
    height: 100,
    resizeMode: 'contain',
  }

});