import {
  FETCH_SHOW_REQUEST,
  FETCH_SHOW_SUCCESS,
  FETCH_SHOW_ERROR
} from '../../action-types';
import {
  fetchShowRequest,
  fetchShowSuccess,
  fetchShowError
} from '../../actions';
import show from '../../../../fixtures/show.json';

describe('shows action creators', () => {
  test('fetchShowRequest', () => {
    expect(fetchShowRequest(show.id)).toEqual({
      type: FETCH_SHOW_REQUEST,
      payload: { id: show.id }
    });
  });

  test('fetchShowSuccess', () => {
    expect(fetchShowSuccess(show.id, show)).toEqual({
      type: FETCH_SHOW_SUCCESS,
      payload: { id: show.id, data: show }
    });
  });

  test('fetchShowError', () => {
    const error = new Error('error');
    expect(fetchShowError(show.id, error)).toEqual({
      type: FETCH_SHOW_ERROR,
      payload: { id: show.id, error }
    });
  });
});
