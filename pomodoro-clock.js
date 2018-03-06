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

var keyboard = document.querySelector('.keyboard');
var coffee = document.querySelector('.coffee');
var incBtn = document.querySelector('.incBtn');
var decBtn = document.querySelector('.decBtn');

var timeView = document.querySelector('.timeView');
var timeBar = document.querySelector('.progress-bar');
var timeInput = document.querySelector('.workTimeView');

var iconContainer = document.querySelector('.icon-container')
var pause = document.querySelector('.fa-pause');
var refresh = document.querySelector('.fa-refresh');
var caption1 = document.querySelector('.caption-1');
var progressBar = document.querySelector('.progress-bar');

function timeString(seconds) {
	var s = Math.ceil(seconds/1000);
	var m = Math.floor(s/60);
	s %= 60;
	return timeFormat([m,s])
	function twoDigit(n) {
		if (n < 10) return '0'+n;
		return n;
	}
	function timeFormat(arr) {return arr.map(twoDigit).join(':');}
}

function displayTime() {
	timeInput.textContent = timeString(workTime);
	timeView.textContent = timeString(workTime);
}

displayTime();

function displayWorkTime() {timeInput.textContent = timeString(workTime)}
function displayBreakTime() {timeInput.textContent = timeString(breakTime)}

function workInc() {
	if (workTime + workTimeChange <= maxTime) {
		workTime += workTimeChange;
		displayWorkTime();
	}
}

function workDec() {
	if (workTime >= workTimeChange) {
		workTime -= workTimeChange;
		displayWorkTime();
	}
}

function breakInc() {
	if (breakTime + breakTimeChange <= maxTime) {
		breakTime += breakTimeChange;
		displayBreakTime();
	}
}

function breakDec() {
	if (breakTime >= breakTimeChange) {
		breakTime -= breakTimeChange;
		displayBreakTime();
	}
}

incBtn.addEventListener('mousedown', function () {
	if (workSession) {
		workInc();
	} else {
		breakInc();
	}
});

decBtn.addEventListener('mousedown', function () {
	if (workSession) {
		workDec();
	} else {
		breakDec();
	}
});

keyboard.addEventListener('mousedown', function () {
	displayWorkTime();
	workSession = true;
	coffee.classList.remove('tab-active');
	keyboard.classList.add('tab-active');
});

coffee.addEventListener('mousedown', function () {
	displayBreakTime();
	workSession = false;
	keyboard.classList.remove('tab-active');
	coffee.classList.add('tab-active');
});

function toggleSession() {
	if (workSession) {
		coffee.classList.add('tab-active');
		coffee.style.opacity = 1;
		keyboard.style.opacity = 0.7;
		keyboard.classList.remove('tab-active');
		keyboard.classList.remove('highlight');

	} else {
		coffee.style.opacity = 0.7;
		keyboard.style.opacity = 1;
		coffee.classList.remove('tab-active');
		keyboard.classList.add('tab-active');
	}

	startTime = Date.now();
	workSession = !workSession;
	duration = workSession ? workTime : breakTime;
	seconds = duration;
}

function tick() {
  if (seconds <= 0) toggleSession();
  else if (!isPaused) {
    var timeDiff = Date.now() - startTime;
    seconds = duration - timeDiff;

    console.log(timeDiff);
    console.log(seconds);
    console.log(duration);
  }
  	console.log(seconds);
  	timeView.textContent = timeString(seconds);
}

window.setInterval(tick,111);

function togglePause () {
	isPaused = !isPaused;
	if (isPaused) {
		pause.classList.add('fa-play');
		pause.classList.remove('fa-pause');
		caption1.textContent = 'PLAY';
	} else {
		pause.classList.remove('fa-play');
		pause.classList.add('fa-pause');
		caption1.textContent = 'PAUSE';
	}

	if (!isPaused && !isRestarted) {
		startTime += Date.now() - pausedTime;
		console.log(startTime);
	}

	if (!isPaused && isRestarted) {
		startTime = Date.now();
		isRestarted = false;
		console.log(startTime);
	}

	if (isPaused) {
		pausedTime = Date.now();
		console.log(startTime);
		console.log(pausedTime);
	}
}

pause.addEventListener('mousedown', togglePause);

function refreshTimer () {
	startTime = Date.now();

	if (isPaused) {
		isRestarted = true;
	}

	duration = workSession ? workTime : breakTime;
	seconds = duration;

	timeView.textContent = timeString(duration);
}

refresh.addEventListener('mousedown', refreshTimer);

function updateProgressBar () {
	progressBar.style.width = (seconds/duration*100).toFixed(2) + '%';
}






	

