import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action-creators';
import './app.css';
import PlaylistButton from '../../components/PlaylistButton/playlist-button';
import PlaylistList from '../../components/PlaylistList/playlist-list';

function mapStateToProps(state) {
  const { app } = state;
  return {
    error: app.error,
    isLoading: app.isLoading,
    playlists: app.playlists
  };
}
class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.getAuth('/authorize'));
  }

  getPlaylists = () => {
    const { dispatch } = this.props;

    dispatch(actions.getPlaylists('/get-user-playlists'));
  };

  render() {
    const { error, isLoading, playlists } = this.props;
    const isVisible = (
      !isLoading
      && (!error.type || error.type !== 'AUTH')
      && !playlists.length
    );
    const Button = isVisible && <PlaylistButton getPlaylists={this.getPlaylists} />;

    return (
      <div className="app">
        <div className="app-header">
          <h2>Spotify Playlist Fetcher!</h2>
          {Button}
        </div>
        {playlists && playlists.length ? <PlaylistList playlists={playlists} /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
