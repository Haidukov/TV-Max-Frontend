import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_ERROR,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS,
  FETCH_EPISODE_ERROR
} from '../../action-types';
import {
  fetchEpisodesRequest,
  fetchEpisodesSuccess,
  fetchEpisodesError,
  fetchEpisodeRequest,
  fetchEpisodeSuccess,
  fetchEpisodeError
} from '../../actions';
import show from '../../../../fixtures/show.json';
import episodes from '../../../../fixtures/episodes.json';

describe('episodes action creators', () => {
  test('fetchEpisodesRequest', () => {
    expect(fetchEpisodesRequest(show.id)).toEqual({
      type: FETCH_EPISODES_REQUEST,
      payload: { id: show.id }
    });
  });

  test('fetchEpisodesSuccess', () => {
    expect(fetchEpisodesSuccess(show.id, episodes)).toEqual({
      type: FETCH_EPISODES_SUCCESS,
      payload: { id: show.id, episodes }
    });
  });

  test('fetchEpisodesError', () => {
    const error = new Error('error');
    expect(fetchEpisodesError(show.id, error)).toEqual({
      type: FETCH_EPISODES_ERROR,
      payload: { id: show.id, error }
    });
  });

  const episode = episodes[0];

  test('fetchEpisodeRequest', () => {
    expect(fetchEpisodeRequest(episode.id)).toEqual({
      type: FETCH_EPISODE_REQUEST,
      payload: { id: episode.id }
    });
  });

  test('fetchEpisodesSuccess', () => {
    expect(fetchEpisodeSuccess(episode.id, episode)).toEqual({
      type: FETCH_EPISODE_SUCCESS,
      payload: { id: episode.id, data: episode }
    });
  });

  test('fetchEpisodesError', () => {
    const error = new Error('error');
    expect(fetchEpisodeError(episode.id, error)).toEqual({
      type: FETCH_EPISODE_ERROR,
      payload: { id: episode.id, error }
    });
  });
});
