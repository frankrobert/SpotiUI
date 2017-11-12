import actionTyper from 'actiontyper';

const {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED
} = actionTyper('/APP/');

const initialState = {
  isLoading: false,
  error: '',
  response: {}
};

const updateState = (state, newState) => Object.assign({}, state, newState);

const getData = (url, options) => fetch(url, options);

const authRequested = (loading) => {
  return {
    type: AUTH_REQUESTED,
    payload: {
      isLoading: loading
    }
  };
};

const authSucceeded = (response, loading) => {
  return {
    type: AUTH_SUCCEEDED,
    payload: {
      response,
      isLoading: loading
    }
  };
};

const authFailed = (msg, error, loading) => {
  return {
    type: AUTH_FAILED,
    payload: {
      error: `An error has occured: ${msg}\n${error}`,
      isLoading: loading
    }
  };
}

const setLoading = (state, action) => updateState(state, action.payload);
const setError = (state, action) => updateState(state, action.payload);

export const getAuth = (url, options) => {
  return function (dispatch, getState) {
    dispatch(authRequested(true));
    return getData(url, options)
      .then(data => dispatch(authSucceeded(data, false)))
      .catch(error => dispatch(authFailed('Couldn\'t correctly fetch data' , error, false)));
  };
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
      case AUTH_REQUESTED: return setLoading(state, action);
      case AUTH_SUCCEEDED: return setLoading(state, action);
      case AUTH_FAILED: return setError(state, action);
      default: return state;
  }
}