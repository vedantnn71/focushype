import { time, setTime } from "./utils/time";
import { pomodoro } from "./pomodoro";
import { dialog } from "./dialog";
import modifyButton from "./utils/modifyButton";

const toggleModeBtnText =
  document.querySelector("#toggle-mode .text").innerText;
const toggleModeButton = document.querySelector("#toggle-mode");
const mainContainers = document.querySelectorAll("main,body");

/**
 * Toggle betweeen work, short break and long break modes.
 * @param {boolean} showDialog whether to show dialog or not.
 * @param {boolean} forceChangeToLong forcefully show long pomodoro.
 **/
function onToggleMode(showDialog = false, forceChangeToLong = false) {
  const completed = +sessionStorage.getItem("completed");
  const runningMode = localStorage.getItem("running-mode") ?? "work";

  if (runningMode === "work") {
    // Change to break
    changeTime("break");
    modifyButton(toggleModeButton, "Break", "done");
    changeBackground("#ecdddd");
    pomodoro.showInitialTime();

    if (forceChangeToLong === false)
      sessionStorage.setItem("completed", completed + 1);

    if (showDialog === true) dialog("Time for break");
  } else if (
    (runningMode === "break" && completed === 4) ||
    (runningMode === "break" && forceChangeToLong)
  ) {
    changeTime("longbreak");
    changeBackground("#fbdbdb");
    modifyButton(toggleModeButton, "Long break", "done_all");
    pomodoro.showInitialTime();

    if (showDialog === true) dialog("Time for loong break");
  } else {
    changeTime("time");
    modifyButton(toggleModeButton, "Work", "whatshot");
    changeBackground("#ece7dd");
    pomodoro.showInitialTime();

    if (showDialog === true) dialog("Time for work");
  }

  function changeTime(mode) {
    setTime(
      +localStorage.getItem(`${mode}-minutes`),
      +localStorage.getItem(`${mode}-seconds`)
    );

    if (mode === "time") {
      localStorage.setItem("running-mode", "work");
    } else {
      localStorage.setItem("running-mode", mode);
    }
  }

  function changeBackground(background) {
    mainContainers.forEach(function (container) {
      container.style.background = background;
      container.style.color = "#fdfdfd";
    });
  }
}

export default onToggleMode;
