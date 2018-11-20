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
			<p>pick that one "Very Important Task" that triggers that familiar feeling of wanting to procrastinate it away and send it to the top of your to do list.</p>
			<p>Here's the trick, give in to your inclination to procrastinate, by starting on other tasks that need your attention.</p>
			<p>Viola! You are now a contributing member of society!</p>

			<button type="button" class="js-next-second">But what about the "Very Important Task"?</button>
			`)
	})
}


function secondNext() {
	$('.js-welcome').on('click', '.js-next-second', function() {
		$('.js-welcome').html(`
			<h2>This part requires a bit of self-deception,</h2>
			<p>Rank projects that seem significant yet have more flexible deadlines at the top to make that one Very Important Task an easier choice.</p>

			<p>Now that you have all the info, lets get procrastinating!</p>
			<button type="button" value="create page" class="js-next-final">Lets Go!</button>

			`)
	})
}

function finalNext() {
	$('.js-welcome').on('click', '.js-next-final', function() {
		window.location.href = "main.html";
	})
}


function welcome() {
	heresHow();
	firstNext();
	secondNext();
	finalNext();
}

$(welcome);