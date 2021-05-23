import API from '../api';
import show from '../../fixtures/show.json';
import episodes from '../../fixtures/episodes.json';

const id = 2;

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
    const result = await apiService.getShow(id);
    expect(client.get).toHaveBeenCalledWith(`/shows/${id}`);
    expect(result).toBe(show);
  });

  test('getShowEpisodes', async () => {
    client.get.mockResolvedValueOnce(episodes);
    const result = await apiService.getShowEpisodes(id);
    expect(client.get).toHaveBeenCalledWith(`/shows/${id}/episodes`);
    expect(result).toBe(episodes);
  });

  test('getEpisode', async () => {
    client.get.mockResolvedValueOnce(episodes[0]);
    const result = await apiService.getEpisode(episodes[0].id);
    expect(client.get).toHaveBeenCalledWith(`/episodes/${episodes[0].id}`);
    expect(result).toBe(episodes[0]);
  });
});
