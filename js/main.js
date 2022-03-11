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
const toggleModeButton = document.querySelector("#toggle-mode");
const toggleModeBtnText = document.querySelector("#toggle-mode .text");
const toggleModeBtnIcon = document.querySelector("#toggle-mode .material-icons")
const mainContainers = document.querySelectorAll("main,body");

// Initialize local storage
initalizeStorage();

let time = {
  minutes: +localStorage.getItem("time-minutes"),
  seconds: +localStorage.getItem("time-seconds")
}


document.addEventListener("DOMContentLoaded", function () {
  dialog("hey sup!");
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
  mainSection.requestFullscreen();
})

// Toggle Mode
toggleModeButton.addEventListener("click", onToggleMode);

function onToggleMode() {
  switch (toggleModeBtnText.innerText) {
    case "Work":
      // Change to break
      time = {
        minutes: +localStorage.getItem("break-minutes"),
        seconds: +localStorage.getItem("break-seconds")
      }
      toggleModeBtnText.innerText = "Break";
      toggleModeBtnIcon.innerText = "done"
      changeBackground("#ecdddd")
      pomodoro.showInitialTime();
      breakPopup.style.display = "flex";
      breakPopupText.innerText = "Time for a break";

      break;

    case "Break":
      time = {
        minutes: +localStorage.getItem("longbreak-minutes"),
        seconds: +localStorage.getItem("longbreak-seconds")
      }
      toggleModeBtnText.innerText = "Long Break";
      toggleModeBtnIcon.innerText = "done_all"
      breakPopup.style.display = "flex";
      breakPopupText.innerText = "Time for a looong break";

      changeBackground("#fbdbdb")
      pomodoro.showInitialTime();
      break;

    default:
      time = {
        minutes: +localStorage.getItem("time-minutes"),
        seconds: +localStorage.getItem("time-seconds")
      }
      toggleModeBtnText.innerText = "Work";
      toggleModeBtnIcon.innerText = "whatshot"
      breakPopup.style.display = "flex";
      breakPopupText.innerText = "Time for work";

      changeBackground("#ece7dd")
      pomodoro.showInitialTime();
      break;
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
    deletePomodoroButton.disabled = true;

    pomodoro.stop();
  }
}

function deletePomodoro() {
  if (window.confirm("Are you sure to delete pomodoro?")) {
    pomodoro.delete(time);
  }
}

function initalizeStorage() {
  localStorage.setItem("time-minutes", 00);
  localStorage.setItem("time-seconds", 03);
  localStorage.setItem("break-minutes", 00)
  localStorage.setItem("break-seconds", 05)
  localStorage.setItem("longbreak-minutes", 00)
  localStorage.setItem("longbreak-seconds", 06)
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
        pomodoro.break();
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
    this.stoppedTime = +localStorage.getItem("break-minutes") * 60 + +localStorage.getItem("break-seconds")
    clearInterval(this.interval);
  },
  showInitialTime() {
    console.log(time);

    timeMinutes.innerText = time.minutes;
    timeSeconds.innerText = time.seconds;
  },
  break() {
    onToggleMode();
  }
}