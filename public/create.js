'use strict';

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
					$('.js-daily-list').append(renderToDoItems(data));
				}
				else if (data.importance === 'Monthly') {
					$('.js-monthly-list').append(data);
					$('.js-daily-list').append(renderToDoItems(data));
				}
			},
			dataType: 'json',
			contentType: 'application/json'
		});
	})
};


function toggleShowEdit() {
    $('#addButton').on('click', function(event) {
    	let formDiv = document.getElementById("add-item-section")
    	if (formDiv.style.display === "none") {
    		formDiv.style.display = "block";
    	} else {
    		formDiv.style.display = "none";
    	}
    })

}

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

function createAllItems() {
	addItemToDB();
	toggleShowEdit();
	toggleHideEdit();
	exitButton();
}

$(createAllItems);
