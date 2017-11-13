import React from 'react';
import './playlist-item.css';

const PlaylistItem = ({ playlist }) => {
  const background = playlist.images.slice(0, 1)[0];

  return (
    <li className="playlist-item">
      <img className="playlist-item__background" src={background.url} />
      <div className="playlist-item__content">
        <a href={playlist.href}>
          <h1>{playlist.name}</h1>
        </a>
        <span>Tracks: {playlist.tracks.total}</span>
      </div>
    </li>
  );
};

export default PlaylistItem;
