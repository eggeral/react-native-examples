/*
use Akita

./node_modules/.bin/json-server --host 0.0.0.0 ../shop-it-photo-qr.json
*/

import ItemScreen from './src/components/ItemScreen'
import ItemsScreen from './src/components/ItemsScreen'
import QrCodeScannerScreen from './src/components/QrCodeScannerScreen'
import TakePhotoScreen from './src/components/TakePhotoScreen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Items: {screen: ItemsScreen},
  Item: {screen: ItemScreen},
  QrCodeScanner: {screen: QrCodeScannerScreen},
  TakePhoto: {screen: TakePhotoScreen}
});

const App = createAppContainer(MainNavigator);
export default App;
