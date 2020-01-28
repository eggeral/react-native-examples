/*
Test the app

package.json for setting mocks for the gesture handler
"jest": {
  "preset": "react-native",
  "setupFiles": ["./node_modules/react-native-gesture-handler/jestSetup.js"]
}

By default the jest-react-native preset only processes the project's own source files and react-native. If you have npm dependencies that have to be transformed you can customize this configuration option by whitelisting modules other than react-native:
"jest": {
...
  "transformIgnorePatterns": [
    "node_modules/(?!(react-native|my-project|react-native-button)/)"
  ]
}
./node_modules/.bin/json-server --host 0.0.0.0 ../shop-it-photo-qr.json

*/

import React, { Component } from 'react';

import ItemScreen from './src/components/ItemScreen'
import ItemsScreen from './src/components/ItemsScreen'
import QrCodeScannerScreen from './src/components/QrCodeScannerScreen'
import TakePhotoScreen from './src/components/TakePhotoScreen'
import ErrorBoundary from './src/components/ErrorBoundary'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Items: { screen: ItemsScreen },
  Item: { screen: ItemScreen },
  QrCodeScanner: { screen: QrCodeScannerScreen },
  TakePhoto: { screen: TakePhotoScreen }
});


// This way we wrap every screen into an ErrorBoundary
class AppNavigator extends Component {
  static router = MainNavigator.router;
  render() {
    const { navigation } = this.props;
    return (
      <ErrorBoundary navigation={navigation}>
        <MainNavigator navigation={navigation} />
      </ErrorBoundary>
    );
  }
}

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
