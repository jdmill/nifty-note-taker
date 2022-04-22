const db = require("express").Router();
const { v4: uuidv4 } = require('uuid');

const {
  readFromFile,
  readAndAppend,
  writeToFile
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
db.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//GetRoute for retreiving specific note
db.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID')
    });
});

//Delete a specific note
db.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      //creates a new array of all notes except for the one with a matching ID
      const result = json.filter((note) => note.id !== noteId);
      //saves the array to the db json
      writeToFile('./db/db.json', result);
      //Respond to the delete request

      res.json(`Item ${noteId} jas been deleted`);
    });
});

//POST route for new Note
db.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error(`Error in adding note`);
  }
})


module.exports = db;
