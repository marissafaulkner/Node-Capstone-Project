'use strict';

function renderEditItemForm() {
	$(document).on('click', '.editButton', function(event) {
		console.log($(event.currentTarget).parent().parent()[0])
		let databaseId = $(event.currentTarget).attr('id');
		let item = $(event.currentTarget).parent().parent().find('.itemhtml').text()
		let hoursItem = $(event.currentTarget).parent().parent().find('.hourshtml').text()
		let dueDateItem = $(event.currentTarget).parent().parent().find('.duedatehtml').text()

		let itemText = $.trim(item);
		let hoursText = $.trim(hoursItem.replace("|", ""));
		let dueDateText = $.trim(dueDateItem.replace("|", ""));

		$('.editForm').html(`
				<label for="item" required>To Do Item</label>
	      		<input type="text" name="item" id="item" value="${itemText}" required/>

	      		<select name="importance" id="importance" required>
			        <option value="Daily">Daily</option>
			        <option value="Weekly" selected>Weekly</option>
			        <option value="Monthly">Monthly</option>
	      		</select>

	      		<br>

	      		<label for="hours">Time Spent</label>
	      		<input type="text" name="hours" id="hours" value="${hoursText}">

	      		<br>


	      		<label for="dueDate">Due Date</label>
	      		<input type="text" name="dueDate" id="due-date" value="${dueDateText}">

	      		<br>

	      		<button type="submit" class="updateButton" id="${databaseId}">Update</button>
			`)
	});

}


function submitEdit() {
	$('#edit-form').on('submit', ".updateButton", function(event) {
		event.preventDefault();
		console.log('test')

		let databaseId = $(event.currentTarget).attr('id')
		console.log(databaseId)

		let data = {
			item: $('input[name="item"]').val(),
			importance: $('select#importance').val(),
			hours: $('input[name="hours"]').val(),
			dueDate: $('input[name="dueDate"]').val()
		}

		console.log(data)

		data = JSON.stringify(data)

		$.ajax({
	  		type: 'PUT',
			url: 'edit/' + databaseId,
			data: data,
			success: function(data) {
				console.log('success')
			},
			dataType: 'json',
			contentType: 'application/json'
		});


	});
}


// function showHideEdit() {
// 	// let databaseId = 
// 	$(document).on('click', '.editButton', function(event) {
// 		console.log('test')
//     	let formDiv = document.getElementById("edit-form")
//     	if (formDiv.style.display === "none") {
//     		formDiv.style.display = "block";
//     	} else {
//     		formDiv.style.display = "none";
//     	}
//     })
// }





function itemDelete() {
	$(document).on('click', '.deleteButton', function(event) {
		// console.log('click delete')
		// console.log(event.currentTarget, 'test')
		let databaseId = $(event.currentTarget).attr('id');
		$(`.${databaseId}`).hide()
		console.log(databaseId)
		$.ajax({
			method: 'DELETE',
			url: 'delete/' + databaseId,
			// success: function(json) {
			// 	console.log(json)
			// 	// if(!json.error) location.reload(true);
			// },
			error: function() {
				alert('Error: Unable to delete entry');
			}
		});
	});
};

function hideButtons() {
	$('ul').on('mouseenter', '.toDoItem', function(event) {
		$(event.currentTarget).find('.edit-delete-buttons').fadeIn();
	});
	$('ul').on('mouseleave', '.toDoItem', function() {
		$(event.currentTarget).find('.edit-delete-buttons').fadeOut();
	});

}

function toggleShowDetails() {
    $('#details-button').on('click', function(event) {
    	$('.hourshtml').toggle();
    	$('.duedatehtml').toggle();
    })

}





function editAndDelete() {
	renderEditItemForm();
	submitEdit();
	itemDelete();
	hideButtons();
	toggleShowDetails();
	// showHideEdit()
}

$(editAndDelete);