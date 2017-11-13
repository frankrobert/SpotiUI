import React from 'react';

const PlaylistButton = ({ getPlaylists }) => (
  <button type="button" onClick={() => getPlaylists()}>
    CLICK TO GET PLAYLISTS
  </button>
);

export default PlaylistButton;
