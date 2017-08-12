import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from '../youratorJobs';
import mockYouratorJobs from './mocks/mockYouratorJobs.json';

describe('youratorJobsReducer', () => {
  let youratorJobsReducer;

  beforeEach(() => {
    jest.resetModules();
    youratorJobsReducer = require('../youratorJobs').default; // eslint-disable-line global-require
  });

  describe('type: LOAD', () => {
    it('should show the initial load status', () => {
      const state = {};

      const result = youratorJobsReducer(state, {
        type: LOAD
      });

      expect(result).toEqual({
        ...state,
        byId: {},
        list: {
          didInvalidate: false,
          isFetching: true,
        },
      });
    });
  });

  describe('type: LOAD_FAIL', () => {
    it('should show the fail status', () => {
      const state = {};

      const result = youratorJobsReducer(state, {
        type: LOAD_FAIL,
        error: 'LOAD_FAIL',
      });

      expect(result).toEqual({
        ...state,
        byId: {},
        list: {
          isFetching: false,
          didInvalidate: false,
          error: 'LOAD_FAIL',
        }
      });
    });
  });

  describe('type: LOAD_SUCCESS', () => {
    it('should show the success status', () => {
      const state = {};

      const fakeRequestResponse = {
        type: LOAD_SUCCESS,
        result: {
          jobs: mockYouratorJobs.jobs,
        },
      };
      const result = youratorJobsReducer(state, fakeRequestResponse);

      expect(result).toMatchSnapshot();
    });
  });

  describe('type: LOAD to LOAD_SUCCESS', () => {
    it('should match snapshot', () => {
      const actions = [
        { type: LOAD },
        { type: LOAD_SUCCESS, result: { jobs: mockYouratorJobs.jobs } },
      ];

      let result;
      for (const action of actions) {
        result = youratorJobsReducer(result, action);
        expect(result).toMatchSnapshot();
      }
    });
  });
});
