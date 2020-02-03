// Using state management to ensure a single source of truth and an unidirectional data flow

// expo install @datorama/akita

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
