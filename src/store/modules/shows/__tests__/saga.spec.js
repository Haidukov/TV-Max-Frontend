import { getContext } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import saga from '../saga';
import {
  fetchShowError,
  fetchShowRequest,
  fetchShowSuccess
} from '../../actions';
import show from '../../../../fixtures/show.json';
import { fetchEpisodesRequest } from '../../episodes/actions';

describe('show saga', () => {
  it('should handle success case', () => {
    const mockApi = {
      getShow: jest.fn().mockResolvedValue(show)
    };
    return expectSaga(saga)
      .dispatch(fetchShowRequest(show.id))
      .provide([
        [getContext('api'), mockApi]
      ])
      .call(mockApi.getShow, show.id)
      .put(fetchShowSuccess(show.id, show))
      .put(fetchEpisodesRequest(show.id))
      .silentRun();
  });

  it('should handle error case', () => {
    const error = new Error('error');
    const mockApi = {
      getShow: jest.fn().mockRejectedValue(error)
    };
    return expectSaga(saga)
      .dispatch(fetchShowRequest(show.id))
      .provide([
        [getContext('api'), mockApi]
      ])
      .call(mockApi.getShow, show.id)
      .put(fetchShowError(show.id, error))
      .silentRun();
  });
});
