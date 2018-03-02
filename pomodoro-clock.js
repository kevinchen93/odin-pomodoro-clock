var workTime = 25;
var breakTime = 5;
var workTimeChange = 2;
var breakTimeChange = 1;
var maxTime = 90;

workTime *= 60*1000;
breakTime *= 60*1000;
workTimeChange *= 60*1000;
breakTimeChange *= 60*1000;
maxTime *= 60*1000;

var duration = workTime;
var seconds = workTime;
var isPaused = false;
var isRestarted = false;
var pausedTime;
var workSession = true;
var startTime = Date.now();

const timeView = document.querySelector('.timer');
const play = document.querySelector('.fa-play');
const pause = document.querySelector('.fa-pause');
const stop = document.querySelector('.fa-stop');
const refresh = document.querySelector('.fa-refresh');

function startTimer() {
	let presentTime = time.textContent;
	var timeArray = presentTime.split(/[:]+/)
	var m = timeArray[0];
	var s = checkSecond((timeArray[1] - 1));

	if (s == "59") {m = m - 1};
	if (m < 0) {
		time.textContent = "Time is up!"
		return
	};

	time.textContent = m + ":" + s;
	setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
	if (sec < 10 && sec >= 0) {sec = "0" + sec};
	if (sec < 0) {sec = "59"};
	return sec;
}


play.addEventListener('click', function () {
	event.target.style.opacity = 1;
	startTimer();
});

pause.addEventListener('click', function () {
	event.target.style.opacity = 1;
	pauseTimer();
});

stop.addEventListener('click', function () {
	event.target.style.opacity = 1;
	stopTimer();
});

refresh.addEventListener('click', function () {
	event.target.style.opacity = 1;
	refreshTimer();
});

