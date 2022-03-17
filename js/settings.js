import { pomodoro } from "./pomodoro";
import onElementChange from "./utils/onElementChange";
import { setTime } from "./utils/time";
import { trailZero, untrailZero } from "./utils/trailZero";

const settingsPomodoroMinutes = document.querySelector(
  "#pomodoro-settings-minutes"
);
const settingsPomodoroSeconds = document.querySelector(
  "#pomodoro-settings-seconds"
);
const settingsBreakMinutes = document.querySelector("#break-settings-minutes");
const settingsBreakSeconds = document.querySelector("#break-settings-seconds");
const settingsLongbreakMinutes = document.querySelector(
  "#longbreak-settings-minutes"
);
const settingsLongbreakSeconds = document.querySelector(
  "#longbreak-settings-seconds"
);

/**
 * Initialize values for input in settings
 **/
function initializeSettingsUI() {
  settingsPomodoroMinutes.value = trailZero(
    localStorage.getItem("time-minutes")
  );
  settingsPomodoroSeconds.value = trailZero(
    localStorage.getItem("time-seconds")
  );
  settingsBreakMinutes.value = trailZero(localStorage.getItem("break-minutes"));
  settingsBreakSeconds.value = trailZero(localStorage.getItem("break-seconds"));
  settingsLongbreakMinutes.value = trailZero(
    localStorage.getItem("longbreak-minutes")
  );
  settingsLongbreakSeconds.value = trailZero(
    localStorage.getItem("longbreak-seconds")
  );
}

function updateStorage() {
  onElementChange(settingsPomodoroMinutes, function () {
    localStorage.setItem("time-minutes", settingsPomodoroMinutes.value);

    // Update main pomodoro UI
    setTime(
      untrailZero(settingsPomodoroMinutes.value),
      untrailZero(settingsPomodoroSeconds.value)
    );
    console.log(
      untrailZero(settingsPomodoroMinutes.value),
      untrailZero(settingsPomodoroSeconds.value)
    );
    pomodoro.showInitialTime();
  });

  onElementChange(settingsPomodoroSeconds, function () {
    localStorage.setItem("time-seconds", settingsPomodoroSeconds.value);
  });

  onElementChange(settingsBreakMinutes, function () {
    localStorage.setItem("break-minutes", settingsBreakMinutes.value);
  });

  onElementChange(settingsBreakSeconds, function () {
    localStorage.setItem("break-seconds", settingsBreakSeconds.value);
  });

  onElementChange(settingsLongbreakMinutes, function () {
    localStorage.setItem("longbreak-minutes", settingsLongbreakMinutes.value);
  });

  onElementChange(settingsLongbreakSeconds, function () {
    localStorage.setItem("longbreak-seconds", settingsLongbreakSeconds.value);
  });
}

function initSettings() {
  initializeSettingsUI();
  updateStorage();
}

export { initSettings, initializeSettingsUI };
