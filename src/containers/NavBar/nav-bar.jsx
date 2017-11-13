import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <aside className="nav-bar">
        <section className="nav-bar-main">
          <NavGeneral />
          <NavLibrary />
          <NavPlaylist />
        </section>
        <AddPlaylist />
      </aside>
    );
  }
}

export default NavBar;
