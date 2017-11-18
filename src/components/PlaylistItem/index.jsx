import React from 'react';
import './playlist-item.css';

const PlaylistItem = ({ playlist }) => {
  return (
    <li className="playlist-item">
      <div className="playlist-item__content">
        <a className="playlist-item-anchor" href={playlist.href}>
          <h1 className="playlist-title">{playlist.name}</h1>
        </a>
      </div>
    </li>
  );
};

export default PlaylistItem;
