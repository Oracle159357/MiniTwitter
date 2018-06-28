import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import combineReducers from './reducers/index';

const store = createStore(combineReducers, composeWithDevTools());

export default store;
