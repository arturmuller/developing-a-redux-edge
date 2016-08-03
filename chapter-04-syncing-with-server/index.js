const path = require('path');
const express = require('express');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');

const notes = {};

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  res.send(
    Object.keys(notes)
      .map((key) => notes[key])
      .sort((a, b) => b.timestamp - a.timestamp)
  );
});

app.post('/notes', (req, res) => {
  const note = {
    id: uuid.v4(),
    content: req.body.content,
    timestamp: Date.now(),
  };
  notes[note.id] = note;

  res.send(note);
});

app.delete('/notes/:id', (req, res) => {
  const note = notes[req.params.id];

  if (!note) {
    return res.status(404).send('Note not found');
  }

  delete notes[req.params.id];
  res.send();
});

app.put('/notes/:id', (req, res) => {
  const note = notes[req.params.id];

  if (!note) {
    return res.status(404).send('Note not found');
  }

  note.content = req.body.content;
  res.send(note);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
  //eslint-disable-next-line no-console
  console.log('`Developing a Redux Edge` notes app listening on port 3000!');
});
