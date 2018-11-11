'use strict';

function getToDosFromApi() {
// 	$.getJSON('/todolist', function(data) {
// 		// console.log(data)
// 		// data.forEach(toDo => {
// 		// 	html.push(renderToDoItems(toDo));
// 		// })
// 		return data
// 	})


//mentor example
  // fetch('/todolist')
  //   .then(response => response.json())
  //   .then(responseJson => {
  //   	console.log(responseJson)
  //   	responseJson.forEach(toDo => {
  //   		html.push(renderToDoItems(toDo))
  //   		console.log(renderToDoItems(toDo))
  //   	})
  //   	return html
  //   })
  //   .then(html => {
  //   	console.log(html)
  //   	displayToDoItems(html)
  //   })


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
		<li class="toDoItem">
			<input type="checkbox" id="myCheck">${data.item} <span class="details"> ${data.hours ? `| ${data.hours}` : ""} ${data.dueDate ? `| ${data.dueDate}` : ""}</span>
			<button type="button" class="editButton">Edit</button><button type="button" class="deleteButton">Delete</button>
		</li>
	`;
}

function displayDailyToDoItems(arr) {
	let dailys = [];
	console.log(arr)
	arr.forEach(toDo => {
		dailys.push(renderToDoItems(toDo))
	})
	
    $('.js-daily-list').html(dailys)

}

function displayWeeklyToDoItems(arr) {
	let weeklys = [];
	console.log(arr)
	arr.forEach(toDo => {
		weeklys.push(renderToDoItems(toDo))
	})
	
    $('.js-weekly-list').html(weeklys)

}

function displayMonthlyToDoItems(arr) {
	let monthlys = [];
	console.log(arr)
	arr.forEach(toDo => {
		monthlys.push(renderToDoItems(toDo))
	})
	
    $('.js-monthly-list').html(monthlys)


}


// $.getJSON('entries/', getBlackEntries);
// 		function getBlackEntries(data) {
//     		var blackTeaEntries = [];
//     		if (data) {
// 	    		data.forEach(function(item) {
//     				if (item.teaColorTeaType==='Black') {
//     					blackTeaEntries.push(item);
//     				}
//     			});
// 			};
// 			displayAllEntries(blackTeaEntries);
// 			$('#allTeaBtn').removeClass('hideMe');

// 		}

function startPage() {
	getToDosFromApi();
}


$(startPage);