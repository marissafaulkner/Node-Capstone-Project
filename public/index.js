let html = []

function getToDosFromApi() {
// 	$.getJSON('/todolist', function(data) {
// 		// console.log(data)
// 		// data.forEach(toDo => {
// 		// 	html.push(renderToDoItems(toDo));
// 		// })
// 		return data
// 	})

  fetch('/todolist')
    .then(response => response.json())
    .then(responseJson => {
    	console.log(responseJson)
    	responseJson.forEach(toDo => {
    		html.push(renderToDoItems(toDo))
    		console.log(renderToDoItems(toDo))
    	})
    	return html
    })
    .then(html => {
    	console.log(html)
    	displayToDoItems(html)
    })
}



function renderToDoItems(data) {
	return `
	<p>${data.item}</p>
	<p>${data.importance}</p>
	`;
}

function displayToDoItems(arr) {
	console.log(arr.join(''))
	$('.test').html(arr.join(''))

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




function renderDailyFilter(data) {
	return `
	<p><p>
	`;
}

function displayDailyFilter(data) {
	const dailyList = $('.js-daily-list')

	dailyList
		.html(renderDailyFilter(data));
}




$(function() {
	getToDosFromApi()
});