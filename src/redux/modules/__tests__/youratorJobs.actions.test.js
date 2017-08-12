/* eslint-disable import/first, global-require, no-unused-vars */
jest.mock('../../../constants/url');

import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import mockYouratorJobs from './mocks/mockYouratorJobs.json';
import URLS from '../../../constants/url';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from '../youratorJobs';
const { YOURATOR_F2E_LIST_API } = URLS;

describe('youratorJobs action', () => {
  let youratorJobs;
  let store;
  let scope;
  let createStore;
  const apiBaseUrl = 'http://localhost';

  beforeEach(() => {
    jest.resetModules();
    nock.cleanAll();
    scope = null;
    global.__DEV__ = false;

    youratorJobs = require('../youratorJobs');
    jest.mock('../../configureStore');
    createStore = require('../../configureStore').default;

    store = createStore({
      youratorJobs: {
        list: {
          isFetching: false,
          didInvalidate: false,
          items: [],
        },
        byId: {
        },
      },
    });
  });

  describe('action: load', () => {
    let expectedActions;

    beforeEach(() => {
      expectedActions = [
        {
          type: LOAD,
        },
        {
          type: LOAD_SUCCESS,
          result: {
            jobs: mockYouratorJobs.jobs,
          },
        },
      ];

      scope = nock(apiBaseUrl).get(YOURATOR_F2E_LIST_API.replace(apiBaseUrl, '')).reply(
        200,
        {
          jobs: mockYouratorJobs.jobs,
        },
      );
    });

    it('should be thenable function', async () => {
      const result = store.dispatch(youratorJobs.load());

      await result;

      expect(typeof result.then).toBe('function');
      expect(scope.isDone()).toBeTruthy();
    });

    it('should show load & success actions', async () => {
      await store.dispatch(youratorJobs.load());

      expect(store.getActions()).toEqual(expectedActions);
      expect(scope.isDone()).toBeTruthy();
    });

    it('should get expected data', async () => {
      const result = await store.dispatch(youratorJobs.load());

      expect(result.data).toEqual(expectedActions[1].result);
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('action: load - load & fail', () => {
    let expectedActions;
    const errorMessage = 'Internal Server Error';

    beforeEach(() => {
      expectedActions = [
        {
          type: LOAD,
        },
        {
          error: {
            data: 'Internal Server Error',
          },
          type: LOAD_FAIL,
        },
      ];

      scope = nock(apiBaseUrl).get(YOURATOR_F2E_LIST_API.replace(apiBaseUrl, '')).reply(
        500,
        {
          data: errorMessage,
        },
      );
    });

    it('should show load & fail actions', async () => {
      try {
        await store.dispatch(youratorJobs.load());
      } catch (e) {
        expect(store.getActions()).toEqual(expectedActions);
        expect(scope.isDone()).toBeTruthy();
      }
    });

    it('should get exception', async () => {
      try {
        await store.dispatch(youratorJobs.load());
      } catch (object) {
        expect(object.response.data.data).toEqual(errorMessage);
        expect(scope.isDone()).toBeTruthy();
      }
    });
  });
});
