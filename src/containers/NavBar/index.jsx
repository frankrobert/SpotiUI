import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action-creators';
import AddPlaylist from '../../components/AddPlaylist';
import NewPlaylist from '../../components/NewPlaylist'
import './nav-bar.css';

function mapStateToProps(state) {
  const { playlists } = state;
  return {
    error: playlists.error,
    isLoading: playlists.isLoading,
    playlists: playlists.playlists
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
  }

  clearModal = (modalType) => {
    this.closeModal();
  }

  closeModal = () => {
    const { dispatch } = this.props;
    
    dispatch(actions.toggleModal(false));
  }

  createPlaylist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.closeModal(false);
  }

  render() {
    return (
      <aside className="nav-bar">
        <section className="nav-bar-main">
          {/* <NavGeneral />
          <NavLibrary />
          <NavPlaylist /> */}
        </section>
        <AddPlaylist onOpenModal={this.openModal} />
        <NewPlaylist
          onCreatePlaylist={this.createPlaylist}
          onCloseModal={this.closeModal}
          onClearModal={this.clearModal}
        />
      </aside>
    );
  }
}

export default connect(mapStateToProps)(NavBar);
