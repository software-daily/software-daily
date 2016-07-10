/**
 * Store factory.
 */

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import initialState from './initial_state';
import reducer from '../reducers';

// Apply middleware.
const logger = createLogger();
const middleware = applyMiddleware(thunk, promise, logger);

export default createStore(
  reducer,
  initialState,
  middleware
);
