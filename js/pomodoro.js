import modifyButton from "./utils/modifyButton";
import onToggleMode from "./mode";
import { time } from "./utils/time";

// Select DOM
const timeMinutes = document.querySelector("#time-minutes");
const timeSeconds = document.querySelector("#time-seconds");
const pomodoroDiv = document.querySelector("#pomodoro");
const toggleButton = document.querySelector("#toggle-pomodoro");
const deletePomodoroButton = document.querySelector("#delete-pomodoro");
const audio = new Audio("../assets/done.mp3");

/**
 * Toggle pause or resume in pomodoro.
 **/
function togglePause() {
  if (pomodoroDiv.dataset.isRunning === "false") {
    pomodoroDiv.dataset.isRunning = true;
    deletePomodoroButton.disabled = false;
    modifyButton(toggleButton, "Stop", "pause");

    pomodoro.start();
  } else {
    pomodoroDiv.dataset.isRunning = false;
    deletePomodoroButton.disabled = true;
    modifyButton(toggleButton, "Start", "play_arrow");

    pomodoro.stop();
  }
}

/**
 * Confirm and delete pomodoro
 **/
function deletePomodoro() {
  if (window.confirm("Are you sure to delete pomodoro?")) {
    pomodoro.delete(time);
  }
}

/**
 * Pomodoro data and main methods
 **/
const pomodoro = {
  time: null,
  interval: null,
  stoppedTime: null,
  start() {
    let onIntervalThis = this;
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
        clearInterval(pomodoro.interval);
        onToggleMode(true);
        modifyButton(toggleButton, "Start", "play_arrow");
        audio.play();
        this.showInitialTime();
      }

      timeMinutes.innerText = minutes;
      timeSeconds.innerText = seconds;
      timeDuration -= 1;
    }
  },
  stop() {
    this.stoppedTime = +timeMinutes.innerText * 60 + +timeSeconds.innerText;
    clearInterval(this.interval);
  },
  delete() {
    this.stoppedTime =
      +localStorage.getItem("break-minutes") * 60 +
      +localStorage.getItem("break-seconds");
    clearInterval(this.interval);
  },
  showInitialTime() {
    console.log(time);

    timeMinutes.innerText = time.minutes;
    timeSeconds.innerText = time.seconds;
  },
};

export { pomodoro, deletePomodoro, togglePause };
