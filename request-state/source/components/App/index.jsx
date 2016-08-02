import React from 'react';
import { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import NotesList from '../NotesList';
import NoteDetail from '../NoteDetail';
import Toasts from '../Toasts';
import Nav from '../Nav';
import * as selectors from '../../store/selectors';
import * as actionCreators from '../../store/actions';
import * as style from './style';

class App extends Component {
  componentWillMount() {
    this.props.requestReadNotes();
  }

  render() {
    const { readNotesRequest } = this.props;

    switch (readNotesRequest.status) {
      case 'success':
        return (
          <div style={style.wrapper}>
            <Nav />
            <Toasts />
            <div style={style.row}>
              <NotesList />
              <NoteDetail />
            </div>
          </div>
        );
      case 'failure':
        return (
          <div style={style.notice}>
            {(readNotesRequest.error.message === 'Failed to fetch')
              ? 'No connection, try again later!'
              : 'Hmm... Something didn\'t go as planned.'
            }
          </div>
        );
      default:
        return (
          <div style={style.notice}>
            Loading...
          </div>
        );
    }
  }
}

App.propTypes = {
  requestReadNotes: PropTypes.func.isRequired,
  readNotesRequest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  readNotesRequest: selectors.getRequest(state, 'readNotes'),
});

export default connect(mapStateToProps, actionCreators)(App);
