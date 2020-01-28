/*
Scan the item name from QR labels

Add a picture to an item

Remove the picture of an item

expo install react-native-svg
expo install @fortawesome/fontawesome-svg-core
expo install @fortawesome/free-solid-svg-icons
expo install @fortawesome/react-native-fontawesome
expo install expo-barcode-scanner
expo install expo-camera

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
