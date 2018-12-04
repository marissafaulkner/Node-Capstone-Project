'use strict';


let bodyParser = require('body-parser');
bodyParser = bodyParser.json();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');



const {DATABASE_URL, PORT} = require('./config');
const {ToDoList}= require('./models');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());


app.get('/todolist', (req, res) => {
	ToDoList
    .find()
    .then(todolist => {
    	res.json(todolist)
     
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

app.post('/additem', bodyParser, (req, res) => {
	const requiredFields = ['item', 'importance'];
	console.log(req.body)
  	for (let i = 0; i < requiredFields.length; i++) {
    	const field = requiredFields[i];
   		if (!(field in req.body)) {
      		const message = `Missing \`${field}\` in request body`;
      		console.error(message);
      		return res.status(400).send(message);
    }
  }





	ToDoList
		.create({
			item: req.body.item,
			checked: req.body.checked,
			importance: req.body.importance, //monthly, weekly, daily
			hours: req.body.hours, //hours needed to spend on item
			dueDate: req.body.dueDate,
      starred: req.body.starred //most important task(s)
		})
		.then(todolist => res.status(201).json(todolist.serialize()))
    	.catch(err => {
    		console.error(err);
        	res.status(500).json({error: 'Something went wrong'});
    	});

});	


app.put("/edit/:id", (req, res) => {
  if (!(req.params.id)) {
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;
    return res.status(400).json({ message: message });
  }

  console.log('req.body', req.body)
  const toUpdate = {};
  const updateableFields = ["item", "checked", "importance", "hours", "dueDate", "starred"];



  if (req.body.item) {
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    })
  } 
  if (req.body.checked !== null && req.body.checked !== undefined) {
    toUpdate.checked = req.body.checked
  } 
  if (req.body.starred !== null && req.body.starred !== undefined) {
    toUpdate.starred = req.body.starred
  }

  


  ToDoList
    .findOne({_id: req.params.id})
    .then(todo => {
        ToDoList
          .findByIdAndUpdate(req.params.id, { $set: toUpdate }, {new: true})
          .then(updatedToDo => {
            console.log('updatedToDo', updatedToDo)
            res.status(200).json({
              id: updatedToDo.id,
              item: updatedToDo.item,
              checked: updatedToDo.checked,
              importance: updatedToDo.importance,
              hours: updatedToDo.hours,
              dueDate: updatedToDo.dueDate,
              starred: updatedToDo.starred
            })
          })
    })
});


app.delete("/delete/:id", (req, res) => {
  ToDoList.findByIdAndRemove(req.params.id)
    .then(todolist => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});



// catch-all endpoint if client makes request to non-existent endpoint
app.use("*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
});



let server;

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

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
