const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
  //eslint-disable-next-line no-console
  console.log('`Developing a Redux Edge` notes app listening on port 3000!');
});
