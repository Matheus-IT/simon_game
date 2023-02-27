import $ from 'jquery';

const gamePattern: Array<string> = [];
const userClickedPattern: Array<string> = [];

function nextSequence() {
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
