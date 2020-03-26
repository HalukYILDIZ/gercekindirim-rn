import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import productReducer from './store/reducers/products';
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
