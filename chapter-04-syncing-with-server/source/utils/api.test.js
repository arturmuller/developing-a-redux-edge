import test from 'tape';
import fetchMock from 'fetch-mock';

import api from './api';
import { testErrorRejection } from './testUtils';

test('api | notes.fetch ::', (t1) => {
  const NOTE_ONE = {
    id: 123,
    content: 'testing',
    timestamp: 1,
  };
  const NOTE_TWO = {
    id: 456,
    content: 'testing too',
    timestamp: 1,
  };
  const DUMMY_CREATE_RESPONSE = [ NOTE_ONE, NOTE_TWO ];

  t1.test('Returns notes and noteIds', ({ deepEqual, end }) => {
    fetchMock.mock('/notes', DUMMY_CREATE_RESPONSE);
    api.notes
      .fetch()
      .then(({ notes, noteIds }) => {
        const expedtedNotes = {
          [NOTE_ONE.id]: NOTE_ONE,
          [NOTE_TWO.id]: NOTE_TWO,
        };
        const expectedNoteIds = [ 123, 456 ];

        deepEqual(noteIds, expectedNoteIds);
        deepEqual(notes, expedtedNotes);

        end();
      });
  });

  t1.test('Gets rejected with an error containing the status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/notes',
      equal,
      func: () => api.notes.fetch(),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});

test('api | notes.add ::', (t1) => {
  const NOTE = {
    id: 123,
    timestamp: 1,
  };

  t1.test('Returns a new note from the api', ({ deepEqual, end }) => {
    fetchMock.mock('/notes', 'POST', (url, options) => {
      const { content } = JSON.parse(options.body);
      return {
        ...NOTE,
        content,
      };
    });

    api.notes
      .add('testContent')
      .then((note) => {
        const expectedNote = {
          ...NOTE,
          content: 'testContent',
        };
        deepEqual(note, expectedNote);
        end();
      });
  });

  t1.test('Gets rejected with an error containing the status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/notes',
      equal,
      method: 'POST',
      func: () => api.notes.add('test'),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});

test('api | notes.update ::', (t1) => {
  const NOTE = {
    id: 123,
    timestamp: 1,
  };

  t1.test('Returns an updated note from the api', ({ deepEqual, end }) => {
    fetchMock.mock('/notes/123', 'PUT', (url, options) => {
      const { content } = JSON.parse(options.body);
      return {
        ...NOTE,
        content,
      };
    });

    api.notes
      .update(123, 'testContent')
      .then((note) => {
        const expectedNote = {
          ...NOTE,
          content: 'testContent',
        };
        deepEqual(note, expectedNote);
        end();
      });
  });

  t1.test('Gets rejected with an error containing the status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/notes/123',
      equal,
      method: 'PUT',
      func: () => api.notes.update(123, 'test'),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});

test('api | notes.delete ::', (t1) => {

  t1.test('Removes a note from the api', ({ equal, end }) => {
    fetchMock.mock('/notes/123', 'DELETE', 200);

    api.notes
      .delete(123)
      .then((res) => {
        equal(res, '');
        end();
      });
  });

  t1.test('Gets rejected with an error containing the status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/notes/123',
      method: 'DELETE',
      equal,
      func: () => api.notes.delete(123),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});
