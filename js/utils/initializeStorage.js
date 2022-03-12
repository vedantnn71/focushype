/**
 * Initializes local storage.
 **/
function initalizeStorage() {
  localStorage.setItem("time-minutes", "0");
  localStorage.setItem("time-seconds", "3");
  localStorage.setItem("break-minutes", "0");
  localStorage.setItem("break-seconds", "2");
  localStorage.setItem("longbreak-minutes", "0");
  localStorage.setItem("longbreak-seconds", "4");
  localStorage.setItem("initialize", "false")
}

export default initalizeStorage;
