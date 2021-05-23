import reducer from '../reducer';
import {
  fetchShowError,
  fetchShowRequest,
  fetchShowSuccess
} from '../../actions';
import show from '../../../../fixtures/show.json';

describe('show reducer', () => {
  it('should handle FETCH_SHOW_REQUEST action', () => {
    const state = { byId: {} };
    const action = fetchShowRequest(show.id);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [show.id]: {
          isLoading: true,
          error: null
        }
      }
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_SHOW_SUCCESS action', () => {
    const state = { byId: {} };
    const action = fetchShowSuccess(show.id, show);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [show.id]: {
          isLoading: false,
          data: show
        }
      }
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_SHOW_ERROR action', () => {
    const state = { byId: {} };
    const error = new Error('error');
    const action = fetchShowError(show.id, error);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [show.id]: {
          isLoading: false,
          error
        }
      }
    };
    expect(newState).toEqual(expectedState);
  });
});
