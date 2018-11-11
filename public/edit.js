'use strict';



function itemDelete(data) {
	$('.toDoItem').on('click', '.deleteButton', function(event) {
		console.log('click delete')
		var outerLi = $(this).parent();
		var index = outerLi.attr('data.id');
		var databaseId = data[index];
		$.ajax({
			method: 'DELETE',
			url: 'delete/' + databaseId,
			success: function(json) {
				if(!json.error) location.reload(true);
			},
			error: function() {
				alert('Error: Unable to delete entry');
			}
		});
	});
};







function editDelete() {
	itemDelete();
}

$(editDelete);