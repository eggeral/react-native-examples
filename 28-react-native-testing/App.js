import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

/*
npm install --save-dev jest
npm install --save-dev react-test-renderer
npm install --save-dev @testing-library/react-native
npm install --save-dev jest-fetch-mock

package.json =>

"scripts": {
  "test": "jest"
},
"jest": {
  "preset": "react-native",
  "collectCoverage": true
}
*/
export default class App extends Component {

  state = { page: 'master' };

  render() {
    if (this.state.page === 'master') {
      return <View style={styles.container}>
        <Text accessibilityLabel="title">{this.props.title + ' - Master'}</Text>
        <Button accessibilityLabel="goToDetailButton" title="go to detail" onPress={() => this.setState({ page: 'detail' })}></Button>
      </View>
    } else {
      return <View style={styles.container}>
        <Text accessibilityLabel="title">{this.props.title + ' - Detail'}</Text>
        <Button accessibilityLabel="backButton" title="go back to master" onPress={() => this.setState({ page: 'master' })}></Button>
      </View>

    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});