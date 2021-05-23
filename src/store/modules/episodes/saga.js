import {
  all,
  call,
  getContext,
  put,
  takeEvery
} from 'redux-saga/effects';
import { FETCH_EPISODES_REQUEST, FETCH_EPISODE_REQUEST } from './action-types';
import {
  fetchEpisodesError,
  fetchEpisodesSuccess,
  fetchEpisodeError,
  fetchEpisodeSuccess
} from '../actions';

function* fetchShowEpisodes({ payload }) {
  try {
    const api = yield getContext('api');
    const episodes = yield call(api.getShowEpisodes, payload.id);
    yield put(fetchEpisodesSuccess(payload.id, episodes));
  } catch (e) {
    yield put(fetchEpisodesError(payload.id, e));
  }
}

function* fetchEpisode({ payload }) {
  try {
    const api = yield getContext('api');
    const episode = yield call(api.getEpisode, payload.id);
    yield put(fetchEpisodeSuccess(payload.id, episode));
  } catch (e) {
    yield put(fetchEpisodeError(payload.id, e));
  }
}

export default function* saga() {
  yield all([
    takeEvery(
      FETCH_EPISODES_REQUEST,
      fetchShowEpisodes
    ),
    takeEvery(
      FETCH_EPISODE_REQUEST,
      fetchEpisode
    )
  ]);
}
