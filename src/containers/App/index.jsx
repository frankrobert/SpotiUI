import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';

function mapStateToProps(state) {
  const { app } = state;
  return {
    accessToken: app.accessToken,
    refreshToken: app.refreshToken,
    error: app.error,
    isLoading: app.isLoading,
    userData: app.userData
  };
}

class App extends Component {
  componentDidMount() {
    const { accessToken, refreshToken } = this.props;

    window.addEventListener('online', console.warn);
    window.addEventListener('offline', console.warn);

    if (!accessToken || !refreshToken) window.location.href = '/login';
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
