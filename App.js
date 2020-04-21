import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
//import {composeWithDevTools} from 'redux-devtools-extension';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import authReducer from './store/reducers/auth';
import ordersReducer from './store/reducers/orders';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //, composeWithDevTools()); //deploy öncesi compose silinmeli

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
