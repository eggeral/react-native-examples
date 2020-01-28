/*
Enter the number items to be bought.
Use a separate screen to enter the new item and the number

Edit items

./node_modules/.bin/json-server ../shop-it-items-db.json
*/

import ItemScreen from './src/components/ItemScreen'
import ItemsScreen from './src/components/ItemsScreen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Items: {screen: ItemsScreen},
  Item: {screen: ItemScreen},
});

const App = createAppContainer(MainNavigator);
export default App;
