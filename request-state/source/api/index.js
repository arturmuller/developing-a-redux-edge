import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
const notes = new Schema('notes');

export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url, options = {}) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  .then((res) => res.json())
);

export default {
  notes: {

    readList() {
      return fetchJson('/api/notes')
        .then((data) => {
          const normalized = normalize(data, arrayOf(notes));
          return {
            notes: normalized.entities.notes || {},
            ids: normalized.result,
          };
        });
    },

    create() {
      return fetchJson(
        '/api/notes',
        {
          method: 'POST',
        }
      );
    },

    update(id, content) {
      return fetchJson(
        `/api/notes/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ content }),
        }
      );
    },

    delete(id) {
      return fetchJson(
        `/api/notes/${id}`,
        {
          method: 'DELETE',
        }
      );
    },
  },
};
