import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './actions';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const assertReturnsFunction = ({ equal, end }, func) => {
  const result = func();
  equal(typeof result, 'function');
  end();
};

const assertFirstDispatchedAction = ({ func, type, deepEqual, end }) => {
  const store = mockStore({});
  store.dispatch(func());
  const dispatchedActions = store.getActions();
  const actualAction = dispatchedActions[0];
  const expectedAction = {
    type,
    meta: {
      done: false,
    },
  };

  deepEqual(actualAction, expectedAction);
  end();
};

const assertLastDispatchedAction = ({ deepEqual, end, func, expectedAction }) => {
  const store = mockStore({});
  store.dispatch(func())
    .then(() => {
      const dispatchedActions = store.getActions();
      const actualAction = dispatchedActions[dispatchedActions.length - 1];
      deepEqual(actualAction, expectedAction);
      end();
    });
};

const createErrorAction = (type) => ({
  type,
  payload: {},
  error: true,
  meta: { done: true },
});

const createSuccessAction = (type, payload) => ({
  type,
  payload,
  meta: { done: true },
});

const testAsyncAction = ({ test }, options) => {
  const {
    path,
    method,
    successMockReturn,
    successPayload,
    failureMockReturn,
    func,
    type,
  } = options;

  test('Setup', ({ end }) => {
    fetchMock.mock(path, method, successMockReturn);
    end();
  });

  test('Returns a function', (test) => {
    assertReturnsFunction(test, func);
  });

  test('Dispatches initial action', (test) => {
    assertFirstDispatchedAction({ ...test, func, type });
  });

  test('Dispatches correct action on success', (test) => {
    const expectedAction = createSuccessAction(type, successPayload);
    assertLastDispatchedAction({ ...test, func, expectedAction });
  });

  test('Dispatches correct action on failure', (test) => {
    fetchMock.reMock(path, method, failureMockReturn);
    const expectedAction = createErrorAction(type);
    assertLastDispatchedAction({ ...test, func, expectedAction });
  });

  test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
};

test('action creator | fetchNotes ::', (t1) => {
  const NOTE = {
    id: 123,
    content: 'testing',
    timestamp: 456,
  };
  const func = () => actions.fetchNotes();
  const type = 'app/fetchNotes';
  const successPayload = { noteIds: [ NOTE.id ], notes: { [NOTE.id]: NOTE } };
  const path = '/notes';
  const method = 'GET';
  const successMockReturn = [ NOTE ];
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | addNote ::', (t1) => {
  const successPayload = {
    id: 123,
    content: 'Hi',
    timestamp: 456,
  };
  const func = () => actions.addNote('Hi');
  const type = 'app/addNote';
  const path = '/notes';
  const method = 'POST';
  const successMockReturn = (url, { body }) => ({
    id: 123,
    content: JSON.parse(body).content,
    timestamp: 456,
  });
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | updateNoteServer ::', (t1) => {
  const successPayload = {
    id: 123,
    content: 'Hi',
    timestamp: 456,
  };
  const func = () => actions.updateNoteServer(123, 'Hi');
  const type = 'app/updateNoteServer';
  const path = '/notes/123';
  const method = 'PUT';
  const successMockReturn = (url, { body }) => ({
    id: 123,
    content: JSON.parse(body).content,
    timestamp: 456,
  });
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | updateNote :: Create correct action',
  ({ deepEqual, end }) => {

    const actualAction = actions.updateNote('Hello', 'id-123', 2);
    const expectedAction = {
      type: 'app/updateNote',
      payload: {
        id: 'id-123',
        content: 'Hello',
        timestamp: 2,
      },
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

test('action creator | removeNote ::', (t1) => {
  const func = () => actions.removeNote(123);
  const type = 'app/removeNote';
  const successPayload = { id: 123 };
  const path = '/notes/123';
  const method = 'DELETE';
  const successMockReturn = { status: 200, body: '' };
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | openNote :: Create correct action',
  ({ deepEqual, end }) => {

    const actualAction = actions.openNote('id-123');
    const expectedAction = {
      type: 'app/openNote',
      payload: {
        id: 'id-123',
      },
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

test('action creator | closeNote :: Create correct action',
  ({ deepEqual, end }) => {

    const actualAction = actions.closeNote();
    const expectedAction = {
      type: 'app/closeNote',
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);
