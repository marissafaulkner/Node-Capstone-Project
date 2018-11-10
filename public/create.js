'use strict';

$('#add').on('submit', function(event) {
	event.preventDefault()
	console.log($('input[name="item"]').val())
	console.log($('select#importance').val())
	console.log($('input[name="hours"]').val())
	console.log($('input[name="dueDate"]').val())

	let data = {
		item: $('input[name="item"]').val(),
		checked: false,
		importance: $('select#importance').val(),
		hours: $('input[name="hours"]').val(),
		dueDate: $('input[name="dueDate"]').val()
	}

	data = JSON.stringify(data)

	$.ajax({
  		type: "POST",
		url: "/additem",
		data: data,
		success: function(data) {
			console.log(data)
			if (data.importance === 'Daily') {
				$('.js-daily-list').append(data);
			} 
			else if (data.importance === 'Weekly') {
				$('.js-weekly-list').append(data);
			}
			else if (data.importance === 'Monthly') {
				$('.js-monthly-list').append(data);
			}
		},
		dataType: 'json',
		contentType: 'application/json'
	});
})

