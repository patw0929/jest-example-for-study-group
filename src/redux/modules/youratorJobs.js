import deepEqual from 'deep-equal';
import { YOURATOR_F2E_LIST_API } from '../../constants/url';

const EMPTY_ARRAY = [];

export const LOAD = 'youratorJobs/LOAD';
export const LOAD_SUCCESS = 'youratorJobs/LOAD_SUCCESS';
export const LOAD_FAIL = 'youratorJobs/LOAD_FAIL';

const initialState = {
  isFetching: false,
  didInvalidate: true,
};

const initialByIdOne = {};
const initialById = {};

function processByIdOne(state = initialByIdOne, actionType, actionResult) {
  switch (actionType) {
    case LOAD_SUCCESS: {
      const item = {
        ...state.items,
        ...actionResult,
      };
      const newItem = deepEqual(state.items, item) ? state.items : item;

      return {
        ...state,
        items: newItem,
      };
    }
    default: {
      return state;
    }
  }
}

function processByIdReduce(state, action, data, result) {
  return (data || EMPTY_ARRAY).reduce((collection, item) => {
    const id = item.id;
    collection[id] = processByIdOne(state[id], action.type, item); // eslint-disable-line no-param-reassign
    return collection;
  }, result);
}

function processById(state = initialById, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const items = action.result.jobs;
      let newState = {};

      newState = processByIdReduce(state, action, items, newState);

      return {
        ...state,
        ...newState,
      };
    }
    default: {
      return state;
    }
  }
}

function processByList(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    }
    case LOAD_FAIL: {
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        error: action.error,
      };
    }
    case LOAD_SUCCESS: {
      const data = action.result.jobs;
      const dataIds = (data && data.map && data.map(d => d.id)) || EMPTY_ARRAY;

      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: dataIds,
      };
    }
    default:
      return state;
  }
}

export default function reducer(state = {}, action) {
  return {
    byId: processById(state.byId, action, state),
    list: processByList(state.list, action, state),
  };
}

function shouldFetch(state) {
  const items = state.youratorJobs && state.youratorJobs.items;

  if (!items) {
    return true;
  } else if (items.isFetching) {
    return false;
  }

  return items.didInvalidate;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(YOURATOR_F2E_LIST_API),
  };
}

export function loadIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetch(getState())) {
      return dispatch(load());
    }

    return Promise.resolve();
  };
}
