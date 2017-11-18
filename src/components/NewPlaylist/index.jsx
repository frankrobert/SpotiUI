import React, { Component } from 'react';
import Modal from '../Modal/index';
import './new-playlist.css';

class NewPlaylist extends Component {
  state = {
    name: '',
    description: '',
    image: ''
  };

  componentWillReceiveProps(nextProps) {
    const playlistData = Object.entries(nextProps.newPlaylist)
      .map(([key, value]) => value)
      .some((value) => value);

    if (playlistData) {
      nextProps.onLoadNewPlaylist();
      this.setState({ ...nextProps.newPlaylist });
    }
  }

  mount = () => document.addEventListener('click', this.handleClick);
  unmount = () => document.removeEventListener('click', this.handleClick);

  onChange = (e) => {
    this.setState({ [`${e.target.id}`]: e.target.value });
  };

  handleClick = (e) => {
    const { onSaveNewPlaylist } = this.props;
    const mask = document.getElementById('mask');
    const id = e.target.id;

    return mask && id === mask.id && onSaveNewPlaylist(this.state);
  };

  onCancel = () => {
    const { onClearNewPlaylist } = this.props;

    onClearNewPlaylist({ name: '', description: '', image: '' });

    this.setState({
      name: '',
      description: '',
      image: ''
    });
  };

  render() {
    const { onCreatePlaylist } = this.props;
    const { description, name } = this.state;
    return (
      <Modal onMount={this.mount} onUnmount={this.unmount}>
        <form className="new-playlist" onSubmit={(e) => onCreatePlaylist(e, this.state)}>
          <h2 className="new-playlist__title" >Create Playlist</h2>
          <div className="new-playlist__name__wrapper">
            <span className="new-playlist__text">Name</span>
            <div className="new-playlist__input__wrapper">
              <label className="new-playlist__count">{name.length}/100</label>
              <input
                autoComplete="off"
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
          <div className="new-playlist-section">
            <div className="new-playlist__image-wrapper">
              <span className="new-playlist__text new-playlist__text--image">Image</span>
              <button className="new-playlist__button">Choose Image</button>
            </div>
            <div className="new-playlist__description-wrapper">
              <label className="new-playlist__count">{description.length}/300</label>
              <span className="new-playlist__text">Description</span>
              <textarea
                autoComplete="off"
                id="description"
                className="new-playlist__description-input"
                placeholder="Give your playlist a catchy description."
                onChange={this.onChange}
                value={description}
                type="text"
                maxLength="300"
              />
            </div>
          </div>
          <div className="new-playlist__buttons-wrapper">
            <button className="new-playlist__button" type="button" onClick={() => this.onCancel()}>Cancel</button>
            <button className="new-playlist__button--green" type="submit">Create</button>
          </div>
        </form>
      </Modal>
    );
  }
};

export default NewPlaylist;
