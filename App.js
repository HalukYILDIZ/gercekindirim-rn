import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
//import {composeWithDevTools} from 'redux-devtools-extension';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
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
