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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="main">
        <NavBar />
        <Route exact path="/" component={App}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
