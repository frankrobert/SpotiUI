import actionTyper from 'actiontyper';
import { getData, updateState } from '../configure-store';

const {
  USER_DATA_REQUESTED,
  USER_DATA_SUCCEEDED,
  USER_DATA_FAILED,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  APP_OFFLINE,
  APP_ONLINE,
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED
} = actionTyper('/APP/');

const initialState = {
  isLoading: false,
  isOnline: true,
  accessToken: '',
  refreshToken: '',
  error: {
    type: '',
    message: ''
  },
  userData: {}
};

export const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: token
  };
};

export const setRefreshToken = (token) => {
  return {
    type: SET_REFRESH_TOKEN,
    payload: token
  };
};

export const getUserData = (url) => {
  return async (dispatch) => {
    let userData;

    dispatch(requestUserData());
    try {
      userData = await getData(url);
      userData = await userData.json();

      dispatch(setUserData(userData));
    } catch (err) {
      console.error(err);
      dispatch(userDataFailed());
    }
  }
};

const userDataFailed = () => {
  return {
    type: USER_DATA_FAILED,
    payload: {}
  };
};

const requestUserData = () => {
  return {
    type: USER_DATA_REQUESTED,
    payload: {}
  };
};

export const setUserData = (data) => {
  return {
    type: USER_DATA_SUCCEEDED,
    payload: {
      userData: { ...data }
    }
  }
};

export const authRequested = (loading) => {
  return {
    type: AUTH_REQUESTED,
    payload: {
      isLoading: loading
    }
  };
};

export const authSucceeded = (loading) => {
  return {
    type: AUTH_SUCCEEDED,
    payload: {
      isLoading: loading
    }
  };
};

export const authFailed = (msg, error, loading) => {
  return {
    type: AUTH_FAILED,
    payload: {
      error: {
        type: 'AUTH',
        message: `An error has occured: ${msg}\n${error}`
      },
      isLoading: loading
    }
  };
};

const setLoading = (state, action) => updateState(state, action.payload);
const setError = (state, action) => updateState(state, action.payload);

export default function appReducer(state = initialState, action) {
  switch (action.type) {
      case APP_OFFLINE: return Object.assign({}, state, { isOnline: action.payload });
      case APP_ONLINE: return Object.assign({}, state, { isOnline: action.payload });
      case AUTH_REQUESTED: return setLoading(state, action);
      case AUTH_FAILED: return setError(state, action);
      case AUTH_SUCCEEDED: return setLoading(state, action);
      case USER_DATA_SUCCEEDED: return setLoading(state, action);
      case USER_DATA_FAILED: return setLoading(state, action);
      case USER_DATA_REQUESTED: return setLoading(state, action);
      case SET_ACCESS_TOKEN: return Object.assign({}, state, { accessToken: action.payload });
      case SET_REFRESH_TOKEN: return Object.assign({}, state, { refreshToken: action.payload });
      default: return state;
  }
}