import actionTyper from 'actiontyper';
import { updateState } from '../configure-store';

const {
  SET_USER_DATA,
  APP_OFFLINE,
  APP_ONLINE,
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED
} = actionTyper('/APP/');

const initialState = {
  isLoading: false,
  isOnline: true,
  error: {
    type: '',
    message: ''
  },
  userData: {}
};

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
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
      case AUTH_SUCCEEDED: return setLoading(state, action);
      case SET_USER_DATA: return setLoading(state, action);
      case AUTH_FAILED: return setError(state, action);
      default: return state;
  }
}