import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import app from './reducers/app';
import playlists from './reducers/playlists';
import modal from './reducers/modal';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routerReduxMiddleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    app,
    playlists,
    modal,
    router: routerReducer
  }),
  applyMiddleware(routerReduxMiddleware, thunk, logger)
);


export const updateState = (state, newState) => Object.assign({}, state, newState);
export const getData = (url, options) => fetch(`http://localhost:3001${url}`, options);

export default store;
