import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/action-creators';
import AddPlaylist from '../../components/AddPlaylist';
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

  addPlaylist = () => {
    const { dispatch } = this.props;

  }

  render() {
    return (
      <aside className="nav-bar">
        <section className="nav-bar-main">
          {/* <NavGeneral />
          <NavLibrary />
          <NavPlaylist /> */}
        </section>
        <AddPlaylist addPlaylist={this.addPlaylist} />
      </aside>
    );
  }
}

export default connect(mapStateToProps)(NavBar);
