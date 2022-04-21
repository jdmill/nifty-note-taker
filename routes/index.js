const express = require('express');

const dbRouter = require('./db');

const app = express();

app.use("/notes", dbRouter);

module.exports = app;