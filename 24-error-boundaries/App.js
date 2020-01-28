import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ErrorBoundary from './ErrorBoundary';

class Main extends Component {

  state = { renderWithError: false };

  render() {
    if (this.state.renderWithError) {
      this.state.renderWithError = false;
      throw new Error('rendering went wrong');
    }
    return <View style={styles.container}>
      {
        // In dev mode the "Red error screen" will always be shown.
        // In prod mode the screen becomes empty (all child components are unmounted) if the error is not handled
      }
      <Button title="render with error" onPress={() => this.setState({ renderWithError: true })}></Button>
      {
        // Errors in handlers are not picked up by the ErrorBoundary. Use normal try catch in this case
      }
      <Button title="throw error" onPress={() => { throw new Error('do not press that button') }}></Button>
    </View>
  }
}

export default class App extends Component {


  render() {
    return (
      <ErrorBoundary>
        <Main></Main>
      </ErrorBoundary>
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