import test from 'tape';
import * as selectors from './selectors';
import { getMockState } from './testUtils';

test('selector | getNotes :: Return empty array if state contains no notes',
  ({ deepEqual, end }) => {

    const state = getMockState.withNoNotes();

    const actualSelection = selectors.getNotes(state);
    const expectedSelection = [];

    deepEqual(actualSelection, expectedSelection);
    end();
  }
);

test('selector | getNotes :: Return array of note objects if state contains some notes',
  ({ deepEqual, end }) => {

    const state = getMockState.withOneNote();

    const expectedSelection = [
      {
        id: 'id-123',
        content: 'Hello world',
        timestamp: 1,
      },
    ];
    const actualSelection = selectors.getNotes(state);

    deepEqual(actualSelection, expectedSelection);
    end();
  }
);

test('selector | getNote :: Return null if state doesn\'t contain a note with that id',
  ({ deepEqual, end }) => {

    const state = getMockState.withTwoNotes();

    const actualSelection = selectors.getNote(state, 'id-999');
    const expectedSelection = null;

    deepEqual(actualSelection, expectedSelection);
    end();
  }
);

test('selector | getNote :: Return note object if state contains note with passed id',
  ({ deepEqual, end }) => {

    const state = getMockState.withTwoNotes();

    const actualSelection = selectors.getNote(state, 'id-123');
    const expectedSelection = {
      id: 'id-123',
      content: 'Hello world',
      timestamp: 1,
    };

    deepEqual(actualSelection, expectedSelection);
    end();
  }
);

test('selector | getOpenNoteId :: Return null if state doesn\'t have open note set',
  ({ equal, end }) => {

    const state = getMockState.withNoNotes();

    const actualSelection = selectors.getOpenNoteId(state);
    const expectedSelection = null;

    equal(actualSelection, expectedSelection);
    end();
  }
);

test('selector | getOpenNoteId :: Return note id if state has open note set',
  ({ deepEqual, end }) => {

    const state = getMockState.withOneNote();

    const actualSelection = selectors.getOpenNoteId(state);
    const expectedSelection = 'id-123';

    deepEqual(actualSelection, expectedSelection);
    end();
  }
);
