import { dialog, confirm } from "./dialog";
import { pomodoro, togglePause, deletePomodoro } from "./pomodoro";
import { notification, requestNotification } from "./notification";
import { time } from "./utils/time";
import onToggleMode from "./mode";
import initalizeStorage from "./utils/initializeStorage";

// Select DOM
// Pomodoro
const toggleButton = document.querySelector("#toggle-pomodoro");
const deletePomodoroButton = document.querySelector("#delete-pomodoro");
// Whitenoise
// const whitenoiseDialog = document.querySelector("#whitenoise")
// const closeWhitenoiseButton = document.querySelector("#whitenoise-close")
// const openWhitenoiseButton = document.querySelector("#whitenoise-open")

// Focus Mode
const toggleFocusMode = document.querySelector("#toggle-focus");
const mainSection = document.querySelector("main");

// Mode
const toggleModeButton = document.querySelector("#toggle-mode");

// Initialize local storage
initalizeStorage();

document.addEventListener("DOMContentLoaded", function () {
  pomodoro.showInitialTime(time);
});

// Pause/delete pomodoro
toggleButton.addEventListener("click", togglePause);
deletePomodoroButton.addEventListener("click", deletePomodoro);

// Whitenoise dialog
// closeWhitenoiseButton.addEventListener("click", function () {
//   whitenoiseDialog.style.display = "none"
// })

// openWhitenoiseButton.addEventListener("click", function () {
//   whitenoiseDialog.style.display = "flex"
// })

// Focus mode
toggleFocusMode.addEventListener("click", function () {
  mainSection.requestFullscreen();
});

// Toggle Mode
toggleModeButton.addEventListener("click", onToggleMode);

// Notification
if (localStorage.getItem("ask-notifcation") === "true") {
  confirm(
    "Please grant notification permission to notify you about pomdoros",
    requestNotification
  );
}
