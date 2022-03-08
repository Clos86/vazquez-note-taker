const express = require('express');
const { notes } = require('./db/db');

const app = express();

app.get('/api/notes', (req, res) => {
    res.send('Hello!');
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });