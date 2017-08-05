export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;

      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;

      if (REQUEST) {
        next({ ...rest, type: REQUEST });
      }

      const actionPromise = promise(client);

      actionPromise
        .then(
          result => {
            if (Array.isArray(result)) {
              return next({ ...rest, result: result.map(r => r.data), type: SUCCESS });
            }

            return next({ ...rest, result: result && result.data, type: SUCCESS });
          },
          error => next({ ...rest, error: (error && error.response && error.response.data) || error, type: FAILURE })
        )
        .catch(error => {
          console.error('MIDDLEWARE ERROR:', error);
          next({ ...rest, error, type: FAILURE });
        });

      return actionPromise;
    };
  };
}
