import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import PlaylistItem from '../PlaylistItem';
import './nav-playlist.css';

class NavPlaylist extends Component {
  componentWillMount() {
    const { getPlaylists } = this.props;

    getPlaylists();
  }

  render() {
    const { playlists } = this.props;

    if (isEmpty(playlists)) return null;

    const items = playlists.items;

    return (
      <ul className="nav-playlist-list">
        <span className="nav-playlist__text">Playlists</span>
        {map(items, playlist => <PlaylistItem key={playlist.id} playlist={playlist}/>)}
      </ul>
    );
  }
}

export default NavPlaylist;
