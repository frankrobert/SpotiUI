import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import store, { history } from './redux/configure-store';

import App from './containers/App';
import NavBar from './containers/NavBar';
import Login from './components/Login';

const state = store.getState();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="main">
        <NavBar />
        <Route path="/" component={App}/>
        {isEmpty(state.app.userData)
          ? null
          : <Route exact path="/login" component={Login}/>
        }
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
