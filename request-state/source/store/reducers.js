import { combineReducers } from 'redux';
import { dissoc } from 'ramda';
import { without } from 'ramda';
import { merge } from 'ramda';
import { prepend } from 'ramda';

export const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/updateNote':
    case 'app/insertNote':
      return merge(state, { [payload.id]: payload });
    case 'app/replaceNotes':
      return payload.notes;
    case 'app/removeNote':
      return dissoc(payload.id, state);
    default:
      return state;
  }
};

export const ids = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceNotes':
      return payload.ids;
    case 'app/insertNote':
      return prepend(payload.id, state);
    case 'app/removeNote':
      return without(payload.id, state);
    default:
      return state;
  }
};

export const openNoteId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/openNote':
      return payload.id;
    case 'app/closeNote':
      return null;
    default:
      return state;
  }
};

export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/setToast':
      return payload;
    case 'app/clearToast':
      return null;
    default:
      return state;
  }
};

export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case 'app/markRequestPending':
      return merge(state, { [meta.key]: { status: 'pending', error: null } });
    case 'app/markRequestSuccess':
      return merge(state, { [meta.key]: { status: 'success', error: null } });
    case 'app/markRequestFailed':
      return merge(state, { [meta.key]: { status: 'failure', error: payload } });
    default:
      return state;
  }
};

export default combineReducers({
  notes: combineReducers({
    byId,
    ids,
  }),
  ui: combineReducers({
    openNoteId,
    toast,
  }),
  requests,
});
