import { getShowEpisodes } from '../selectors';
import episodes from '../../../../fixtures/episodes.json';

describe('selectors', () => {
  test('getShowEpisodes selector', () => {
    const id1 = 1;
    const id2 = 10;
    const state = {
      episodes: {
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
          [id1]: {
            isLoading: false,
            ids: [episodes[0].id, episodes[1].id]
          },
          [id2]: {
            isLoading: false,
            ids: [episodes[2].id]
          }
        }
      }
    };
    const result1 = getShowEpisodes(id1)(state);
    expect(result1).toEqual([episodes[0], episodes[1]]);

    const result2 = getShowEpisodes(id2)(state);
    expect(result2).toEqual([episodes[2]]);
  });
});
