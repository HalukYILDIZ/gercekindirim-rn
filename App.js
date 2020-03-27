import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
//import {composeWithDevTools} from 'redux-devtools-extension';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer); //, composeWithDevTools()); //deploy öncesi compose silinmeli

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
