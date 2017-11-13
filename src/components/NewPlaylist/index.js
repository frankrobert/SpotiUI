import React, { Component } from 'react';
import Modal from '../Modal';

class NewPlaylist extends Component {
  state = {
    name: '',
    description: '',
    image: ''
  };

  mount = () => document.addEventListener('click', this.handleClick);
  unmount = () => document.removeEventListener('click', this.handleClick);

  onChange = (e) => {
    this.setState({ [`${e.target.id}`]: e.target.value });
  }

  handleClick = (e) => {
    const { onClearModal } = this.props;
    const mask = document.getElementById('mask');
    const id = e.target.id;

    return mask && id === mask.id && onClearModal();
  };

  render() {
    const { onCreatePlaylist, onCloseModal } = this.props;
    const { description, name } = this.state;
    return (
      <Modal onMount={this.mount} onUnmount={this.unmount}>
        <form onSubmit={(e) => onCreatePlaylist(e)}>
          <h2>Create Playlist</h2>
          <div>
            <span>Name</span>
            <input
              id="name"
              placeholder="New Playlist"
              type="text"
              onChange={this.onChange}
              value={name}
              maxLength="100"
            />
          </div>
          <div>
            <span>Description</span>
            <input
              id="description"
              placeholder="Give your playlist a catchy description."
              onChange={this.onChange}
              value={description}
              type="text"
              maxLength="300"
            />
          </div>
          <button type="button" onClick={() => onCloseModal()}>Cancel</button>
          <button type="submit">Create</button>
        </form>
      </Modal>
    );
  }
};

export default NewPlaylist;
