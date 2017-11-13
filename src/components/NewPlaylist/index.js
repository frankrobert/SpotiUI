import React from 'react';
import Modal from '../Modal';

const NewPlaylist = ({ onCloseModal }) => (
  <Modal>
    <div>
      <button onClick={() => onCloseModal()}>
        <i className="fa fa-times-circle" />
      </button>
      Hello World
    </div>
  </Modal>
);

export default NewPlaylist;
