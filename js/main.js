// Select DOM
// Pomodoro
const toggleButton = document.querySelector("#toggle-pomodoro");
const toggleButtonText = document.querySelector("#toggle-pomodoro .text");
const pomodoroDiv = document.querySelector("#pomodoro");
const timeSeconds = document.querySelector("#time-seconds");
const timeMinutes = document.querySelector("#time-minutes");
const deletePomodoroButton = document.querySelector("#delete-pomodoro");

// Whitenoise
const whitenoiseDialog = document.querySelector("#whitenoise");
const closeWhitenoiseButton = document.querySelector("#whitenoise-close");
const openWhitenoiseButton = document.querySelector("#whitenoise-open");

// Focus Mode
const toggleFocusMode = document.querySelector("#toggle-focus")
const mainContainer = document.querySelector("main");

// Mode
const toggleMode = document.querySelector("#toggle-mode");

// Initialize local storage
initalizeStorage();

let time = {
  minutes: localStorage.getItem("time-minutes"),
  seconds: localStorage.getItem("time-seconds")
}


document.addEventListener("DOMContentLoaded", function () {
  pomodoro.showInitialTime(time);
});

// Pause/delete pomodoro
toggleButton.addEventListener("click", togglePause)
deletePomodoroButton.addEventListener("click", deletePomodoro);

// Whitenoise dialog
closeWhitenoiseButton.addEventListener("click", function () {
  whitenoiseDialog.style.display = "none"
})

openWhitenoiseButton.addEventListener("click", function () {
  whitenoiseDialog.style.display = "flex"
})

// Focus mode
toggleFocusMode.addEventListener("click", function () {
  mainContainer.requestFullscreen();
})

// Toggle Mode
toggleMode.addEventListener("click", function () {
  mainContainer.style.backgroundColor = "#d26f75";
  mainContainer.style.color = "#fdfdfd";
})


function togglePause() {
  if (pomodoroDiv.dataset.isRunning === "false") {
    toggleButtonText.innerText = "Stop";
    pomodoroDiv.dataset.isRunning = true;
    deletePomodoroButton.disabled = false;

    pomodoro.start(time.minutes, time.seconds);
  } else {
    toggleButtonText.innerText = "Start";
    pomodoroDiv.dataset.isRunning = false;

    pomodoro.stop();
  }
}

function deletePomodoro() {
  if (window.confirm("Are you sure?")) {
    pomodoro.delete(time);
  }
}

function initalizeStorage() {
  localStorage.setItem("time-minutes", 00);
  localStorage.setItem("time-seconds", 02);
}

const pomodoro = {
  time: null,
  interval: null,
  stoppedTime: null,
  start(minutes, seconds) {
    this.time = minutes * 60 + seconds;
    time = this.time;

    if (this.stoppedTime) {
      time = this.stoppedTime;
    }

    this.interval = setInterval(onInterval, 1000);

    function onInterval() {
      const minutes = parseInt(time / 60);
      const seconds = time % 60;

      if (time <= 0) {
        timeMinutes.innerText = localStorage.getItem("time-minutes");
        timeSeconds.innerText = localStorage.getItem("time-seconds");

        clearInterval(pomodoro.interval);
      }

      timeMinutes.innerText = minutes;
      timeSeconds.innerText = seconds;
      time -= 1;
    }
  },
  stop() {
    this.stoppedTime = +timeMinutes.innerText * 60 + +timeSeconds.innerText;
    clearInterval(this.interval)
  },
  delete() {
    this.showInitialTime();
  },
  showInitialTime() {
    timeMinutes.innerText = time.minutes;
    timeSeconds.innerText = time.seconds;
  }
}

