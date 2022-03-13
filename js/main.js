import { dialog, confirm } from "./dialog";
import { pomodoro, togglePause, deletePomodoro } from "./pomodoro";
import { notification, requestNotification } from "./notification";
import { time } from "./utils/time";
import modifyButton from "./utils/modifyButton";
import onToggleMode from "./mode";
import initalizeStorage from "./utils/initializeStorage";

// Select DOM
// Pomodoro
const toggleButton = document.querySelector("#toggle-pomodoro");
const deletePomodoroButton = document.querySelector("#delete-pomodoro");

// Focus Mode
const toggleFocusMode = document.querySelector("#toggle-focus");
const mainSection = document.querySelector("main");

// Mode
const toggleModeButton = document.querySelector("#toggle-mode");

// Toggle show/hide buttons
const toggleButtons = document.querySelector("#toggle-buttons");
const buttons = document.querySelector(".buttons");

document.addEventListener("DOMContentLoaded", function () {
  pomodoro.showInitialTime(time);
});

// Pause/delete pomodoro
toggleButton.addEventListener("click", togglePause);
deletePomodoroButton.addEventListener("click", deletePomodoro);

// Focus mode
toggleFocusMode.addEventListener("click", function () {
  mainSection.requestFullscreen();
});

// Show/hide buttons
toggleButtons.addEventListener("click", function () {
  if (buttons.style.display === "" || buttons.style.display === "none") {
    buttons.style.display = "flex";
    modifyButton(toggleButtons, "", "clear");
  } else if (buttons.style.display === "flex") {
    buttons.style.display = "none";
    modifyButton(toggleButtons, "", "menu");
  }
});

// Toggle Mode
toggleModeButton.addEventListener("click", function () {
  onToggleMode(false, true);
});

// Notification
if (localStorage.getItem("ask-notifcation") === "true") {
  confirm(
    "Please grant notification permission to notify you about pomdoros",
    requestNotification
  );
}

// Initialize local storage
if (localStorage.getItem("initialize") === null) {
  initalizeStorage();
}
