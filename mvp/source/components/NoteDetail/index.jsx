import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const NoteDetail = ({ note, removeNote, closeNote, updateNote }) => (
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
              onClick={() => removeNote(note.id)}
              style={{ ...style.button, ...style.danger }}
              >
              Remove
            </button>
            <button
              onClick={closeNote}
              style={style.button}
              >
              Close
            </button>
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
  removeNote: PropTypes.func.isRequired,
  closeNote: PropTypes.func.isRequired,
};

const selector = (state) => ({
  note: selectors.getNote(state, selectors.getOpenNoteId(state)),
});

export default connect(selector, actionCreators)(NoteDetail);
