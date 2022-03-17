import { pomodoro } from "../pomodoro";
import { initializeSettingsUI } from "../settings";
import { setTime } from "./time";

function json() {
  const storageData = {
    timeMinutes: localStorage.getItem("time-minutes"),
    timeSeconds: localStorage.getItem("time-seconds"),
    breakMinutes: localStorage.getItem("break-minutes"),
    breakSeconds: localStorage.getItem("break-seconds"),
    longbreakMinutes: localStorage.getItem("longbreak-minutes"),
    longbreakSeconds: localStorage.getItem("longbreak-seconds"),
  };

  return JSON.stringify(storageData);
}

function jmain() {
  restoreBackup();
}

function downloadBackup() {
  const downloadElem = document.createElement("a");
  const file = new Blob([json()], { type: "application/json" });

  downloadElem.href = URL.createObjectURL(file);
  downloadElem.download = "focushype.json";
  downloadElem.click();
}

function changeStorage(data) {
  localStorage.setItem("time-minutes", data.timeMinutes);
  localStorage.setItem("time-seconds", data.timeSeconds);
  localStorage.setItem("break-seconds", data.breakMinutes);
  localStorage.setItem("break-seconds", data.breakSeconds);
  localStorage.setItem("longbreak-minutes", data.longbreakMinutes);
  localStorage.setItem("longbreak-seconds", data.longbreakSeconds);
}

function restoreBackup(eve) {
  if (eve.target.files[0].type !== "application/json") {
    ("Invalid backup file.");
    return;
  }

  const file = eve.target.files[0];
  const reader = new FileReader();
  let output;

  reader.onload = function (e) {
    output = JSON.parse(e.target.result);
    changeStorage(output);
    setTime(output.timeMinutes, output.timeSeconds);

    pomodoro.showInitialTime();
    initializeSettingsUI();
  };

  reader.readAsText(file);
}

export { downloadBackup, restoreBackup };
