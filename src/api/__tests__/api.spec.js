import API from '../api';
import show from '../../fixtures/show.json';
import episodes from '../../fixtures/episodes.json';

describe('API', () => {
  let client;
  let apiService;

  beforeEach(() => {
    client = {
      get: jest.fn()
    };
    apiService = new API(client);
  });

  test('getShow', async () => {
    client.get.mockResolvedValueOnce(show);
    const result = await apiService.getShow(show.id);
    expect(client.get).toHaveBeenCalledWith(`/shows/${show.id}`);
    expect(result).toBe(show);
  });

  test('getShowEpisodes', async () => {
    client.get.mockResolvedValueOnce(episodes);
    const result = await apiService.getShowEpisodes(show.id);
    expect(client.get).toHaveBeenCalledWith(`/shows/${show.id}/episodes`);
    expect(result).toBe(episodes);
  });

  test('getEpisode', async () => {
    client.get.mockResolvedValueOnce(episodes[0]);
    const result = await apiService.getEpisode(episodes[0].id);
    expect(client.get).toHaveBeenCalledWith(`/episodes/${episodes[0].id}`);
    expect(result).toBe(episodes[0]);
  });
});
