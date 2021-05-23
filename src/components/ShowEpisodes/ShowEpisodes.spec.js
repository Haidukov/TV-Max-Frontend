import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import { render } from '@testing-library/react';
import ShowEpisodes from './ShowEpisodes';
import configureStore from '../../store';
import episodes from '../../fixtures/episodes.json';

const LOADING_EPISODES_SHOW_ID = 1;
const FAILED_EPISODES_SHOW_ID = 2;
const LOADED_EPISODES_SHOW_ID = 3;

const renderComponent = id => {
  const preloadedState = {
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
        [LOADING_EPISODES_SHOW_ID]: { // loading
          error: null,
          isLoading: true,
          ids: []
        },
        [FAILED_EPISODES_SHOW_ID]: { // error
          error: new Error('error'),
          isLoading: false,
          ids: []
        },
        [LOADED_EPISODES_SHOW_ID]: { // loaded
          error: null,
          isLoading: false,
          ids: [episodes[0].id, episodes[1].id, episodes[2].id]
        }
      }
    }
  };
  const store = configureStore(preloadedState);
  jest.spyOn(store, 'dispatch').mockImplementation(() => {});
  const wrapper = render(
    <MemoryRouter initialEntries={[`/path/${id}`]}>
      <Provider store={store}>
        <Route path='/path/:showId' component={ShowEpisodes} />
      </Provider>
    </MemoryRouter>
  );
  return wrapper;
};

const findSpinner = wrapper => wrapper.queryByRole('status');

const findErrorMessage = wrapper => wrapper.queryByRole('alert');

const findEpisodes = wrapper => wrapper.container.querySelectorAll('tbody tr');

const findLink = episodeEl => episodeEl.querySelector('a');

describe('<EpisodeepisodesPage />', () => {
  describe('When loading episode', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(LOADING_EPISODES_SHOW_ID);
    });

    it('should display loading indicator', () => {
      expect(findSpinner(wrapper)).toBeInTheDocument();
    });

    it('shouldn`t display error message', () => {
      expect(findErrorMessage(wrapper)).not.toBeInTheDocument();
    });

    it('shouldn`t display episodes', () => {
      expect(findEpisodes(wrapper).length).toBe(0);
    });

    it('should match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  describe('When error occured', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(FAILED_EPISODES_SHOW_ID);
    });

    it('shouldn`t display loading indicator', () => {
      expect(findSpinner(wrapper)).not.toBeInTheDocument();
    });

    it('should display error message', () => {
      expect(findErrorMessage(wrapper)).toBeInTheDocument();
    });

    it('shouldn`t display episodes', () => {
      expect(findEpisodes(wrapper).length).toBe(0);
    });

    it('should match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  describe('When data loaded', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(LOADED_EPISODES_SHOW_ID);
    });

    it('shouldn`t display loading indicator', () => {
      expect(findSpinner(wrapper)).not.toBeInTheDocument();
    });

    it('shouldn`t display error message', () => {
      expect(findErrorMessage(wrapper)).not.toBeInTheDocument();
    });

    it('should display episodes', () => {
      expect(findEpisodes(wrapper).length).toBe(3);
    });

    it('should link to episode details page', () => {
      const episodeEl = findEpisodes(wrapper)[0];
      const link = findLink(episodeEl);
      expect(link.getAttribute('href')).toBe(`/episodes/${episodes[0].id}`);
    });

    it('should match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });
});
