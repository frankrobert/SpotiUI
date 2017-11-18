import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action-creators';
import AddPlaylist from '../../components/AddPlaylist';
import NewPlaylist from '../../components/NewPlaylist';
import NavPlaylist from '../../components/NavPlaylist';
import './nav-bar.css';

function mapStateToProps(state) {
  const { app, playlists } = state;
  return {
    accessToken: app.accessToken,
    refreshToken: app.refreshToken,
    userData: app.userData,
    error: playlists.error,
    isLoading: playlists.isLoading,
    playlists: playlists.playlists,
    newPlaylist: playlists.newPlaylist
  };
}

class NavBar extends Component {
  getPlaylists = () => {
    const { accessToken, dispatch } = this.props;

    dispatch(actions.getPlaylists(`/get-user-playlists?access_token=${accessToken}`));
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
    const { accessToken, dispatch, userData } = this.props;
    const options = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        ...playlistData,
        access_token: accessToken,
        user_id: userData.id
      })
    };

    e.preventDefault();
    e.stopPropagation();

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
    const { accessToken, refreshToken, newPlaylist, playlists } = this.props;

    if (!accessToken || !refreshToken) return (
      <aside className="nav-bar" />
    );

    return (
      <aside className="nav-bar">
        <section className="nav-bar-main">
          {/*<NavGeneral />*/}
          {/*<NavLibrary />*/}
          <NavPlaylist
            getPlaylists={this.getPlaylists}
            playlists={playlists}
          />
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
