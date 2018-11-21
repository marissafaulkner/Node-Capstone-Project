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
		<li class="toDoItem ${data._id}">
			<input type="checkbox" id="${data._id}" ${data.checked ? "checked" : "" }><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
			<span class="edit-delete-buttons"><button id="${data._id}" type="button" class="editButton">Edit</button><button id="${data._id}" type="button" class="deleteButton">Delete</button></span>
		</li>
	`;
}


function toDoChecked() {
	$(document).on('change', 'input[type="checkbox"]', function(event) {
		

		// $(event.currentTarget).attr('id')
		let databaseId = $(event.currentTarget).attr('id');
		// let item = $(event.currentTarget).parent().parent().find('.itemhtml').text()
		// let hoursItem = $(event.currentTarget).parent().parent().find('.hourshtml').text()
		// let dueDateItem = $(event.currentTarget).parent().parent().find('.duedatehtml').text()

		console.log(databaseId)

		let checked = $(this).prop("checked")



		// let data = {
		// 	item: $('.itemhtml').val(),
		// 	checked: !checked,
		// 	importance: $('select#edit-importance').val(),
		// 	hours: $('input[name="edit-hours"]').val(),
		// 	dueDate: $('input[name="edit-dueDate"]').val()
		// }


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
	console.log(arr)
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
	toDoChecked();
}


$(startPage);