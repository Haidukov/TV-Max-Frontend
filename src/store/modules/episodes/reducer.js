import produce from 'immer';
import {
  FETCH_EPISODES_ERROR,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODE_ERROR,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS
} from '../action-types';

const initialState = {
  byId: {},
  byShow: {}
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_EPISODES_REQUEST: {
      if (!draft.byShow[action.payload.id]) {
        draft.byShow[action.payload.id] = {
          ids: []
        };
      }
      draft.byShow[action.payload.id].isLoading = true;
      draft.byShow[action.payload.id].error = null;
      break;
    }
    case FETCH_EPISODES_SUCCESS: {
      if (!draft.byShow[action.payload.id]) {
        draft.byShow[action.payload.id] = {
          ids: []
        };
      }
      draft.byShow[action.payload.id].isLoading = false;
      draft.byShow[action.payload.id].ids = [];
      action.payload.episodes.forEach(episode => {
        if (!draft.byId[episode.id]) {
          draft.byId[episode.id] = {};
        }
        draft.byId[episode.id].data = episode;
        draft.byShow[action.payload.id].ids.push(episode.id);
      });
      break;
    }
    case FETCH_EPISODES_ERROR: {
      if (!draft.byShow[action.payload.id]) {
        draft.byShow[action.payload.id] = {
          ids: []
        };
      }
      draft.byShow[action.payload.id].error = action.payload.error;
      draft.byShow[action.payload.id].isLoading = false;
      break;
    }

    case FETCH_EPISODE_REQUEST: {
      if (!draft.byId[action.payload.id]) {
        draft.byId[action.payload.id] = {};
      }
      draft.byId[action.payload.id].isLoading = true;
      draft.byId[action.payload.id].error = null;
      break;
    }

    case FETCH_EPISODE_SUCCESS: {
      if (!draft.byId[action.payload.id]) {
        draft.byId[action.payload.id] = {};
      }
      draft.byId[action.payload.id].isLoading = false;
      draft.byId[action.payload.id].data = action.payload.data;
      break;
    }

    case FETCH_EPISODE_ERROR: {
      if (!draft.byId[action.payload.id]) {
        draft.byId[action.payload.id] = {};
      }
      draft.byId[action.payload.id].isLoading = false;
      draft.byId[action.payload.id].error = action.payload.error;
      break;
    }
  }
}, initialState);

export default reducer;
