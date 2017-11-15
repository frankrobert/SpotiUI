import actionTyper from 'actiontyper';
import { getData, updateState } from '../configure-store';

const {
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
  }
};

const authRequested = (loading) => {
  return {
    type: AUTH_REQUESTED,
    payload: {
      isLoading: loading
    }
  };
};

const authSucceeded = (loading) => {
  return {
    type: AUTH_SUCCEEDED,
    payload: {
      isLoading: loading
    }
  };
};

const authFailed = (msg, error, loading) => {
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

export const getAuth = (url, options) => {
  return async function (dispatch) {
    dispatch(authRequested(true));
    try { 
      const data = await getData(url, options);

      if (data && data.status === 500) throw new Error('Authentication Error');

      return dispatch(authSucceeded(false));
    } catch (error) {
      return dispatch(authFailed('Couldn\'t correctly authorize application' , error, false));
    }
  };
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
      case APP_OFFLINE: return Object.assign({}, state, { isOnline: action.payload });
      case APP_ONLINE: return Object.assign({}, state, { isOnline: action.payload });
      case AUTH_REQUESTED: return setLoading(state, action);
      case AUTH_SUCCEEDED: return setLoading(state, action);
      case AUTH_FAILED: return setError(state, action);
      default: return state;
  }
}