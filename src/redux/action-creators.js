import * as APP from './reducers/app';
import * as PLAYLISTS from './reducers/playlists';
import * as MODAL from './reducers/modal';

export default {
  ...APP,
  ...PLAYLISTS,
  ...MODAL
};