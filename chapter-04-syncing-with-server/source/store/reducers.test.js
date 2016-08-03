import test from 'tape';
import * as reducers from './reducers';
import * as actions from './actions';
import { getMockState, getActionPayload } from './testUtils';

// byId reducer

test('reducer | byId :: Handle "fetchNotesSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoNotes();
    const fetchedNotes = getActionPayload.fetchNotesSuccess();
    const actualNextState = reducers.byId(
      state.byId,
      actions.fetchNotesSuccess(fetchedNotes)
    );
    const noteId = fetchedNotes.noteIds[0];
    const expectedNextState = {
      [noteId]: fetchedNotes.notes[noteId],
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle "addNoteSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoNotes();
    const newNote = getActionPayload.addNoteSuccess();
    const actualNextState = reducers.byId(
      state.byId,
      actions.addNoteSuccess(newNote)
    );
    const expectedNextState = {
      [newNote.id]: newNote,
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle "updateServerSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneNote();
    const updatedNote = getActionPayload.updateServerSuccess();
    const actualNextState = reducers.byId(
      state.byId,
      actions.updateServerSuccess(updatedNote)
    );
    const expectedNextState = {
      [updatedNote.id]: updatedNote,
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle "updateNote" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneNote();
    const actualNextState = reducers.byId(
      state.byId,
      actions.updateNote('Hi there', 'id-123', 2)
    );
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

test('reducer | byId :: Handle "removeNoteSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneNote();
    const actualNextState = reducers.byId(
      state.byId,
      actions.removeNoteSuccess({ id: 'id-123' })
    );
    const expectedNextState = {};

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

// ids reducer

test('reducer | ids :: Handle "fetchNotesSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoNotes();
    const actualNextState = reducers.ids(
      state.ids,
      actions.fetchNotesSuccess(getActionPayload.fetchNotesSuccess())
    );
    const expectedNextState = [ 'id-123' ];

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | ids :: Handle "addNoteSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoNotes();
    const actualNextState = reducers.ids(
      state.ids,
      actions.addNoteSuccess(getActionPayload.addNoteSuccess())
    );
    const expectedNextState = [ 'id-123' ];

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | ids :: Handle "removeNoteSuccess" action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneNote();
    const actualNextState = reducers.ids(
      state.ids,
      actions.removeNoteSuccess({ id: 'id-123' })
    );
    const expectedNextState = [];

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

// openNoteId reducer

test('reducer | openNoteId :: Handle "addNoteSuccess" action',
  ({ equal, end }) => {
    const state = getMockState.withNoOpenNotes();
    const actualNextState = reducers.openNoteId(
      state.openNoteId,
      actions.addNoteSuccess(getActionPayload.addNoteSuccess())
    );
    const expectedNextState = 'id-123';

    equal(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openNoteId :: Handle "openNote" action',
  ({ equal, end }) => {
    const state = getMockState.withNoOpenNotes();
    const actualNextState = reducers.openNoteId(
      state.openNoteId,
      actions.openNote('id-123')
    );
    const expectedNextState = 'id-123';

    equal(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openNoteId :: Handle "removeNoteSuccess" action',
  ({ equal, end }) => {
    const state = getMockState.withOneNote();
    const actualNextState = reducers.openNoteId(
      state.openNoteId,
      actions.removeNoteSuccess({ id: 'id-123' })
    );
    const expectedNextState = null;

    equal(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openNoteId :: Handle "closeNote" action',
  ({ equal, end }) => {
    const state = getMockState.withOneNote();
    const actualNextState = reducers.openNoteId(
      state.openNoteId,
      actions.closeNote()
    );
    const expectedNextState = null;

    equal(actualNextState, expectedNextState);
    end();
  }
);
