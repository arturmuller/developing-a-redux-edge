import { v4 } from 'uuid';

export const addNote = (content = '', id = v4(), timestamp = Date.now()) => ({
  type: 'app/addNote',
  payload: {
    id,
    content,
    timestamp,
  },
});

export const updateNote = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateNote',
  payload: {
    id,
    content,
    timestamp,
  },
});

export const removeNote = (id) => ({
  type: 'app/removeNote',
  payload: { id },
});

export const closeNote = () => ({
  type: 'app/closeNote',
});

export const openNote = (id) => ({
  type: 'app/openNote',
  payload: { id },
});
