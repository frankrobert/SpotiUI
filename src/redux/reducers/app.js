import actionTyper from 'actiontyper';

const {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  PLAYLISTS_REQUESTED,
  PLAYLISTS_SUCCEEDED,
  PLAYLISTS_FAILED,  
} = actionTyper('/APP/');

const initialState = {
  isLoading: false,
  error: {
    type: '',
    message: ''
  },
  playlists: []
};

const updateState = (state, newState) => Object.assign({}, state, newState);

const getData = (url, options) => fetch(`http://localhost:3001${url}`, options);

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
}

const playlistsRequested = (loading) => {
  return {
    type: PLAYLISTS_REQUESTED,
    payload: {
      isLoading: loading
    }
  };
};

const playlistsSucceeded = (playlists, loading) => {
  return {
    type: PLAYLISTS_SUCCEEDED,
    payload: {
      playlists,
      isLoading: loading
    }
  };
};

const playlistsFailed = (msg, error, loading) => {
  return {
    type: PLAYLISTS_FAILED,
    payload: {
      error: {
        type: 'PLAYLISTS',
        message: `An error has occured: ${msg}\n${error}`
      },
      isLoading: loading
    }
  };
}

const setLoading = (state, action) => updateState(state, action.payload);
const setError = (state, action) => updateState(state, action.payload);

export const getAuth = (url, options) => {
  return async function (dispatch, getState) {
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

export const getPlaylists = (url, options) => {
  return async function (dispatch, getState) {
    dispatch(playlistsRequested(true));
    try {
      let data = await getData(url, options);

      if (data && data.status === 500) throw new Error('Fetch playlists Error');      

      data =  await data.json();

      return dispatch(playlistsSucceeded(data, false));
    } catch (error) {
      return dispatch(playlistsFailed('Couldn\'t correctly fetch playlists' , error, false));
    }
  };
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
      case AUTH_REQUESTED: return setLoading(state, action);
      case AUTH_SUCCEEDED: return setLoading(state, action);
      case AUTH_FAILED: return setError(state, action);
      case PLAYLISTS_REQUESTED: return setLoading(state, action);
      case PLAYLISTS_SUCCEEDED: return setLoading(state, action);
      case PLAYLISTS_FAILED: return setError(state, action);
      default: return state;
  }
}