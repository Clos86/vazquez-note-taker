const express = require('express');
const notes = require('./db/db');
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// App listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});