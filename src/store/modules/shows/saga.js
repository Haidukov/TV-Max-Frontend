import {
  call,
  getContext,
  put,
  takeEvery
} from 'redux-saga/effects';
import { FETCH_SHOW_REQUEST } from './action-types';
import {
  fetchShowError,
  fetchShowSuccess,
  fetchEpisodesRequest
} from '../actions';

function* fetchShowSaga({ payload }) {
  try {
    const api = yield getContext('api');
    const data = yield call(api.getShow, payload.id);
    yield put(fetchShowSuccess(payload.id, data));
    yield put(fetchEpisodesRequest(payload.id));
  } catch (e) {
    yield put(fetchShowError(payload.id, e));
  }
}

export default function* saga() {
  yield takeEvery(
    FETCH_SHOW_REQUEST,
    fetchShowSaga
  );
}
