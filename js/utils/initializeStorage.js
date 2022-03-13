/**
 * Initializes local storage.
 **/
function initalizeStorage() {
  localStorage.setItem("time-minutes", 25);
  localStorage.setItem("time-seconds", 0);
  localStorage.setItem("break-minutes", 5);
  localStorage.setItem("break-seconds", 0);
  localStorage.setItem("longbreak-minutes", 30);
  localStorage.setItem("longbreak-seconds", 0);
  localStorage.setItem("initialize", false);
  sessionStorage.setItem("completed", 0);

  location.reload();
}

export default initalizeStorage;
