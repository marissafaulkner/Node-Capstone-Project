'use strict';

//editing and deleting items

function renderEditItemForm() {
	$(document).on('click', '.editButton', function(event) {
		$('#add-item-section').css('display', 'none')
		let editFormDiv = document.getElementById("edit-item-section")
		if (editFormDiv.style.display === "none") {
    		editFormDiv.style.display = "block";
    	} else {
    		editFormDiv.style.display = "none";
    	}

		
		let databaseId = $(event.currentTarget).attr('id');


		let item = $(event.currentTarget).parent().parent().find('.itemhtml').text()
		let hoursItem = $(event.currentTarget).parent().parent().find('.hourshtml').text()
		let dueDateItem = $(event.currentTarget).parent().parent().find('.duedatehtml').text()

		let itemText = $.trim(item);
		let hoursText = $.trim(hoursItem.replace("|", ""));
		let dueDateText = $.trim(dueDateItem.replace("|", ""));

		$('.editForm').html(`
			<div class="editFormDiv">
				<fieldset>
				<legend>Edit Item</legend>
					<label for="edit-item" required>To Do Item</label>
		      		<input type="text" name="edit-item" id="edit-item" value="${itemText}" required/>

		      		<select class="drop-down" name="edit-importance" id="edit-importance" required>
				        <option value="Daily" selected>Daily</option>
				        <option value="Weekly">Weekly</option>
				        <option value="Monthly">Monthly</option>
		      		</select>

		      		<br>

		      		<label for="edit-hours">Time Spent</label>
		      		<input type="text" name="edit-hours" id="edit-hours" value="${hoursText}">

		      		<br>


		      		<label for="edit-dueDate">Due Date</label>
		      		<input type="text" name="edit-dueDate" id="edit-due-date" value="${dueDateText}">

		      		<br>

		      		<button type="submit" class="updateButton btn" id="${databaseId}">Update</button>
		      	</fieldset>
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
			checked: false,
			importance: $('select#edit-importance').val(),
			hours: $('input[name="edit-hours"]').val(),
			dueDate: $('input[name="edit-dueDate"]').val(),
			starred: false
		}

		data = JSON.stringify(data)

		$.ajax({
	  		type: 'PUT',
	  		contentType: 'application/json',
			url: 'edit/' + databaseId,
			data: data,
			success: function(data) {
				$('li.' + databaseId).hide();
			if (data.importance === 'Daily') {
				$('.js-daily-list').append(`
					<li class="toDoItem ${data.id}">
						<input type="checkbox" class="checkBox" id="${data.id}" ${data.checked ? "checked" : "" }><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
						<span class="edit-delete-buttons"><input type="checkbox" class="star" id="${data.id}" ${data.starred ? "checked" : "" }><button id="${data.id}" type="button" class="editButton">Edit</button><button id="${data.id}" type="button" class="deleteButton">Delete</button></span>
					</li>
					`);
			} 
			else if (data.importance === 'Weekly') {
				$('.js-weekly-list').append(`
					<li class="toDoItem ${data.id}">
						<input type="checkbox" class="checkBox" id="${data.id}" ${data.checked ? "checked" : "" }><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
						<span class="edit-delete-buttons"><input type="checkbox" class="star" id="${data.id}" ${data.starred ? "checked" : "" }><button id="${data.id}" type="button" class="editButton">Edit</button><button id="${data.id}" type="button" class="deleteButton">Delete</button></span>
					</li>
					`);
			}
			else if (data.importance === 'Monthly') {
				$('.js-monthly-list').append(`
					<li class="toDoItem ${data.id}">
						<input type="checkbox" class="checkBox" id="${data.id}" ${data.checked ? "checked" : "" }><span class="itemhtml">${data.item} </span><span class="hourshtml"> ${data.hours ? `| ${data.hours}` : ""} </span><span class="duedatehtml">${data.dueDate ? `| ${data.dueDate}` : ""}</span>
						<span class="edit-delete-buttons"><input type="checkbox" class="star" id="${data.id}" ${data.starred ? "checked" : "" }><button id="${data.id}" type="button" class="editButton">Edit</button><button id="${data.id}" type="button" class="deleteButton">Delete</button></span>
					</li>
					`);
			}
			$('.edit-form-popup').hide()
			}
		});


	});
}



function itemDelete() {
	$(document).on('click', '.deleteButton', function(event) {
		let databaseId = $(event.currentTarget).attr('id');
		$(`.${databaseId}`).hide()
		console.log(databaseId)
		$.ajax({
			method: 'DELETE',
			url: 'delete/' + databaseId,
			error: function() {
				console.log('Error: Unable to delete entry');
			}
		});
	});
};


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


//hide edit/delete buttons upon edit submit
function submitEditHide() {
	$('#edit-form').on('submit', function(event) {
		$('.edit-delete-buttons').hide();
	})
}


function starCheckBox() {
	$(document).on('change', '.star', function(event) {
		let checked = $(this).prop("checked")
		let databaseId = $(event.currentTarget).attr('id');

		let listItem = $(this).parent().parent()

		console.log(listItem)

		$.ajax({
			url: "/edit/" + databaseId,
			type: "put",
			contentType: 'application/json',
			data: JSON.stringify({starred: checked}),
			success: function(data) {
				if (data.starred === true) {
				$('.very-important-task').append(listItem)
				}
			}
		})


	})
}



function editAndDelete() {
	renderEditItemForm();
	submitEdit();
	itemDelete();
	toggleEditDeleteButtons();
	toggleShowDetails();
	starCheckBox();
	submitEditHide();
}

$(editAndDelete);