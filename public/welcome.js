'use strict';

 


function heresHow() {
	$('.js-welcome').on('click', '.heres-how', function() {
		$('.js-welcome').html(`
			<h2>To begin,</h2>
			<p>break up your tasks into daily, weekly, and monthly categories</p>
			<p>- Things you have to get done daily or today</p>
			<p>- Things you have to get done weekly or this week</p>
			<p>- And things you have to get done either monthly, by the end of the month, or that don't have a forseeable deadline</p>

			<h3>tip</h3>
			<p>Add things to your daily to dos that are easily accomplished to give yourself a boost of confidence in your day</p>

			<button type="button" class="js-next">Next</button>

			`)
	})
}


function firstNext() {
	$('.js-welcome').on('click', '.js-next', function() {
		$('.js-welcome').html(`
			<h2>Now,</h2>
			<p>pick a task that triggers that</p>
			`)
	})
}

function welcome() {
	heresHow();
	firstNext();
}

$(welcome);