export const getShow = id => state => state.shows.byId[id]?.data || {};

export const getShowLoading = id => state => !!state.shows.byId[id]?.isLoading;

export const getShowError = id => state => state.shows.byId[id]?.error;
