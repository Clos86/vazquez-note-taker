const express = require('express');

const PORT = process.env.PORT || 3001;
const notes = require('./db/db');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length;
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, '/db/db.json'),
      JSON.stringify(notes, null, 2)
    );
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const deleteNote = req.params.id;
    notes.splice(deleteNote, 1);
  
    for(let i = 0; i < notes.length; i++){
      notes[i].id = i;
    }
  
    fs.writeFileSync(
      path.join(__dirname, '/db/db.json'), 
      JSON.stringify(notes, null, 2)
    );
    res.json(req.body);
  });

// HTML Routes 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// App listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});