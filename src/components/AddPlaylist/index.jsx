import React from 'react';
import './add-playlist.css';

const AddPlaylist = ({ addPlaylist, onOpenModal }) => {
  return (
    <section onClick={() => onOpenModal('PLAYLISTS')} className="add-playlist">
      <i className="fa fa-plus-circle" />
      <span className="add-playlist__text">New Playlist</span>
    </section>
  );
};

export default AddPlaylist;
