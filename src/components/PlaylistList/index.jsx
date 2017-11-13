import React from 'react';
import PlaylistItem from '../PlaylistItem';
import './playlist-list.css';

const PlaylistList = ({ playlists }) => {
  return (
    <ul className="playlist-list">
      {playlists.map(playlist => <PlaylistItem key={playlist.id} playlist={playlist} />)}
    </ul>
  );
}

export default PlaylistList;
