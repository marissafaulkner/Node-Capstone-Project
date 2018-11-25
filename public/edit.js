'use strict';

function renderEditItemForm() {
	$(document).on('click', '.editButton', function(event) {
		$('.editForm').show();
		console.log($(event.currentTarget).parent().parent()[0])
		let databaseId = $(event.currentTarget).attr('id');
		let item = $(event.currentTarget).parent().parent().find('.itemhtml').text()
		let hoursItem = $(event.currentTarget).parent().parent().find('.hourshtml').text()
		let dueDateItem = $(event.currentTarget).parent().parent().find('.duedatehtml').text()

		let itemText = $.trim(item);
		let hoursText = $.trim(hoursItem.replace("|", ""));
		let dueDateText = $.trim(dueDateItem.replace("|", ""));

		$('.editForm').html(`
			<div class=".editFormDiv">
				<label for="edit-item" required>To Do Item</label>
	      		<input type="text" name="edit-item" id="edit-item" value="${itemText}" required/>

	      		<select name="edit-importance" id="edit-importance" required>
			        <option value="Daily">Daily</option>
			        <option value="Weekly" selected>Weekly</option>
			        <option value="Monthly">Monthly</option>
	      		</select>

	      		<br>

	      		<label for="edit-hours">Time Spent</label>
	      		<input type="text" name="edit-hours" id="edit-hours" value="${hoursText}">

	      		<br>


	      		<label for="edit-dueDate">Due Date</label>
	      		<input type="text" name="edit-dueDate" id="edit-due-date" value="${dueDateText}">

	      		<br>

	      		<button type="submit" class="updateButton" id="${databaseId}">Update</button>
	      	</div>
			`)
	});

}


function submitEdit() {
	$('#edit-form').on('submit', function(event) {
		event.preventDefault();

		let databaseId = $('.updateButton').attr('id')


		let data = {
			item: $('input[name="edit-item"]').val(),
			checked: 'false',
			importance: $('select#edit-importance').val(),
			hours: $('input[name="edit-hours"]').val(),
			dueDate: $('input[name="edit-dueDate"]').val()
		}

		data = JSON.stringify(data)

		$.ajax({
	  		type: 'PUT',
	  		contentType: 'application/json',
			// dataType: 'json',
			url: 'edit/' + databaseId,
			data: data,
			success: function(data) {
				$('li.' + databaseId).hide();
			if (data.importance === 'Daily') {
				$('.js-daily-list').append(`
					<li class="toDoItem ${data._id}">
						<input type="checkbox" id="myCheck"><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
						<span class="edit-delete-buttons"><button id="${data._id}" type="button" class="editButton">Edit</button><button id="${data._id}" type="button" class="deleteButton">Delete</button></span>
					</li>
					`);
			} 
			else if (data.importance === 'Weekly') {
				$('.js-weekly-list').append(`
					<li class="toDoItem ${data._id}">
						<input type="checkbox" id="myCheck"><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
						<span class="edit-delete-buttons"><button id="${data._id}" type="button" class="editButton">Edit</button><button id="${data._id}" type="button" class="deleteButton">Delete</button></span>
					</li>
					`);
			}
			else if (data.importance === 'Monthly') {
				$('.js-monthly-list').append(`
					<li class="toDoItem ${data._id}">
						<input type="checkbox" id="myCheck"><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
						<span class="edit-delete-buttons"><button id="${data._id}" type="button" class="editButton">Edit</button><button id="${data._id}" type="button" class="deleteButton">Delete</button></span>
					</li>
					`);
			}
			$('.editForm').empty()
			}
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

// function fadeButtons() {
// 	$('ul').on('mouseenter', '.toDoItem', function(event) {
// 		$(event.currentTarget).find('.edit-delete-buttons').fadeIn();
// 	});
// 	$('ul').on('mouseleave', '.toDoItem', function() {
// 		$(event.currentTarget).find('.edit-delete-buttons').fadeOut();
// 	});

// }

function toggleEditDeleteButtons() {
	$('#edit-delete-button').on('click', function(event) {
		 $('.edit-delete-buttons').toggle();
	})
}

function toggleShowDetails() {
    $('#details-button').on('click', function(event) {
    	$('.hourshtml').toggle();
    	$('.duedatehtml').toggle();
    })

}


function starCheckBox() {
	$(document).on('change', '.star', function(event) {
		let checked = $(this).prop("checked")

		console.log(checked)
	})
}





function editAndDelete() {
	renderEditItemForm();
	submitEdit();
	itemDelete();
	// fadeButtons();
	toggleEditDeleteButtons();
	toggleShowDetails();
	starCheckBox();
	// showHideEdit()
}

$(editAndDelete);