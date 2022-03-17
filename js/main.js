import { confirm } from "./dialog";
import { pomodoro, togglePause, deletePomodoro } from "./pomodoro";
import { requestNotification } from "./notification";
import { time } from "./utils/time";
import { initSettings } from "./settings";
import modifyButton from "./utils/modifyButton";
import onToggleMode from "./mode";
import initalizeStorage from "./utils/initializeStorage";
import { downloadBackup, restoreBackup } from "./utils/backup";

/* Select DOM */
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

// Settings
const settings = document.querySelector("#settings");
const downloadBackupBtn = document.querySelector("#download-backup");
const fileElement = document.querySelector("#restore-backup");
const restoreBtn = document.querySelector("#restore-backup-btn");
const closeSettings = document.querySelector("#close-settings");
const openSettings = document.querySelectorAll(".settings-open");

document.addEventListener("DOMContentLoaded", function () {
  pomodoro.showInitialTime(time);
  initSettings();

  openSettings.forEach((btn) => {
    btn.addEventListener("click", function () {
      settings.style.display = "flex";
    });
  });
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

// Backup
downloadBackupBtn.addEventListener("click", downloadBackup);
fileElement.addEventListener("change", restoreBackup);

restoreBtn.addEventListener("click", function () {
  fileElement.click();
});

closeSettings.addEventListener("click", function () {
  settings.style.display = "none";
});

// Notification
if (
  localStorage.getItem("ask-notification") === "true" &&
  typeof Notification !== "undefined"
) {
  setTimeout(function () {
    confirm(
      "Please grant notification permission to notify you about pomdoros",
      requestNotification
    );
  }, 10000);
}

// Initialize local storage
if (localStorage.getItem("initialize") === null) {
  initalizeStorage();
}
