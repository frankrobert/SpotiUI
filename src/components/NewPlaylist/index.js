import React from 'react';
import Modal from '../Modal';

const NewPlaylist = ({ onCreatePlaylist, onCloseModal }) => (
  <Modal>
    <form onSubmit={(e) => onCreatePlaylist(e)}>
      <h2>Create Playlist</h2>
      <div>
        <span>Name</span>
        <input placeholder="New Playlist" type="text" />
      </div>
      <button type="button" onClick={() => onCloseModal()}>Cancel</button>
      <button type="submit">Create</button>
    </form>
  </Modal>
);

export default NewPlaylist;
