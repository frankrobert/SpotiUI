import { getAuth } from './reducers/app';
import {
  getPlaylists,
  newPlaylistDataCleared,
  newPlaylistDataSaved,
  newPlaylistDataLoaded,
  addNewPlaylist
} from './reducers/playlists';
import { toggleModal } from './reducers/modal';

export default {
  getAuth,
  getPlaylists,
  toggleModal,
  addNewPlaylist,
  newPlaylistDataCleared,
  newPlaylistDataSaved,
  newPlaylistDataLoaded
};