document.onkeydown = function(event) {
  let isKeyPressed = {
    "s": false,
  }
  isKeyPressed[event.key] = true;

  if(isKeyPressed["s"]) {
    pomodoro.start()
    console.log(pomodoro)
  }
}