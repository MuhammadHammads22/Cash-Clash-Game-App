import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import currencyReducer from './reducers/currencyReducer';
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  currency: currencyReducer,
  // Add other reducers here
});

const store = createStore(rootReducer);

export default store;
