import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// -01- A simple clock 
class SimpleClock extends Component {
  render() {
    // this does not update the clock!
    return <Text>SimpleClock: It is, {this.props.date.toLocaleTimeString()}.</Text>
  }
}

// -02- A clock with state 
class ClockWithState extends Component {
  constructor(props) {
    super(props); // always call super(props)!!!!
    this.state = { date: new Date() };
  }
  render() {
    // this does not update the clock!
    return <Text>ClockWithState: It is, {this.state.date.toLocaleTimeString()}.</Text>
  }
}

..............

// -03- A clock which updates every second 
class ClockUpdating extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // Lifecycle method called when the component is 
  // rendered the first time
  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  // Lifecycle method called when the component is 
  // removed
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({ // update the component state. Now React knows it needs to call rerender
      date: new Date()
    });

    // Never set this.state.xyz directly => React does not know that date has changed if you do this.
    // this.state.date = new Date();

    // Don't worry (too much) about multiple calls of this.setState() React will batch them together
  }

  render() {
    return <Text>ClockUpdating: It is, {this.state.date.toLocaleTimeString()}.</Text>
  }
}

// -04- A Counter - mixing state and props
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.count(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  count() {

    // Although the following statement works for our simple example 
    // as state and props might be set asynchronously the values might be wrong
    // this.setState({ 
    //   counter: this.state.counter + this.props.increment
    // });

    // use
    this.setState((state, props) => {
      return {
        counter: state.counter + props.increment
      }
    })
  }

  render() {
    return <Text>Counter: {this.state.counter}.</Text>
  }
}

// -05- Another clock - Data flows down in the component tree
// A parent passes its state to the children using properties of
// the children
class AnotherClock extends Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({ 
      date: new Date()
    });

  }

  render() {
    return <FormatedDate date={this.state.date}></FormatedDate>
  }
}

class FormatedDate extends Component {
  render() {
    return <Text>FormatedDate: It is, {this.props.date.toLocaleTimeString()}.</Text>
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SimpleClock date={new Date()}></SimpleClock>
        <ClockWithState />
        <ClockUpdating />
        <Counter increment={2} />
        <AnotherClock/>
        { /* -05- Each component has its own state! */ }
        <AnotherClock/>
      </View>
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
});