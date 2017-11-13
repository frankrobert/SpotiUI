import actionTyper from 'actiontyper';
import { getData, updateState } from '../configure-store';

const {
  GET_PLAYLISTS_REQUESTED,
  GET_PLAYLISTS_SUCCEEDED,
  GET_PLAYLISTS_FAILED,
  ADD_PLAYLIST_REQUESTED,
  ADD_PLAYLIST_SUCCEEDED,
  ADD_PLAYLIST_FAILED,
  NEW_PLAYLIST_DATA_SAVED,
  NEW_PLAYLIST_DATA_LOADED,
  NEW_PLAYLIST_DATA_CLEARED
} = actionTyper('/APP/');

const initialState = {
  isLoading: false,
  error: {
    type: '',
    message: ''
  },
  playlists: [],
  newPlaylist: {
    name: '',
    image: '',
    description: ''
  }
};

const playlistsRequested = (loading) => {
  return {
    type: GET_PLAYLISTS_REQUESTED,
    payload: {
      isLoading: loading
    }
  };
};

const playlistsSucceeded = (playlists, loading) => {
  return {
    type: GET_PLAYLISTS_SUCCEEDED,
    payload: {
      playlists,
      isLoading: loading
    }
  };
};

const playlistsFailed = (msg, error, loading) => {
  return {
    type: GET_PLAYLISTS_FAILED,
    payload: {
      error: {
        type: 'PLAYLISTS',
        message: `An error has occured: ${msg}\n${error}`
      },
      isLoading: loading
    }
  };
}

export const newPlaylistDataCleared = () => {
  return {
    type: NEW_PLAYLIST_DATA_CLEARED,
    payload: {
      newPlaylist: {
        name: '',
        description: '',
        image: ''
      }
    }
  };
}

export const newPlaylistDataLoaded = () => {
  return {
    type: NEW_PLAYLIST_DATA_CLEARED,
    payload: {}
  };
}

export const newPlaylistDataSaved = (newPlaylistData) => {
  return {
    type: NEW_PLAYLIST_DATA_SAVED,
    payload: {
      newPlaylist: { ...newPlaylistData }
    }
  };
}

const saveData = (state, action) => updateState(state, action.payload);
const setLoading = (state, action) => updateState(state, action.payload);
const setError = (state, action) => updateState(state, action.payload);

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

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
      case GET_PLAYLISTS_REQUESTED: return setLoading(state, action);
      case GET_PLAYLISTS_SUCCEEDED: return setLoading(state, action);
      case GET_PLAYLISTS_FAILED: return setError(state, action);
      case ADD_PLAYLIST_REQUESTED: return setLoading(state, action);
      case ADD_PLAYLIST_SUCCEEDED: return setLoading(state, action);
      case ADD_PLAYLIST_FAILED: return setError(state, action);
      case NEW_PLAYLIST_DATA_SAVED: return saveData(state, action);
      case NEW_PLAYLIST_DATA_LOADED: return saveData(state, action);
      case NEW_PLAYLIST_DATA_CLEARED: return saveData(state, action);
      default: return state;
  }
}