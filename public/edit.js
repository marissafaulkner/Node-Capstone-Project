'use strict';

function editItem() {
	$(document).on('click', '.editButton', function(event) {
		console.log($(event.currentTarget).parent()[0])
		let databaseId = $(event.currentTarget).attr('id');
		let item = $(event.currentTarget).parent().find('.itemhtml').text()
		let hoursItem = $(event.currentTarget).parent().find('.hourshtml').text()
		let dueDateItem = $(event.currentTarget).parent().find('.duedatehtml').text()



		$('#edit-item-section').html(`

			<form action="/todolist/${databaseId}" method="put" id="edit-form">

				<label for="item" required>To Do Item</label>
	      		<input type="text" name="item" id="item" value="${item}" required/>

	      		<select name="importance" id="importance" required>
			        <option value="Daily">Daily</option>
			        <option value="Weekly" selected>Weekly</option>
			        <option value="Monthly">Monthly</option>
	      		</select>

	      		<br>

	      		<label for="hours">Time Spent</label>
	      		<input type="text" name="hours" id="hours" value="${hoursItem}">

	      		<br>


	      		<label for="dueDate">Due Date</label>
	      		<input type="text" name="dueDate" id="due-date" value="${dueDateItem}">

	      		<br>

	      		<button type="submit">Update</button>

			</form>`)
	});

}

function renderEditForm(data) {
	return `

		<form action="/todolist/${data._id}" method="put" id="edit-form">

			<label for="item" required>To Do Item</label>
      		<input type="text" name="item" id="item" value="${data.item}" required/>

      		<select name="importance" id="importance" required>
		        <option value="Daily">Daily</option>
		        <option value="Weekly" selected>Weekly</option>
		        <option value="Monthly">Monthly</option>
      		</select>

      		<br>

      		<label for="hours">Time Spent</label>
      		<input type="text" name="hours" id="hours" value="${data.hours}">

      		<br>


      		<label for="dueDate">Due Date</label>
      		<input type="text" name="dueDate" id="due-date" value="${data.dueDate}">

      		<br>

      		<button type="submit">Update</button>

		</form>
`
}




function showHideEdit() {
	// let databaseId = 
	$(document).on('click', '.editButton', function(event) {
		console.log('test')
    	let formDiv = document.getElementById("edit-form")
    	if (formDiv.style.display === "none") {
    		formDiv.style.display = "block";
    	} else {
    		formDiv.style.display = "none";
    	}
    })
}





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







function editAndDelete() {
	itemDelete();
	editItem();
	// showHideEdit()
}

$(editAndDelete);