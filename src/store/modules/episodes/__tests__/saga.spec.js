import { getContext } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import saga from '../saga';
import {
  fetchEpisodesError,
  fetchEpisodesRequest,
  fetchEpisodesSuccess,
  fetchEpisodeError,
  fetchEpisodeRequest,
  fetchEpisodeSuccess
} from '../../actions';
import show from '../../../../fixtures/show.json';
import episodes from '../../../../fixtures/episodes.json';

describe('Episodes saga', () => {
  describe('Get episodes by show', () => {
    it('should handle success case', () => {
      const mockApi = {
        getShowEpisodes: jest.fn().mockResolvedValue(episodes)
      };
      return expectSaga(saga)
        .dispatch(fetchEpisodesRequest(show.id))
        .provide([
          [getContext('api'), mockApi]
        ])
        .call(mockApi.getShowEpisodes, show.id)
        .put(fetchEpisodesSuccess(show.id, episodes))
        .silentRun();
    });

    it('should handle error case', () => {
      const error = new Error('error');
      const mockApi = {
        getShowEpisodes: jest.fn().mockRejectedValue(error)
      };
      return expectSaga(saga)
        .dispatch(fetchEpisodesRequest(show.id))
        .provide([
          [getContext('api'), mockApi]
        ])
        .call(mockApi.getShowEpisodes, show.id)
        .put(fetchEpisodesError(show.id, error))
        .silentRun();
    });
  });

  describe('Get episode by id', () => {
    const episode = episodes[0];
    it('should handle success case', () => {
      const mockApi = {
        getEpisode: jest.fn().mockResolvedValue(episode)
      };
      return expectSaga(saga)
        .dispatch(fetchEpisodeRequest(episode.id))
        .provide([
          [getContext('api'), mockApi]
        ])
        .call(mockApi.getEpisode, episode.id)
        .put(fetchEpisodeSuccess(episode.id, episode))
        .silentRun();
    });

    it('should handle error case', () => {
      const error = new Error('error');
      const mockApi = {
        getEpisode: jest.fn().mockRejectedValue(error)
      };
      return expectSaga(saga)
        .dispatch(fetchEpisodeRequest(episode.id))
        .provide([
          [getContext('api'), mockApi]
        ])
        .call(mockApi.getEpisode, episode.id)
        .put(fetchEpisodeError(episode.id, error))
        .silentRun();
    });
  });
});
