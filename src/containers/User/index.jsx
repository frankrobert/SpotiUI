import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import actions from '../../redux/action-creators';
import './user.css';

function mapDispatchToProps(store) {
  const { app } = store;

  return {
    access_token: app.access_token,
    refresh_token: app.refresh_token,
    userData: app.userData
  };
}

class User extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const accessToken = match.params.accessToken;
    const refreshToken = match.params.refreshToken;
    if (!accessToken || !refreshToken) window.location.href = '/login';

    dispatch(actions.authSucceeded(false));
    dispatch(actions.setAccessToken(accessToken));
    dispatch(actions.setRefreshToken(refreshToken));
    dispatch(actions.getUserData(`/user-data?access_token=${accessToken}`));
  }

  render() {
    const { userData } = this.props;

    if (isEmpty(userData)) return <div className="user" />;

    const { display_name, images } = userData;
    const [image] = images;

    return (
      <div className="user">
        <img className="user-image" alt="Profile" src={image.url} />
        <span className="user-name">{display_name}</span>
      </div>
    );
  }
}

export default connect(mapDispatchToProps)(User);
