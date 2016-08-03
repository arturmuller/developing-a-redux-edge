import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

class NotesList extends Component {

  componentWillMount() {
    this.props.fetchNotes();
  }

  render() {
    const { notes, openNoteId, addNote, openNote } = this.props;
    return (
      <div style={style.wrapper}>
        <button
          style={style.addNoteButton}
          onClick={addNote}
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
  }
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string.isRequired,
  })).isRequired,
  openNoteId: PropTypes.string,
  addNote: PropTypes.func.isRequired,
  openNote: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired,
};

const selector = (state) => ({
  notes: selectors.getNotes(state),
  openNoteId: selectors.getOpenNoteId(state),
});

export default connect(selector, actionCreators)(NotesList);
