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

app.get('/', (req, res) => {
	res.send('hello world');
});

app.post('/', (req, res) => {
	ToDoList
		.create({
			item: req.body.item,
			checked: req.body.checked,
			importance: req.body.importance, //monthly, weekly, daily
			hours: req.body.hours, //hours needed to spend on item
			dueDate: req.body.dueDate
		})
		.then(todolist => res.status(201).json(todolist.serialize()))
    	.catch(err => {
    		console.error(err);
        	res.status(500).json({error: 'Something went wrong'});
    	});
	// res.send('testing')
	// res.end('It worked!');

});	






let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
