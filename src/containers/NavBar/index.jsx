import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import actions from '../../redux/action-creators';
import AddPlaylist from '../../components/AddPlaylist';
import NewPlaylist from '../../components/NewPlaylist/index'
import './nav-bar.css';

function mapStateToProps(state) {
  const { playlists } = state;
  return {
    error: playlists.error,
    isLoading: playlists.isLoading,
    playlists: playlists.playlists,
    newPlaylist: playlists.newPlaylist
  };
}

class NavBar extends Component {
  getPlaylists = () => {
    const { dispatch } = this.props;

    dispatch(actions.getPlaylists('/get-user-playlists'));
  };

  openModal = (modalType) => {
    const { dispatch } = this.props;

    dispatch(actions.toggleModal(true, modalType));
  };

  closeModal = () => {
    const { dispatch } = this.props;
    
    dispatch(actions.toggleModal(false));
  };

  createPlaylist = (e, playlistData) => {
    const { dispatch } = this.props;
    const options = {
      method: 'POST',
      body: JSON.stringify(playlistData)
    };

    e.preventDefault();
    e.stopPropagation();

    console.log('OPTIONS', options);

    dispatch(actions.addNewPlaylist('/add-new-playlist', options));
    this.closeModal();
  };

  saveNewPlaylist = (playlistData) => {
    const { dispatch } = this.props;

    dispatch(actions.newPlaylistDataSaved(playlistData));
    this.closeModal();
  };

  loadNewPlaylist = () => {
    const { dispatch } = this.props;

    dispatch(actions.newPlaylistDataLoaded());
  };

  clearNewPlaylist = (playlistData) => {
    const { dispatch } = this.props;

    dispatch(actions.newPlaylistDataCleared(playlistData));
    this.closeModal();
  };

  render() {
    const { newPlaylist } = this.props;
    return (
      <aside className="nav-bar">
        <section className="nav-bar-main">
          {/* <NavGeneral />
          <NavLibrary />
          <NavPlaylist /> */}
        </section>
        <AddPlaylist onOpenModal={this.openModal} />
        <NewPlaylist
          newPlaylist={newPlaylist}
          onSaveNewPlaylist={this.saveNewPlaylist}
          onLoadNewPlaylist={this.loadNewPlaylist}
          onClearNewPlaylist={this.clearNewPlaylist}
          onCreatePlaylist={this.createPlaylist}
        />
      </aside>
    );
  }
}

export default connect(mapStateToProps)(NavBar);
