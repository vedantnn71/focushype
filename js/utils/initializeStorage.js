/**
 * Initializes local storage.
 **/
function initalizeStorage() {
  localStorage.setItem("time-minutes", "00");
  localStorage.setItem("time-seconds", "03");
  localStorage.setItem("break-minutes", "00");
  localStorage.setItem("break-seconds", "05");
  localStorage.setItem("longbreak-minutes", "00");
  localStorage.setItem("longbreak-seconds", "06");
}

export default initalizeStorage;
