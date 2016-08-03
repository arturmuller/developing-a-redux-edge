import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';

const notes = new Schema('notes');

export const toJson = (res) => res.json();

export const checkStatus = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }

  return Promise.reject(new Error(res.statusText || res.status));
};

export const normalizeNotesList = (data) => normalize(data, arrayOf(notes));

export const returnNotesAndIds = ({ entities: { notes }, result: noteIds }) => ({
  notes,
  noteIds,
});

export const fetchJson = (url, options = {}) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(checkStatus)
  .then(toJson)
);

export default {
  notes: {

    fetch() {
      return fetchJson('/notes')
        .then(normalizeNotesList)
        .then(returnNotesAndIds);
    },

    add(content) {
      return fetchJson(
        '/notes',
        {
          method: 'POST',
          body: JSON.stringify({ content }),
        }
      );
    },

    update(id, content) {
      return fetchJson(
        `/notes/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ content }),
        }
      );
    },

    delete(id) {
      return fetch(`/notes/${id}`, { method: 'DELETE' })
        .then(checkStatus)
        .then((res) => res.text());
    },
  },
};
