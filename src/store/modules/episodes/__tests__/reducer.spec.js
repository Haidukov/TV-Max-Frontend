import reducer from '../reducer';
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

const episode = episodes[0];

describe('show reducer', () => {
  it('should handle FETCH_EPISODES_REQUEST action', () => {
    const state = { byId: {}, byShow: {} };
    const action = fetchEpisodesRequest(show.id);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {},
      byShow: {
        [show.id]: {
          isLoading: true,
          error: null,
          ids: []
        }
      }
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_EPISODES_SUCCESS action', () => {
    const state = { byId: {}, byShow: {} };
    const action = fetchEpisodesSuccess(show.id, episodes);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [episodes[0].id]: {
          data: episodes[0]
        },
        [episodes[1].id]: {
          data: episodes[1]
        },
        [episodes[2].id]: {
          data: episodes[2]
        }
      },
      byShow: {
        [show.id]: {
          isLoading: false,
          ids: [episodes[0].id, episodes[1].id, episodes[2].id]
        }
      }
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_EPISODES_ERROR action', () => {
    const state = { byId: {}, byShow: {} };
    const error = new Error('error');
    const action = fetchEpisodesError(show.id, error);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {},
      byShow: {
        [show.id]: {
          isLoading: false,
          error,
          ids: []
        }
      }
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_EPISODE_REQUEST action', () => {
    const state = { byId: {}, byShow: {} };
    const action = fetchEpisodeRequest(episode.id);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [episode.id]: {
          error: null,
          isLoading: true
        }
      },
      byShow: {}
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_EPISODE_SUCCESS action', () => {
    const state = { byId: {}, byShow: {} };
    const action = fetchEpisodeSuccess(episode.id, episode);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [episode.id]: {
          data: episode,
          isLoading: false
        }
      },
      byShow: {}
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_EPISODE_ERROR action', () => {
    const state = { byId: {}, byShow: {} };
    const error = new Error('error');
    const action = fetchEpisodeError(episode.id, error);
    const newState = reducer(state, action);

    const expectedState = {
      byId: {
        [episode.id]: {
          error,
          isLoading: false
        }
      },
      byShow: {}
    };
    expect(newState).toEqual(expectedState);
  });
});
