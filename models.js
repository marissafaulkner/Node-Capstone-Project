'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const toDoSchema = mongoose.Schema({
	item: String,
	checked: Boolean, //Boolean
	importance: String, //monthly, weekly, daily
	hours: String, //hours needed to spend on item
	dueDate: String
});



toDoSchema.methods.serialize = function() {
	return {
		id: this._id,
		item: this.item,
		checked: this.checked,
		importance: this.importance,
		hours: this.hours,
		dueDate: this.dueDate
	};
};

const ToDoList = mongoose.model('ToDoList', toDoSchema);

module.exports = {ToDoList};