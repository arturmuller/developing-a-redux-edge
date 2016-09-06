import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const NotesList = ({ notes, openNoteId, addNote, openNote }) => (
  <div style={style.wrapper}>
    <button
      style={style.addNoteButton}
      onClick={() => addNote()}
      >
      Add Note
    </button>
    {(notes.length === 0)
      ? <div style={style.blankslate}>No notes</div>
      : notes.map((note) => (
          <button
            key={note.id}
            style={(note.id === openNoteId)
              ? { ...style.note, ...style.selected }
              : style.note
            }
            onClick={() => openNote(note.id)}
            >
            {note.content === ''
              ? <span style={style.newNoteLabel}>New note...</span>
              : note.content
            }
          </button>
      ))
    }
  </div>
);

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string.isRequired,
  })).isRequired,
  openNoteId: PropTypes.string,
  addNote: PropTypes.func.isRequired,
  openNote: PropTypes.func.isRequired,
};

const selector = (state) => ({
  notes: selectors.getNotes(state),
  openNoteId: selectors.getOpenNoteId(state),
});

export default connect(selector, actionCreators)(NotesList);
