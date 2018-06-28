import { combineReducers } from 'redux';
import { posts } from './twitter';
import { watchMode } from './watchingMode';

export default combineReducers({
  posts, watchMode,
});
