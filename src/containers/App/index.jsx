import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action-creators';
import './app.css';

function mapStateToProps(state) {
  const { app } = state;
  return {
    error: app.error,
    isLoading: app.isLoading
  };
}

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.getAuth('/authorize'));
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Spotify Playlist Fetcher!</h2>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
