import { combineReducers } from 'redux';
import { dissoc } from 'ramda';
import { without } from 'ramda';
import { merge } from 'ramda';
import { prepend } from 'ramda';

export const byId = (state = {}, { type, payload, meta, error }) => {
  switch (type) {
    case 'app/fetchNotes':
      if (meta.done && !error) {
        return payload.notes;
      }
      return state;
    case 'app/addNote':
      if (meta.done && !error) {
        return merge(state, { [payload.id]: payload });
      }
      return state;
    case 'app/updateNote':
      return merge(state, { [payload.id]: payload });
    case 'app/updateNoteServer':
      if (meta.done && !error) {
        return merge(state, { [payload.id]: payload });
      }
      return state;
    case 'app/removeNote':
      if (meta.done && !error) {
        return dissoc(payload.id, state);
      }
      return state;
    default:
      return state;
  }
};

export const ids = (state = [], { type, payload, meta, error }) => {
  switch (type) {
    case 'app/fetchNotes':
      if (meta.done && !error) {
        return payload.noteIds;
      }
      return state;
    case 'app/addNote':
      if (meta.done && !error) {
        return prepend(payload.id, state);
      }
      return state;
    case 'app/removeNote':
      if (meta.done && !error) {
        return without(payload.id, state);
      }
      return state;
    default:
      return state;
  }
};

export const openNoteId = (state = null, { type, payload, meta, error }) => {
  switch (type) {
    case 'app/addNote':
      if (meta.done && !error) {
        return payload.id;
      }
      return null;
    case 'app/openNote':
      return payload.id;
    case 'app/removeNote':
      if (meta.done && !error) {
        return null;
      }
      return state;
    case 'app/closeNote':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  openNoteId,
});
