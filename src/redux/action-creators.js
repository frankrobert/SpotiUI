import { getAuth } from './reducers/app';
import {
  getPlaylists,
  newPlaylistDataCleared,
  newPlaylistDataSaved,
  newPlaylistDataLoaded
} from './reducers/playlists';
import { toggleModal } from './reducers/modal';

export default {
  getAuth,
  getPlaylists,
  toggleModal,
  newPlaylistDataCleared,
  newPlaylistDataSaved,
  newPlaylistDataLoaded
};