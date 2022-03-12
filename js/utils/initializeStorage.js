/**
 * Initializes local storage.
 **/
function initalizeStorage() {
  localStorage.setItem("time-minutes", "25");
  localStorage.setItem("time-seconds", "00");
  localStorage.setItem("break-minutes", "05");
  localStorage.setItem("break-seconds", "00");
  localStorage.setItem("longbreak-minutes", "30");
  localStorage.setItem("longbreak-seconds", "00");
  localStorage.setItem("initialize", "false")
}

export default initalizeStorage;
