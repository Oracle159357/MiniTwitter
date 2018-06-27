import combineReducers from "./reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;