let time = {
  minutes: +localStorage.getItem("time-minutes"),
  seconds: +localStorage.getItem("time-seconds"),
};

/** 
 * Mutate the time object.
 * @param {number} minutes
 * @param {number} seconds
**/
function setTime(minutes, seconds) {
  time.minutes = minutes;
  time.seconds = seconds;
}

export { time, setTime };
