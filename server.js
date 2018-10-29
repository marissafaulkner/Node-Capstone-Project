"use strict";


const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


const {DATABASE_URL, PORT} = require('./config');
const {ToDoList}= require('./models');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());




if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;