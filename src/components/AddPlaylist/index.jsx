import React from 'react';
import './add-playlist.css';

const AddPlaylist = ({ addPlaylist }) => {
  return (
    <section onClick={addPlaylist} className="add-playlist">
      <i className="fa fa-plus-circle" />
      <span className="add-playlist__text">New Playlist</span>
    </section>
  );
};

export default AddPlaylist;
