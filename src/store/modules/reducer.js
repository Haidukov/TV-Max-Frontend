import { combineReducers } from 'redux';
import showsReducer from './shows/reducer';
import episodesReducer from './episodes/reducer';

export default combineReducers({
  shows: showsReducer,
  episodes: episodesReducer
});
