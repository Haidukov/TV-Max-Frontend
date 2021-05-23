import produce from 'immer';
import { FETCH_SHOW_ERROR, FETCH_SHOW_REQUEST, FETCH_SHOW_SUCCESS } from '../action-types';

const initialState = {
  byId: {}
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_SHOW_REQUEST: {
      if (!draft.byId[action.payload.id]) {
        draft.byId[action.payload.id] = {};
      }
      draft.byId[action.payload.id].isLoading = true;
      draft.byId[action.payload.id].error = null;
      break;
    }
    case FETCH_SHOW_SUCCESS: {
      if (!draft.byId[action.payload.id]) {
        draft.byId[action.payload.id] = {};
      }
      draft.byId[action.payload.id].data = action.payload.data;
      draft.byId[action.payload.id].isLoading = false;
      break;
    }
    case FETCH_SHOW_ERROR: {
      if (!draft.byId[action.payload.id]) {
        draft.byId[action.payload.id] = {};
      }
      draft.byId[action.payload.id].error = action.payload.error;
      draft.byId[action.payload.id].isLoading = false;
      break;
    }
  }
}, initialState);

export default reducer;
