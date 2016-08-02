export const getMockState = {
  withNoNotes: () => ({
    byId: {},
    ids: [],
    openNoteId: null,
  }),
  withOneNote: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        content: 'Hello world',
        timestamp: 1,
      },
    },
    ids: [ 'id-123' ],
    openNoteId: 'id-123',
  }),
  withTwoNotes: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        content: 'Hello world',
        timestamp: 1,
      },
      'id-456': {
        id: 'id-456',
        content: 'Hi globe',
        timestamp: 2,
      },
    },
    ids: [ 'id-123', 'id-456' ],
    openNoteId: 'id-456',
  }),
  withNoOpenNotes: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        content: 'Hello world',
        timestamp: 1,
      },
    },
    ids: [ 'id-123' ],
    openNoteId: null,
  }),
};
