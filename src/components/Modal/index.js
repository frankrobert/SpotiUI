import React, { Component } from 'react';
import { connect } from 'react-redux';
import './modal.css';

function mapStateToProps(state) {
  const { modal } = state;

  return {
    isActive: modal.isActive
  };
}

class Modal extends Component {
  componentDidMount() {
    const { onMount } = this.props;

    onMount();
  }

  componentWillUnmount() {
    const { onUnmount } = this.props;

    onUnmount();
  }

  render() {
    const { isActive } = this.props;

    if (!isActive) return null;

    let className = 'mask';

    if (this.props.children) className += ' active';

    return (
      <section className="modal-wrapper">
        <div id="mask" className={className} role="dialog" />
        <div className="modal" role="alert">
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps)(Modal);
