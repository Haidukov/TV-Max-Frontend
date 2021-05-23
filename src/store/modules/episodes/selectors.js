import { createSelector } from 'reselect';
import { wrapSelector } from '../../../utils/selectors';

const getShowEpisodeIds = id => state => state.episodes.byShow[id]?.ids || [];

const getEpisodeByIdMap = state => state.episodes.byId;

export const getShowEpisodes = wrapSelector(id => createSelector(
  getShowEpisodeIds(id),
  getEpisodeByIdMap,
  (ids, byId) => ids?.map(episodeId => byId[episodeId]?.data)
));

export const getShowEpisodesLoading = id => state => !!state.episodes.byShow[id]?.isLoading;

export const getShowEpisodesError = id => state => state.episodes.byShow[id]?.error;

export const getEpisode = id => state => state.episodes.byId[id]?.data || {};

export const getEpisodeLoading = id => state => !!state.episodes.byId[id]?.isLoading;

export const getEpisodeError = id => state => state.episodes.byId[id]?.error;
