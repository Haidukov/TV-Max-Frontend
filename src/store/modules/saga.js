import { all } from 'redux-saga/effects';
import showsSaga from './shows/saga';
import episodesSaga from './episodes/saga';

export default function* rootSaga() {
  yield all([
    showsSaga(),
    episodesSaga()
  ]);
}
