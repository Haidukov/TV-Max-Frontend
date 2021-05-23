import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import { render } from '@testing-library/react';
import ShowDetails from './ShowDetails';
import configureStore from '../../store';
import { fetchShowRequest } from '../../store/modules/actions';
import show from '../../fixtures/show.json';

const renderComponent = (id, partialState = {}) => {
  const preloadedState = {
    shows: {
      byId: {
        [id]: partialState
      }
    }
  };
  const store = configureStore(preloadedState);
  jest.spyOn(store, 'dispatch').mockImplementation(() => {});
  const wrapper = render(
    <MemoryRouter initialEntries={[`/path/${id}`]}>
      <Provider store={store}>
        <Route path='/path/:showId' component={ShowDetails} />
      </Provider>
    </MemoryRouter>
  );
  return { store, wrapper };
};

const findSpinner = wrapper => wrapper.queryByRole('status');

const findErrorMessage = wrapper => wrapper.queryByRole('alert');

const findDetails = wrapper => wrapper.queryByTestId('details');

describe('<ShowDetails />', () => {
  it('should fetch show', () => {
    const { store } = renderComponent(show.id);
    expect(store.dispatch).toHaveBeenCalledWith(fetchShowRequest(show.id.toString()));
  });

  describe('When loading show', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = renderComponent(show.id, { data: null, isLoading: true }).wrapper;
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
      wrapper = renderComponent(show.id, {
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
      wrapper = renderComponent(show.id, {
        data: show,
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
