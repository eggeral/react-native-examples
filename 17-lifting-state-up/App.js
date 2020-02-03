// A control unit lets you set 
// the min and the max value for an alarm
// the alarm shows yellow if the value is below min, 
//  green if the value is in between min and max and red if it is above
// another input lets you enter the values // simulator


import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

// -01- Code all in a single component
export class Control01 extends Component {

  state = { controlColor: "blue" }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Min Value" value={this.state.min} onChangeText={(value) => this.setMin(value)} ></TextInput>
        <TextInput placeholder="Max Value" value={this.state.max} onChangeText={(value) => this.setMax(value)} ></TextInput>
        <View style={{ height: 100, width: 100, backgroundColor: this.state.controlColor }}></View>
        <TextInput placeholder="Value" value={this.state.value} onChangeText={(value) => this.setValue(value)} ></TextInput>
      </View>
    );
  }

  setMin(value) {
    this.setState(state => {
      return {
        min: value,
        controlColor: this.calculateControlColor(value, state.max, state.value)
      }
    });
  }

  setMax(value) {
    this.setState(state => {
      return {
        max: value,
        controlColor: this.calculateControlColor(state.min, value, state.value)
      }
    });
  }

  setValue(value) {
    this.setState(state => {
      return {
        value,
        controlColor: this.calculateControlColor(state.min, state.max, value)
      }
    });
  }

  calculateControlColor(minStr, maxStr, valueStr) {
    let controlColor = "green"
    const value = parseFloat(valueStr);
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    if (value < min) controlColor = "yellow"
    if (value >= max) controlColor = "red"

    return controlColor;
  }

}

// -02- Use a number input component
// Motivation: We want the functions like checking if it is a number in one place
export class NumberInput extends Component {

  // No state in this component. The state is handled in the parent because it is needed in several components
  // Important! In React there is only a single source of truth for state! The state is kept in the component
  // which is the common ancestor for all components needing that state.
  // State is passed to the child for reading using props
  // State changes are reported from the child to the parent using functions (events) which are in fact
  // also just props.
  render() {
    return <TextInput placeholder={this.props.placeholder} value={this.textValue(this.props.value)} onChangeText={(value) => this.setValue(value)} ></TextInput>
  }

  textValue(value) {
    if (!value) return '';
    return '' + value;
  }

  setValue(value) {
    this.props.onChange(parseFloat(value)); // the number input always reports floats so the parent does not have to deal with it
  }
}

export class Control02 extends Component {

  state = { controlColor: "blue" }

  render() {
    return (
      <View style={styles.container}>
        <NumberInput placeholder="Min Value" value={this.state.min} onChange={(value) => this.setMin(value)} ></NumberInput>
        <NumberInput placeholder="Max Value" value={this.state.max} onChange={(value) => this.setMax(value)} ></NumberInput>
        <View style={{ height: 100, width: 100, backgroundColor: this.state.controlColor }}></View>
        <NumberInput placeholder="Value" value={this.state.value} onChange={(value) => this.setValue(value)} ></NumberInput>
      </View>
    );
  }

  setMin(value) {
    this.setState(state => {
      return {
        min: value,
        controlColor: this.calculateControlColor(value, state.max, state.value)
      }
    });
  }

  setMax(value) {
    this.setState(state => {
      return {
        max: value,
        controlColor: this.calculateControlColor(state.min, value, state.value)
      }
    });
  }

  setValue(value) {
    this.setState(state => {
      return {
        value,
        controlColor: this.calculateControlColor(state.min, state.max, value)
      }
    });
  }

  calculateControlColor(min, max, value) {
    let controlColor = "green"

    if (value < min) controlColor = "yellow" // No parseFloat needed here any more
    if (value >= max) controlColor = "red"

    return controlColor;
  }
}

// -03- Use a display component
// {min, max, value} is the shared state and we keep it completely in App.js
export class Display extends Component {

  render() {
    return <View style={{ height: 100, width: 100, backgroundColor: this.calculateControlColor() }}></View>
  }

  calculateControlColor() {
    if (this.props.value === undefined) return "blue";
    if (this.props.value < this.props.min) return "yellow"
    if (this.props.value >= this.props.max) return "red"
    return "green";
  }

}

export default class Control03 extends Component {

  state = {}

  render() {
    return (
      <View style={styles.container}>
        <NumberInput placeholder="Min Value" value={this.state.min}
          onChange={(value) => this.setState({ min: value })} ></NumberInput>
        <NumberInput placeholder="Max Value" value={this.state.max}
          onChange={(value) => this.setState({ max: value })} ></NumberInput>
        <Display value={this.state.value} min={this.state.min} max={this.state.max}></Display>
        <NumberInput placeholder="Value" value={this.state.value}
          onChange={(value) => this.setState({ value })} ></NumberInput>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48
  },
})
