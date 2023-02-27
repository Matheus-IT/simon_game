import $ from 'jquery';

const gamePattern: Array<string> = [];
const userClickedPattern: Array<string> = [];
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

export {};
