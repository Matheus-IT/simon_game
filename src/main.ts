import $ from 'jquery';

let gamePattern: Array<string> = [];
let userClickedPattern: Array<string> = [];
let isFirstTimePressingAKey = true;
let currentGameLevel = 0;

function nextSequence() {
	currentGameLevel++;
	presentLevel(currentGameLevel);

	const buttonColors = Object.freeze(['red', 'blue', 'green', 'yellow']);

	const randomNumber = Math.floor(Math.random() * 4);
	const randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);

	playSound(randomChosenColor);
	makeFlash($(`#${randomChosenColor}`));
}

$('.btn').on('click', function (event) {
	const userChosenColor = event.currentTarget.id;
	userClickedPattern.push(userChosenColor);

	const indexOfLastAnswer = userClickedPattern.length - 1;
	const result = checkAnswer(indexOfLastAnswer);

	if (result === false) {
		playSound('wrong');
		$(document.body).addClass('game-over');
		setTimeout(() => $(document.body).removeClass('game-over'), 200);

		startOver();
	}

	if (result && userClickedPattern.length === gamePattern.length) {
		userClickedPattern = [];
		setTimeout(nextSequence, 1000);
	}

	console.log(userClickedPattern);

	playSound(userChosenColor);
	animatePress($(event.currentTarget));
	makeFlash($(event.currentTarget));
});

$(document).on('keypress', function (_) {
	if (isFirstTimePressingAKey) {
		isFirstTimePressingAKey = false;
		presentLevel(currentGameLevel);
		nextSequence();
	}
});

function checkAnswer(indexOfLastAnswer: number) {
	return userClickedPattern[indexOfLastAnswer] === gamePattern[indexOfLastAnswer];
}

function presentLevel(gameLevel: number) {
	$('#level-title').html(`Level ${gameLevel}`);
}

function makeFlash(element: JQuery<HTMLElement>) {
	element.fadeOut(100).fadeIn(100);
}

function playSound(name: string) {
	new Audio(`src/sounds/${name}.mp3`).play();
}

function animatePress(element: JQuery<HTMLElement>) {
	element.addClass('pressed');
	setTimeout(() => element.removeClass('pressed'), 100);
}

function startOver() {
	$('#level-title').html('Game Over, Press Any Key to Restart');
	currentGameLevel = 0;
	gamePattern = [];
	userClickedPattern = [];
	isFirstTimePressingAKey = true;
}

export {};
