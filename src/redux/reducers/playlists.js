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
} = actionTyper('/PLAYLIST/');

const initialState = {
  isLoading: false,
  error: {
    type: '',
    message: ''
  },
  playlists: [],
  savedPlaylist: {},
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
};

const addPlaylistRequested = (loading) => {
  return {
    type: ADD_PLAYLIST_REQUESTED,
    payload: {
      isLoading: loading
    }
  };
};

const addPlaylistSucceeded = (newPlaylist, loading) => {
  return {
    type: ADD_PLAYLIST_SUCCEEDED,
    payload: {
      savedPlaylist: { ...newPlaylist },
      isLoading: loading
    }
  };
};

const addPlaylistFailed = (msg, error, loading) => {
  return {
    type: ADD_PLAYLIST_FAILED,
    payload: {
      error: {
        type: 'ADD_PLAYLIST',
        message: `An error has occured: ${msg}\n${error}`
      },
      isLoading: loading
    }
  };
};

export const newPlaylistDataCleared = (newPlaylistData) => {
  return {
    type: NEW_PLAYLIST_DATA_CLEARED,
    payload: {
      newPlaylist: { ...newPlaylistData }
    }
  };
};

export const newPlaylistDataLoaded = () => {
  return {
    type: NEW_PLAYLIST_DATA_CLEARED,
    payload: {}
  };
};

export const newPlaylistDataSaved = (newPlaylistData) => {
  return {
    type: NEW_PLAYLIST_DATA_SAVED,
    payload: {
      newPlaylist: { ...newPlaylistData }
    }
  };
};

const saveData = (state, action) => updateState(state, action.payload);
const setLoading = (state, action) => updateState(state, action.payload);
const setError = (state, action) => updateState(state, action.payload);

const addPlaylist = (state, action) => {
  const currentPlaylists = state.playlists.items;
  const newPlaylists = [action.payload.savedPlaylist, ...currentPlaylists];

  return Object.assign({}, state, {
    playlists: { items: newPlaylists }
  });
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

export const addNewPlaylist = (url, options) => {
  return async function (dispatch) {
    dispatch(addPlaylistRequested(true));
    let data;

    try {
      data = await getData(url, options);

      if (data.error) throw new Error(data.error);

      data = await data.json();

      return dispatch(addPlaylistSucceeded(data, false));
    } catch (error) {
      return dispatch(addPlaylistFailed('Couldn\'t correctly add new playlist' , error, false));
    }
  };
};

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
      case GET_PLAYLISTS_REQUESTED: return setLoading(state, action);
      case GET_PLAYLISTS_SUCCEEDED: return setLoading(state, action);
      case GET_PLAYLISTS_FAILED: return setError(state, action);
      case ADD_PLAYLIST_REQUESTED: return setLoading(state, action);
      case ADD_PLAYLIST_SUCCEEDED: return addPlaylist(state, action);
      case ADD_PLAYLIST_FAILED: return setError(state, action);
      case NEW_PLAYLIST_DATA_SAVED: return saveData(state, action);
      case NEW_PLAYLIST_DATA_LOADED: return saveData(state, action);
      case NEW_PLAYLIST_DATA_CLEARED: return saveData(state, action);
      default: return state;
  }
}