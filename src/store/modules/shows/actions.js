import {
  FETCH_SHOW_ERROR,
  FETCH_SHOW_REQUEST,
  FETCH_SHOW_SUCCESS
} from '../action-types';

export const fetchShowRequest = id => ({
  type: FETCH_SHOW_REQUEST,
  payload: { id }
});

export const fetchShowSuccess = (id, data) => ({
  type: FETCH_SHOW_SUCCESS,
  payload: {
    id,
    data
  }
});

export const fetchShowError = (id, error) => ({
  type: FETCH_SHOW_ERROR,
  payload: {
    id,
    error
  }
});
