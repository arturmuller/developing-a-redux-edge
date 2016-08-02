import { combineReducers } from 'redux';
import { dissoc } from 'ramda';
import { without } from 'ramda';
import { merge } from 'ramda';
import { prepend } from 'ramda';

export const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/addNote':
    case 'app/updateNote':
      return merge(state, { [payload.id]: payload });
    case 'app/removeNote':
      return dissoc(payload.id, state);
    default:
      return state;
  }
};

export const ids = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/addNote':
      return prepend(payload.id, state);
    case 'app/removeNote':
      return without(payload.id, state);
    default:
      return state;
  }
};

export const openNoteId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/addNote':
    case 'app/openNote':
      return payload.id;
    case 'app/removeNote':
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
