import React, { Component } from 'react';
import Modal from '../Modal';
import './new-playlist.css';

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
        <form className="new-playlist" onSubmit={(e) => onCreatePlaylist(e)}>
          <h2 className="new-playlist__title" >Create Playlist</h2>
          <div className="new-playlist__name__wrapper">
            <span className="new-playlist__name__text">Name</span>
            <div className="new-playlist__input__wrapper">
              <label className="new-playlist__name__count">{name.length}/100</label>
              <input
                className="new-playlist__name__input"
                id="name"
                placeholder="New Playlist"
                type="text"
                onChange={this.onChange}
                value={name}
                maxLength="100"
              />
            </div>
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
