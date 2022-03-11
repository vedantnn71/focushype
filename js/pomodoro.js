/**
 * Toggle pause or resume in pomodoro.
 * @returns {void}
**/
function togglePause() {
  if (pomodoroDiv.dataset.isRunning === "false") {
    pomodoroDiv.dataset.isRunning = true
    deletePomodoroButton.disabled = false
    modifyButton(toggleButton, "Stop", "pause")

    pomodoro.start()
  } else {
    pomodoroDiv.dataset.isRunning = false
    deletePomodoroButton.disabled = true
    modifyButton(toggleButton, "Start", "play_arrow")

    pomodoro.stop()
  }
}

/** 
 * Confirm and delete pomodoro
 * @returns {void}
**/
function deletePomodoro() {
  if (window.confirm("Are you sure to delete pomodoro?")) {
    pomodoro.delete(time)
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
    this.time = time.minutes * 60 + time.seconds
    let timeDuration = this.time

    if (this.stoppedTime) {
      timeDuration = this.stoppedTime
    }

    this.interval = setInterval(onInterval, 1000)

    function onInterval() {
      const minutes = parseInt(timeDuration / 60)
      const seconds = timeDuration % 60

      if (timeDuration <= 0) {
        clearInterval(pomodoro.interval)
        onToggleMode(true)
        modifyButton(toggleButton, "Start", "play_arrow")
        this.showInitialTime()
      }

      timeMinutes.innerText = minutes
      timeSeconds.innerText = seconds
      timeDuration -= 1
    }
  },
  stop() {
    this.stoppedTime = +timeMinutes.innerText * 60 + +timeSeconds.innerText
    clearInterval(this.interval)
  },
  delete() {
    this.stoppedTime = +localStorage.getItem("break-minutes") * 60 + +localStorage.getItem("break-seconds")
    clearInterval(this.interval)
  },
  showInitialTime() {
    console.log(time)

    timeMinutes.innerText = time.minutes
    timeSeconds.innerText = time.seconds
  },
}