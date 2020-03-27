import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import productReducer from './store/reducers/products';
import AppNavigator from './navigation/AppNavigator';
import

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

export default App;
