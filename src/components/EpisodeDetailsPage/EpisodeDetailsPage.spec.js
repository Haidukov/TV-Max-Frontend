import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import { render } from '@testing-library/react';
import EpisodeDetailsPage from './EpisodeDetailsPage';
import configureStore from '../../store';
import { fetchEpisodeRequest } from '../../store/modules/actions';
import episodes from '../../fixtures/episodes.json';

const episode = episodes[0];

const renderComponent = (id, partialState = {}) => {
  const preloadedState = {
    episodes: {
      byId: {
        [id]: partialState
      },
      byShow: {}
    }
  };
  const store = configureStore(preloadedState);
  jest.spyOn(store, 'dispatch').mockImplementation(() => {});
  const wrapper = render(
    <MemoryRouter initialEntries={[`/path/${id}`]}>
      <Provider store={store}>
        <Route path='/path/:episodeId' component={EpisodeDetailsPage} />
      </Provider>
    </MemoryRouter>
  );
  return { store, wrapper };
};

const findSpinner = wrapper => wrapper.queryByRole('status');

const findErrorMessage = wrapper => wrapper.queryByRole('alert');

const findDetails = wrapper => wrapper.queryByTestId('details');

describe('<EpisodeDetailsPage />', () => {
  it('should fetch episode', () => {
    const { store } = renderComponent(episode.id);
    expect(store.dispatch).toHaveBeenCalledWith(fetchEpisodeRequest(episode.id.toString()));
  });

  describe('When loading episode', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(episode.id, { data: null, isLoading: true }).wrapper;
    });

    it('should display loading indicator', () => {
      expect(findSpinner(wrapper)).toBeInTheDocument();
    });

    it('shouldn`t display error message', () => {
      expect(findErrorMessage(wrapper)).not.toBeInTheDocument();
    });

    it('shouldn`t display details', () => {
      expect(findDetails(wrapper)).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  describe('When error occured', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(episode.id, {
        data: null,
        isLoading: false,
        error: new Error('error')
      }).wrapper;
    });

    it('shouldn`t display loading indicator', () => {
      expect(findSpinner(wrapper)).not.toBeInTheDocument();
    });

    it('should display error message', () => {
      expect(findErrorMessage(wrapper)).toBeInTheDocument();
    });

    it('shouldn`t display details', () => {
      expect(findDetails(wrapper)).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  describe('When data loaded', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(episode.id, {
        data: episode,
        isLoading: false,
        error: null
      }).wrapper;
    });

    it('shouldn`t display loading indicator', () => {
      expect(findSpinner(wrapper)).not.toBeInTheDocument();
    });

    it('shouldn`t display error message', () => {
      expect(findErrorMessage(wrapper)).not.toBeInTheDocument();
    });

    it('should display details', () => {
      expect(findDetails(wrapper)).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });
});
