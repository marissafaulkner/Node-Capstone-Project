'use strict';

function getToDosFromApi() {
  fetch('/todolist')
  	.then(response => response.json())
  	.then(responseJson => {
  		console.log(responseJson)
  		filterToDoItems(responseJson)
  	})
}


function filterToDoItems(data) {
	var dailyToDos = [];
	var weeklyToDos = [];
	var monthlyToDos = [];
	if (data) {
		data.forEach(item => {
			if (item.importance === 'Daily') {
				dailyToDos.push(item);
			} 
			else if (item.importance === 'Weekly') {
				weeklyToDos.push(item);
			}
			else if (item.importance === 'Monthly') {
				monthlyToDos.push(item);
			}

		});
	};
	displayDailyToDoItems(dailyToDos);
	displayWeeklyToDoItems(weeklyToDos);
	displayMonthlyToDoItems(monthlyToDos);
}


function renderToDoItems(data) {
	return `
		<li class="toDoItem ${data._id}">
			<input type="checkbox" class="checkBox" id="${data._id}" ${data.checked ? "checked" : "" }><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
			<span class="edit-delete-buttons"><input type="checkbox" class="star" id="${data._id}" ${data.starred ? "checked" : "" }><button id="${data._id}" type="button" class="editButton">Edit</button><button id="${data._id}" type="button" class="deleteButton">Delete</button></span>
		</li>
	`
	;
}


function toDoChecked() {
	$(document).on('change', '.checkBox', function(event) {
		let databaseId = $(event.currentTarget).attr('id');
		
		console.log(databaseId)

		let checked = $(this).prop("checked")

		$.ajax({
			url: "/edit/" + databaseId,
			type: "put",
			contentType: 'application/json',
			data: JSON.stringify({checked: checked}),
			success: function(data) {
				console.log(data)
			}
		})

	})
}



function displayDailyToDoItems(arr) {
	let dailys = [];
	console.log("array", arr)
	arr.forEach(toDo => {
		dailys.push(renderToDoItems(toDo))
	})
	
    $('.js-daily-list').html(dailys)
    // itemDelete(arr);
    // editItem();

}

function displayWeeklyToDoItems(arr) {
	let weeklys = [];
	console.log(arr)
	arr.forEach(toDo => {
		weeklys.push(renderToDoItems(toDo))
	})
	
    $('.js-weekly-list').html(weeklys)
    // itemDelete(arr);
    // editItem();

}

function displayMonthlyToDoItems(arr) {
	let monthlys = [];
	console.log(arr)
	arr.forEach(toDo => {
		monthlys.push(renderToDoItems(toDo))
	})
	
    $('.js-monthly-list').html(monthlys)
    // itemDelete(arr);
    // editItem();


}


function startPage() {
	getToDosFromApi();
	toDoChecked();
}


$(startPage);