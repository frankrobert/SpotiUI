import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './redux/action-creators';
import './App.css';

const logo = require('./logo.svg');

function mapStateToProps(state) {
  return { isLoading: state.isLoading };
}
class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.getAuth('http://localhost:3001/authorize'));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
