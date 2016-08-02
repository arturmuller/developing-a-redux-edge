import test from 'tape';
import * as actions from './actions';

test('action creator | addNote :: Create correct action',
  ({ deepEqual, end }) => {

    const actualAction = actions.addNote('Hi', 'id-123', 1);
    const expectedAction = {
      type: 'app/addNote',
      payload: {
        id: 'id-123',
        content: 'Hi',
        timestamp: 1,
      },
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

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

test('action creator | removeNote :: Create correct action',
  ({ deepEqual, end }) => {

    const actualAction = actions.removeNote('id-123');
    const expectedAction = {
      type: 'app/removeNote',
      payload: {
        id: 'id-123',
      },
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

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
