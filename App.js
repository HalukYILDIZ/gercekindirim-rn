import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import productReducer from './store/reducers/products';
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
//import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ProductsOverviewScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
