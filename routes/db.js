const db = require("express").Router();

const {
  readFromFile,
  readAndAppend,
  writeToFile
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
db.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


module.exports = db;
