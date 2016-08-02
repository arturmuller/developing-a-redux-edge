import test from 'tape';
import * as reducers from './reducers';
import * as actions from './actions';
import { getMockState } from './testUtils';

test('reducer | byId :: Handle "addNote" action',
  ({ deepEqual, end }) => {

    const state = getMockState.withNoNotes();

    const actualNextState = reducers.byId(state.byId, actions.addNote('Hello world', "id-123", 1));
    const expectedNextState = {
      'id-123': {
        id: 'id-123',
        content: 'Hello world',
        timestamp: 1,
      },
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle "updateNote" action',
  ({ deepEqual, end }) => {

    const state = getMockState.withOneNote();

    const actualNextState = reducers.byId(state.byId, actions.updateNote('Hi there', "id-123", 2));
    const expectedNextState = {
      'id-123': {
        id: 'id-123',
        content: 'Hi there',
        timestamp: 2,
      },
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle "removeNote" action',
  ({ deepEqual, end }) => {

    const state = getMockState.withOneNote();

    const actualNextState = reducers.byId(state.byId, actions.removeNote("id-123"));
    const expectedNextState = {};

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

// ids reducer

test('reducer | ids :: Handle "addNote" action',
  ({ deepEqual, end }) => {

    const state = getMockState.withNoNotes();

    const actualNextState = reducers.ids(state.ids, actions.addNote("Hi", "id-123"));
    const expectedNextState = [ 'id-123' ];

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | ids :: Handle "removeNote" action',
  ({ deepEqual, end }) => {

    const state = getMockState.withOneNote();

    const actualNextState = reducers.ids(state.ids, actions.removeNote("id-123"));
    const expectedNextState = [];

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

// openNoteId reducer

test('reducer | openNoteId :: Handle "addNote" action',
  ({ equal, end }) => {

    const state = getMockState.withNoOpenNotes();

    const actualNextState = reducers.openNoteId(state.openNoteId, actions.addNote("Hi", "id-123"));
    const expectedNextState = 'id-123';

    equal(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openNoteId :: Handle "openNote" action',
  ({ equal, end }) => {

    const state = getMockState.withNoOpenNotes();

    const actualNextState = reducers.openNoteId(state.openNoteId, actions.openNote("id-123"));
    const expectedNextState = 'id-123';

    equal(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openNoteId :: Handle "removeNote" action',
  ({ equal, end }) => {

    const state = getMockState.withOneNote();

    const actualNextState = reducers.openNoteId(state.openNoteId, actions.removeNote("id-123"));
    const expectedNextState = null;

    equal(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openNoteId :: Handle "closeNote" action',
  ({ equal, end }) => {

    const state = getMockState.withOneNote();

    const actualNextState = reducers.openNoteId(state.openNoteId, actions.closeNote());
    const expectedNextState = null;

    equal(actualNextState, expectedNextState);
    end();
  }
);
