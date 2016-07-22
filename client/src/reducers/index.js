/**
 * Our root reducer.
 */

import {combineReducers} from 'redux';
import auth from './auth';
import collections from './collections';
import filters from './filters';

export default combineReducers({
  auth,
  collections,
  filters
});
