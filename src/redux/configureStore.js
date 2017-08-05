import { createStore, applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-js';
import ApiClient from '../helpers/ApiClient';
import createMiddleware from '../redux/middleware/clientMiddleware';
import reducer from './reducer';

const client = new ApiClient();

const middlewares = [createMiddleware(client)];

const enhancer = applyMiddleware(...middlewares);

export default function configureStore(initialState) {
  let store = createStore(reducer, initialState, enhancer);

  if (__DEV__) {
    require('../Reactotron');

    store = Reactotron.createStore(reducer, initialState, enhancer);
  }

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducer').default); // eslint-disable-line global-require
    });
  }

  if (__DEV__) {
    window.store = store;
    window.reducer = reducer;
  }

  return store;
}
