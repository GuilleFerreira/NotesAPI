const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const notes = [
  {id: '0',title: 'super',cityid: "Buenos Aires",description: 'cosas del super',date: '21-06-2010',temperature: '10°C'},
  {id: '1',title: 'tareas',cityid: "Santiago",description: 'estudiar',date: '21-06-2010',temperature: '14°C'},
  {id: '2',title: 'almacen',cityid: "Montevideo",description: 'arroz',date: '21-06-2010',temperature: '16°C'},
  {id: '3',title: 'verduleria',cityid: "Quito",description: 'boniato',date: '21-06-2010',temperature: '34°C'}
];

app.use(bodyParser.json());

app.use(cors());

app.get('/notes', (req,res) => {
    res.json(notes);
});

app.post('/note', (req, res) => {
    const note = req.body;
    console.log(note);
    notes.push(note);
    res.send('Note is added to the database');
});

app.put('/notes/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    const newNote = req.body;
    console.log(req.body);

    // Remove item from the notes array
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i]
        if (note.id === id) {
            notes[i] = newNote;
            res.send('Note is edited');
            return;
        }
    }
    res.status(404).send('Note not found');

});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    for (let i = 0; i < notes.length; i++) {
      let note = notes[i]
      if (note.id === id) {
          notes.splice(i, 1);
          res.send('Note is deleted');
          return;
      }
  }
  res.status(404).send('Note not found');
});

app.get('/notes/:id', (req, res) => {

    const id = req.params.id;
  
    for (let note of notes) {
        if (note.id === id) {
            res.json(note);
            return;
        }
    }
  
    res.status(404).send('Note not found');
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});
