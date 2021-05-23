// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import API from '../api/api';
import rootReducer from './modules/reducer';
import rootSaga from './modules/saga';

const configureStore = (initialState = {}, api = new API()) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      api
    }
  });

  const middlewares = [sagaMiddleware];

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
