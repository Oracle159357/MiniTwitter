import { combineReducers} from 'redux'
//import { routerReducer } from 'react-router-redux';
import {posts} from "./twitter";
import {watchMode} from "./watchingMode";

export default combineReducers({
    //  routing: routerReducer,
    posts, watchMode

});
