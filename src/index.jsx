import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import store, { history } from './redux/configure-store';

import App from './containers/App';
import NavBar from './containers/NavBar';
import Login from './components/Login';
import User from './containers/User';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="main">
        <NavBar />
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/user/:accessToken/:refreshToken" component={User} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
