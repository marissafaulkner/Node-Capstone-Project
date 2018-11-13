'use strict';

function editItem() {
	$(document).on('click', '.editButton', function(event) {
		console.log($(event.currentTarget).parent()[0])
		let listItem = $(event.currentTarget).parent().find('.hourshtml').text()
		let databaseId = $(event.currentTarget).attr('id');
		console.log(listItem)

	});

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







function editDelete() {
	itemDelete();
	editItem();
}

$(editDelete);