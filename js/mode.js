import { time, setTime } from "./utils/time";
import { pomodoro } from "./pomodoro";
import { dialog } from "./dialog";

const toggleModeBtnText = document.querySelector("#toggle-mode .text");
const mainContainers = document.querySelectorAll("main,body");
const toggleModeBtnIcon = document.querySelector(
  "#toggle-mode .material-icons"
);

/**
 * Toggle betweeen work, short break and long break modes.
 * @param {boolean} showDialog whether to show dialog or not.
 **/
function onToggleMode(showDialog = false) {
  switch (toggleModeBtnText.innerText) {
    case "Work":
      // Change to break
      setTime(
        +localStorage.getItem("break-minutes"),
        +localStorage.getItem("break-seconds")
      );
      toggleModeBtnText.innerText = "Break";
      toggleModeBtnIcon.innerText = "done";
      changeBackground("#ecdddd");
      pomodoro.showInitialTime();

      if (showDialog === true) dialog("Time for break");

      break;

    case "Break":
      time = {
        minutes: +localStorage.getItem("longbreak-minutes"),
        seconds: +localStorage.getItem("longbreak-seconds"),
      };
      toggleModeBtnText.innerText = "Long Break";
      toggleModeBtnIcon.innerText = "done_all";
      pomodoro.showInitialTime();
      changeBackground("#fbdbdb");

      if (showDialog === true) dialog("Time for loong break");

      break;

    default:
      time = {
        minutes: +localStorage.getItem("time-minutes"),
        seconds: +localStorage.getItem("time-seconds"),
      };
      toggleModeBtnText.innerText = "Work";
      toggleModeBtnIcon.innerText = "whatshot";
      pomodoro.showInitialTime();
      changeBackground("#ece7dd");

      if (showDialog === true) dialog("Time for break");

      break;
  }

  function changeBackground(background) {
    mainContainers.forEach(function (container) {
      container.style.background = background;
      container.style.color = "#fdfdfd";
    });
  }
}

export default onToggleMode;
