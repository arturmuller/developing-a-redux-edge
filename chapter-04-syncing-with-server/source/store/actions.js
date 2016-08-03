import api from '../utils/api';
import { startAction, successAction, failureAction, asyncAction } from './actionUtils';

const fetchNotesType = 'app/fetchNotes';
export const fetchNotesStart = startAction(fetchNotesType);
export const fetchNotesSuccess = successAction(fetchNotesType);
export const fetchNotesFailure = failureAction(fetchNotesType);
export const fetchNotes = asyncAction({
  func: () => api.notes.fetch(),
  start: fetchNotesStart,
  success: fetchNotesSuccess,
  failure: fetchNotesFailure,
});

const addNoteType = 'app/addNote';
export const addNoteStart = startAction(addNoteType);
export const addNoteSuccess = successAction(addNoteType);
export const addNoteFailure = failureAction(addNoteType);
export const addNote = asyncAction({
  func: (content) => api.notes.add(content),
  start: addNoteStart,
  success: addNoteSuccess,
  failure: addNoteFailure,
});

export const updateNote = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateNote',
  payload: {
    id,
    content,
    timestamp,
  },
});

const updateNoteServerType = 'app/updateNoteServer';
export const updateServerStart = startAction(updateNoteServerType);
export const updateServerSuccess = successAction(updateNoteServerType);
export const updateServerFailure = failureAction(updateNoteServerType);
export const updateNoteServer = asyncAction({
  func: (id, content) => api.notes.update(id, content),
  start: updateServerStart,
  success: updateServerSuccess,
  failure: updateServerFailure,
});

const removeNoteType = 'app/removeNote';
export const removeNoteStart = startAction(removeNoteType);
export const removeNoteSuccess = successAction(removeNoteType);
export const removeNoteFailure = failureAction(removeNoteType);
export const removeNote = asyncAction({
  func: (id) => api.notes.delete(id).then(() => ({ id })),
  start: removeNoteStart,
  success: removeNoteSuccess,
  failure: removeNoteFailure,
});

export const closeNote = () => ({
  type: 'app/closeNote',
});

export const openNote = (id) => ({
  type: 'app/openNote',
  payload: { id },
});
