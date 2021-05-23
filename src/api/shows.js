export default class ShowAPIService {
  constructor(client) {
    this.client = client;
  }

  getShow(id) {
    return this.client.get(`/shows/${id}`);
  }

  getShowEpisodes(id) {
    return this.client.get(`/shows/${id}/episodes`);
  }
}
