// Select DOM
// Pomodoro
const toggleButton = document.querySelector("#toggle-pomodoro")
const pomodoroDiv = document.querySelector("#pomodoro")
const timeSeconds = document.querySelector("#time-seconds")
const timeMinutes = document.querySelector("#time-minutes")
const deletePomodoroButton = document.querySelector("#delete-pomodoro")

// Whitenoise
const whitenoiseDialog = document.querySelector("#whitenoise")
const closeWhitenoiseButton = document.querySelector("#whitenoise-close")
const openWhitenoiseButton = document.querySelector("#whitenoise-open")

// Focus Mode
const toggleFocusMode = document.querySelector("#toggle-focus")
const mainSection = document.querySelector("main")

// Mode
const toggleModeButton = document.querySelector("#toggle-mode")
const toggleModeBtnText = document.querySelector("#toggle-mode .text")
const toggleModeBtnIcon = document.querySelector("#toggle-mode .material-icons")
const mainContainers = document.querySelectorAll("main,body")

// Initialize local storage
initalizeStorage()

let time = {
  minutes: +localStorage.getItem("time-minutes"),
  seconds: +localStorage.getItem("time-seconds")
}

document.addEventListener("DOMContentLoaded", function () {
  pomodoro.showInitialTime(time)
})

// Pause/delete pomodoro
toggleButton.addEventListener("click", togglePause)
deletePomodoroButton.addEventListener("click", deletePomodoro)

// Whitenoise dialog
closeWhitenoiseButton.addEventListener("click", function () {
  whitenoiseDialog.style.display = "none"
})

openWhitenoiseButton.addEventListener("click", function () {
  whitenoiseDialog.style.display = "flex"
})

// Focus mode
toggleFocusMode.addEventListener("click", function () {
  mainSection.requestFullscreen()
})

// Toggle Mode
toggleModeButton.addEventListener("click", onToggleMode)

/**
  * Toggle betweeen work, short break and long break modes.
  * @param {boolean} showDialog whether to show dialog or not.
  * @returns {void}
**/
function onToggleMode(showDialog = false) {
  switch (toggleModeBtnText.innerText) {
    case "Work":
      // Change to break
      time = {
        minutes: +localStorage.getItem("break-minutes"),
        seconds: +localStorage.getItem("break-seconds")
      }
      toggleModeBtnText.innerText = "Break"
      toggleModeBtnIcon.innerText = "done"
      pomodoro.showInitialTime()
      changeBackground("#ecdddd")

      if (showDialog === true)
        dialog("Time for break")

      break

    case "Break":
      time = {
        minutes: +localStorage.getItem("longbreak-minutes"),
        seconds: +localStorage.getItem("longbreak-seconds")
      }
      toggleModeBtnText.innerText = "Long Break"
      toggleModeBtnIcon.innerText = "done_all"
      pomodoro.showInitialTime()
      changeBackground("#fbdbdb")
      
      if (showDialog === true)
        dialog("Time for loong break")

      break

    default:
      time = {
        minutes: +localStorage.getItem("time-minutes"),
        seconds: +localStorage.getItem("time-seconds")
      }
      toggleModeBtnText.innerText = "Work"
      toggleModeBtnIcon.innerText = "whatshot"
      pomodoro.showInitialTime()
      changeBackground("#ece7dd")

      if (showDialog === true)
        dialog("Time for break")

      break
  }

  function changeBackground(background) {
    mainContainers.forEach(function (container) {
      container.style.background = background
      container.style.color = "#fdfdfd"
    })
  }
}

/** 
 * Initializes local storage.
 * @return {void} 
**/
function initalizeStorage() {
  localStorage.setItem("time-minutes", 00)
  localStorage.setItem("time-seconds", 03)
  localStorage.setItem("break-minutes", 00)
  localStorage.setItem("break-seconds", 05)
  localStorage.setItem("longbreak-minutes", 00)
  localStorage.setItem("longbreak-seconds", 06)
}

/** 
 * Modify text and icon of the button element.
 * @param {HTMLElement} element the button element to modify.
 * @param {string} text new text of the button.
 * @param {icon} icon new icon of the button.**/
function modifyButton(element, text, icon) {
  const elementText = document.querySelector(`#${element.id} .text`)
  const elementIcon = document.querySelector(`#${element.id} .material-icons`)

  elementText.innerText = text
  elementIcon.innerText = icon
}