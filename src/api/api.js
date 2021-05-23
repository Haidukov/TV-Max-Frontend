import apiClient from './client';

export default class ShowAPIService {
  constructor(client = apiClient) {
    this.client = client;
  }

  getShow = async id => this.client.get(`/shows/${id}`);

  getShowEpisodes = async id => this.client.get(`/shows/${id}/episodes`);

  getEpisode = async id => this.client.get(`/episodes/${id}`);
}
