import {
  FETCH_EPISODES_ERROR,
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODE_ERROR,
  FETCH_EPISODE_REQUEST,
  FETCH_EPISODE_SUCCESS
} from '../action-types';

export const fetchEpisodesRequest = id => ({
  type: FETCH_EPISODES_REQUEST,
  payload: { id }
});

export const fetchEpisodesSuccess = (id, episodes) => ({
  type: FETCH_EPISODES_SUCCESS,
  payload: {
    id,
    episodes
  }
});

export const fetchEpisodesError = (id, error) => ({
  type: FETCH_EPISODES_ERROR,
  payload: {
    id,
    error
  }
});

export const fetchEpisodeRequest = id => ({
  type: FETCH_EPISODE_REQUEST,
  payload: { id }
});

export const fetchEpisodeSuccess = (id, data) => ({
  type: FETCH_EPISODE_SUCCESS,
  payload: {
    id,
    data
  }
});

export const fetchEpisodeError = (id, error) => ({
  type: FETCH_EPISODE_ERROR,
  payload: {
    id,
    error
  }
});
