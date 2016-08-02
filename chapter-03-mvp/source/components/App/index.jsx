import React from 'react';
import NotesList from '../NotesList';
import NoteDetail from '../NoteDetail';
import * as style from './style';

const App = () => (
  <div style={style.wrapper}>
    <NotesList />
    <NoteDetail />
  </div>
);

export default App;
