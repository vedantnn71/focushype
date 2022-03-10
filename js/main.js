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
const mainSection = document.querySelector("main");

// Mode
const toggleMode = document.querySelector("#toggle-mode");
const toggleModeText = document.querySelector("#toggle-mode .text");
const toggleModeIcon = document.querySelector("#toggle-mode .material-icons")
const mainContainers = document.querySelectorAll("main,body");

// Break Popup
const breakPopup = document.querySelector("#break")
const closeBreakPopup = document.querySelector("#close-break");

// Initialize local storage
initalizeStorage();

let time = {
  minutes: +localStorage.getItem("time-minutes"),
  seconds: +localStorage.getItem("time-seconds")
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

// Break popup
closeBreakPopup.addEventListener("click", function () {
  breakPopup.style.display = "none";
})

// Focus mode
toggleFocusMode.addEventListener("click", function () {
  mainSection.requestFullscreen();
})

// Toggle Mode
toggleMode.addEventListener("click", onToggleMode);

function onToggleMode() {
  switch (toggleModeText.innerText) {
    case "Work":
      toggleModeText.innerText = "Break";
      toggleModeIcon.innerText = "done"
      changeBackground("#ecdddd")
      break;

    case "Break":
      toggleModeText.innerText = "Long Break";
      toggleModeIcon.innerText = "done_all"
      changeBackground("#fbdbdb")
      break;

    default:
      toggleModeText.innerText = "Work";
      toggleModeIcon.innerText = "whatshot"
      changeBackground("#ece7dd")
  }

  function changeBackground(background) {
    mainContainers.forEach(function (container) {
      container.style.background = background;
      container.style.color = "#fdfdfd";
    });
  }
}


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
  localStorage.setItem("time-seconds", 03);
}

const pomodoro = {
  time: null,
  interval: null,
  stoppedTime: null,
  start() {
    this.time = time.minutes * 60 + time.seconds;
    let timeDuration = this.time;

    if (this.stoppedTime) {
      timeDuration = this.stoppedTime;
    }

    this.interval = setInterval(onInterval, 1000);

    function onInterval() {
      const minutes = parseInt(timeDuration / 60);
      const seconds = timeDuration % 60;

      if (timeDuration <= 0) {
        breakPopup.style.display = "flex";

        onToggleMode();
        clearInterval(pomodoro.interval);
      }

      timeMinutes.innerText = minutes;
      timeSeconds.innerText = seconds;
      timeDuration -= 1;
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

