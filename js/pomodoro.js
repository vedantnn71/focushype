import onToggleMode from "./mode";
import { notification } from "./notification";
import modifyButton from "./utils/modifyButton";
import { time } from "./utils/time";
import { trailZero } from "./utils/trailZero";

// Select DOM
const timeMinutes = document.querySelector("#time-minutes");
const timeSeconds = document.querySelector("#time-seconds");
const pomodoroDiv = document.querySelector("#pomodoro");
const toggleButton = document.querySelector("#toggle-pomodoro");
const deletePomodoroButton = document.querySelector("#delete-pomodoro");
const audio = new Audio("/done.mp3");

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
    this.time = time.minutes * 60 + time.seconds;
    let timeDuration = this.time;
    let completed = +localStorage.getItem("completed");

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
        this.showInitialTime();
        audio.play();

        switch (localStorage.getItem("running-mode")) {
          case "break":
            notification(
              "Time for work",
              "you have completed your short break pomodoro."
            );

            break;
          case "longbreak":
            notification(
              "Time for work",
              "you have completed your short long break pomodoro."
            );
            break;
          default:
            notification(
              "Time for break",
              "you have completed your one pomodoro of work."
            );
        }
      }

      timeMinutes.innerText = trailZero(minutes);
      timeSeconds.innerText = trailZero(seconds);
      timeDuration -= 1;
    }
  },

  stop() {
    this.stoppedTime = +timeMinutes.innerText * 60 + +timeSeconds.innerText;
    clearInterval(this.interval);
  },

  delete() {
    clearInterval(this.interval);
    this.time = time.minutes * 60 + time.seconds;
    this.showInitialTime();
  },

  showInitialTime() {
    timeMinutes.innerText = trailZero(time.minutes);
    timeSeconds.innerText = trailZero(time.seconds);
  },
};

export { pomodoro, deletePomodoro, togglePause };
