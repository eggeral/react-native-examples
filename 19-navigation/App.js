// Building Apps with more than on screen

// expo install react-navigation
// expo install react-native-gesture-handler
// expo install react-navigation-stack
// expo install react-native-screens
// expo install react-native-safe-area-context
// expo install @react-native-community/masked-view

import MasterScreen from './src/component/MasterScreen'
import DetailScreen from './src/component/DetailScreen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Master: {screen: MasterScreen},
  Detail: {screen: DetailScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
