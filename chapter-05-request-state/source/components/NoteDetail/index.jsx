import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const NoteDetail = ({ note, closeNote, updateNote, requestDeleteNote, requestUpdateNote, updateNoteRequest, deleteNoteRequest }) => (
  <div style={style.wrapper}>
    {!note
      ? <div style={style.blankslate}>No note is open</div>
      : <div style={style.note}>
          <div style={style.date}>
            {new Date(note.timestamp).toLocaleString()}
          </div>
          <textarea
            autoFocus
            key={note.id}
            style={style.textarea}
            onChange={(event) => updateNote(event.target.value, note.id)}
            placeholder="New note..."
            value={note.content}
            />
          <div style={style.row}>
            <button
              onClick={() => requestUpdateNote(note.id, note.content)}
              disabled={updateNoteRequest.status === 'pending'}
              style={style.button}
              >
              {updateNoteRequest.status === 'pending'
                ? 'Saving...' : 'Save'}
            </button>
            <div style={style.group}>
              <button
                onClick={() => requestDeleteNote(note.id)}
                disabled={deleteNoteRequest.status === 'pending'}
                style={{ ...style.button, ...style.danger, ...style.marginLeft }}
                >
                {deleteNoteRequest.status === 'pending'
                  ? 'Removing...' : 'Remove'}
              </button>
              <button
                onClick={closeNote}
                style={{ ...style.button, ...style.marginLeft }}
                >
                Close
              </button>
            </div>
          </div>
        </div>
    }
  </div>
);

NoteDetail.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }),
  updateNote: PropTypes.func.isRequired,
  requestUpdateNote: PropTypes.func.isRequired,
  requestDeleteNote: PropTypes.func.isRequired,
  closeNote: PropTypes.func.isRequired,
  updateNoteRequest: PropTypes.object.isRequired,
  deleteNoteRequest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const openNoteId = selectors.getOpenNoteId(state);
  return {
    note: selectors.getNote(state, openNoteId),
    updateNoteRequest: selectors.getRequest(state, `updateNote/${openNoteId}`),
    deleteNoteRequest: selectors.getRequest(state, `deleteNote/${openNoteId}`),
  };
};

export default connect(mapStateToProps, actionCreators)(NoteDetail);
