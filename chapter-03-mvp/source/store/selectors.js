export const getNotes = (state) =>
  state.ids.map((id) => state.byId[id]);

export const getNote = (state, id) =>
  state.byId[id] || null;

export const getOpenNoteId = (state) =>
  state.openNoteId;
