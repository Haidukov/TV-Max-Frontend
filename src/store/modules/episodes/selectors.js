export const getShowEpisodes = id => state =>
  state.episodes.byShow[id]?.ids?.map(episodeId => state.episodes.byId[episodeId]?.data) || [];

export const getShowEpisodesLoading = id => state => !!state.episodes.byShow[id]?.isLoading;

export const getShowEpisodesError = id => state => state.episodes.byShow[id]?.error;

export const getEpisode = id => state => state.episodes.byId[id]?.data || {};

export const getEpisodeLoading = id => state => !!state.episodes.byId[id]?.isLoading;

export const getEpisodeError = id => state => state.episodes.byId[id]?.error;
