import configureMockStore from 'redux-mock-store';
import ApiClient from '../../helpers/ApiClient';
import createMiddleware from '../middleware/clientMiddleware';

const client = new ApiClient();

const middlewares = [createMiddleware(client)];

export default function configureStore(initialState) {
  const mockStore = configureMockStore(middlewares);

  return mockStore(initialState);
};
