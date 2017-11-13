import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  render() {
    return (
      <section className="modal">
        <span>HELLO WORLD</span>
        {this.children}
      </section>
    );
  }
}

export default Modal;
