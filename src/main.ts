import $ from 'jquery';

const gamePattern: Array<string> = [];

function nextSequence() {
	const buttonColors = Object.freeze(['red', 'blue', 'green', 'yellow']);
	const randomNumber = Math.floor(Math.random() * 4);
	const randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);

	makeFlash($(`#${randomChosenColor}`));
}

function makeFlash(element: JQuery<HTMLElement>) {
	element.fadeOut(100).fadeIn(100);
}

$('.btn').on('click', function (event) {
	new Audio(`src/sounds/${event.currentTarget.id}.mp3`).play();
	makeFlash($(event.currentTarget));
});

export {};
