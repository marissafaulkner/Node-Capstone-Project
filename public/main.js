'use strict';

//js for page load with data

function getToDosFromApi() {
  fetch('/todolist')
  	.then(response => response.json())
  	.then(responseJson => {
  		console.log(responseJson)
  		filterToDoItems(responseJson)
  	})
}


function filterToDoItems(data) {
	let dailyToDos = [];
	let weeklyToDos = [];
	let monthlyToDos = [];
	let veryImportantToDo = [];
	if (data) {
		data.forEach(item => {
			if(item.starred) {
				veryImportantToDo.push(item);
			}
			else if (item.importance === 'Daily') {
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
	displayVeryImportantToDo(veryImportantToDo);
}


function renderToDoItems(data) {
	data._id = data._id ? data._id : data.id
	return `
		<li class="toDoItem ${data._id}">
			<input type="checkbox" class="checkBox" id="${data._id}" ${data.checked ? "checked" : "" }><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
			<span class="edit-delete-buttons"><input type="checkbox" class="star" id="${data._id}" ${data.starred ? "checked" : "" }><button id="${data._id}" type="button" class="editButton">Edit</button><button id="${data._id}" type="button" class="deleteButton">Delete</button></span>
		</li>
	`
	;
}


//persistent checking
function toDoChecked() {
	$(document).on('change', '.checkBox', function(event) {
		let databaseId = $(event.currentTarget).attr('id');
		
		console.log(databaseId)

		let checked = $(this).prop("checked")

		$.ajax({
			url: "/edit/" + databaseId,
			type: "put",
			contentType: 'application/json',
			data: JSON.stringify({checked: checked})
		})

	})
}



function displayDailyToDoItems(arr) {
	let dailys = [];
	arr.forEach(toDo => {
		dailys.push(renderToDoItems(toDo))
	})
	
    $('.js-daily-list').html(dailys)

}

function displayWeeklyToDoItems(arr) {
	let weeklys = [];
	arr.forEach(toDo => {
		weeklys.push(renderToDoItems(toDo))
	})
	
    $('.js-weekly-list').html(weeklys)

}

function displayMonthlyToDoItems(arr) {
	let monthlys = [];
	arr.forEach(toDo => {
		monthlys.push(renderToDoItems(toDo))
	})
	
    $('.js-monthly-list').html(monthlys)
}


function displayVeryImportantToDo(arr) {
	let veryImportants = [];
	arr.forEach(toDo => {
		veryImportants.push(renderToDoItems(toDo))
	})

	$('.very-important-task').html(veryImportants)
}


function startPage() {
	getToDosFromApi();
	toDoChecked();
}


$(startPage);