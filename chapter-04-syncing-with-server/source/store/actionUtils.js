export const asyncAction = ({ func, start, success, failure }) => (
  (...args) => (dispatch) => {
    dispatch(start());
    return func(...args)
      .then((data) => dispatch(success(data)))
      .catch((error) => dispatch(failure(error)));
  }
);

export const startAction = (type) => () => ({
  type,
  meta: {
    done: false,
  },
});

export const successAction = (type) => (payload) => ({
  type,
  payload,
  meta: {
    done: true,
  },
});

export const failureAction = (type) => (error) => ({
  type,
  payload: error,
  error: true,
  meta: {
    done: true,
  },
});
