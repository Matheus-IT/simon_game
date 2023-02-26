import $ from 'jquery';

function makeFlash(element: JQuery<HTMLElement>) {
	element.fadeOut(100).fadeIn(100);
}

$('.btn').on('click', function (event) {
	new Audio(`src/sounds/${event.currentTarget.id}.mp3`).play();
	makeFlash($(event.currentTarget));
});

export {};
