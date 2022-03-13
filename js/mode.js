import { time, setTime } from "./utils/time";
import { pomodoro } from "./pomodoro";
import { dialog } from "./dialog";
import modifyButton from "./utils/modifyButton";

const toggleModeBtnText = document.querySelector("#toggle-mode .text");
const toggleModeButton = document.querySelector("#toggle-mode");
const mainContainers = document.querySelectorAll("main,body");

/**
 * Toggle betweeen work, short break and long break modes.
 * @param {boolean} showDialog whether to show dialog or not.
 **/
function onToggleMode(showDialog = false) {
  const completed = +sessionStorage.getItem("completed");

  switch (toggleModeBtnText.innerText) {
    case "Work":
      // Change to break
      setTime(
        +localStorage.getItem("break-minutes"),
        +localStorage.getItem("break-seconds")
      );
      localStorage.setItem("running-mode", "break");
      pomodoro.showInitialTime();
      modifyButton(toggleModeButton, "Break", "done");
      changeBackground("#ecdddd");

      if (showDialog === true) dialog("Time for break");

      break;

    case "Break" && completed === 4:
      setTime(
        +localStorage.getItem("longbreak-minutes"),
        +localStorage.getItem("longbreak-seconds")
      );
      localStorage.setItem("running-mode", "longbreak");
      pomodoro.showInitialTime();
      changeBackground("#fbdbdb");
      modifyButton(toggleModeButton, "Long break", "done_all");

      if (showDialog === true) dialog("Time for loong break");

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
