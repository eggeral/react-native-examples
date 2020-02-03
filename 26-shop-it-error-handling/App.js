/*
create Error Boundaries

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
