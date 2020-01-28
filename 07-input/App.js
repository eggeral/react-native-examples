import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '', count: 0 };
  }

  // use arrow function to bind "this" correctly to the instance of Component
  clear = () => {
    this.setState({ text: '', count: 0 });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // -01- simple text input which copies the input to another text field
          // This is a so called "controlled component" which means that we keep the
          // value of the TextInput in sync with the component state
          // There are also "uncontrolled components" but they should be avoided!
        }
        <TextInput
          value={this.state.text}
          placeholder="Please enter some text"
          onChangeText={newText => this.setState({ text: newText })}
        />
        <Text style={{ fontSize: 40 }}>
          {this.state.text}
        </Text>

        {
          // -02- Buttons work as buttons work.  
        }
        <Button
          onPress={() => this.setState({ count: this.state.count + 1 })}
          title="Count"
        />
        <Text style={{ fontSize: 40 }}>
          {this.state.count}
        </Text>

        {
          // -03- Apart from buttons that React Native has
          // a comprehensive set of gesture recognition components and a 
          // "gesture responder system" for creating custom gesture recognitions
        }
        <TouchableHighlight onPress={this.clear} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Clear -Highlight-</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this.clear}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Clear -Opacity-</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
          onPress={this.clear}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Clear -Native-</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
          onPress={this.clear}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Clear -No Feedback-</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onLongPress={this.clear} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Clear -Long Press-</Text>
          </View>
        </TouchableHighlight>

      </View >
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }

});