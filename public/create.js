'use strict';

// adding new to do list items

function addItemToDB() {
	$('#addForm').on('submit', function(event) {
		event.preventDefault();

		let data = {
			item: $('input[name="item"]').val(),
			checked: false,
			importance: $('select#importance').val(),
			hours: $('input[name="hours"]').val(),
			dueDate: $('input[name="dueDate"]').val(),
			starred: false
		}

		data = JSON.stringify(data)

		$.ajax({
	  		type: "POST",
			url: "/additem",
			data: data,
			success: function(data) {
				if (data.importance === 'Daily') {
					$('.js-daily-list').append(data);
					$('.js-daily-list').append(renderToDoItems(data));
				} 
				else if (data.importance === 'Weekly') {
					$('.js-weekly-list').append(data);
					$('.js-weekly-list').append(renderToDoItems(data));
				}
				else if (data.importance === 'Monthly') {
					$('.js-monthly-list').append(data);
					$('.js-monthly-list').append(renderToDoItems(data));
				}
			},
			dataType: 'json',
			contentType: 'application/json'
		});
	})
};


function toggleShowEdit() {
    $('#addButton').on('click', function(event) {
    	$('#edit-item-section').css('display', 'none')
    	let formDiv = document.getElementById("add-item-section")
    	if (formDiv.style.display === "none") {
    		formDiv.style.display = "block";
    	} else {
    		formDiv.style.display = "none";
    	}
    })

}

//on submit, hide the add form and clear form for the next add
function toggleHideEdit() {
	$('#addForm').on('submit', function(event) {
		let formDiv = document.getElementById("add-item-section")
		formDiv.style.display = "none"
		clearForm();
	})
}

function clearForm() {
	document.getElementById("addForm").reset();
}


//hide add form on exit button click
function exitButton() {
	$('.exit').on('click', function(event) {
    	let formDiv = document.getElementById("add-item-section")
    	if (formDiv.style.display === "none") {
    		formDiv.style.display = "block";
    	} else {
    		formDiv.style.display = "none";
    	}
    })
}

//hide edit/delete buttons on add submit
function submitAddHide() {
	$('#addForm').on('submit', function(event) {
		$('.edit-delete-buttons').hide();
	})
}

function createAllItems() {
	addItemToDB();
	toggleShowEdit();
	toggleHideEdit();
	exitButton();
	submitAddHide();
}

$(createAllItems);
