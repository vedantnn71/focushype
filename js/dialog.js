const dialogContainer = document.querySelector("#dialog")
const dialogHeading = document.querySelector("#dialog h1")
const dialogCloseButton = document.querySelector("#close-dialog")

dialogCloseButton.addEventListener("click", function() {
  dialogContainer.style.display = "none";
})

/**
 * Opens dialog with custom message. 
 * @param  {string} message message to show in heading of the dialog.
 * @return {void} show the dialog to the user and close when user asks. 
**/
function dialog(message) {
  dialogContainer.style.display = "flex"
  dialogHeading.innerText = message
}

function confirm(message, onSuccess, onDeny) {
  dialogContainer.style.display = "flex"
  dialogHeading.innerText = message

  dialogCloseButton.addEventListener("click", onSuccess)
}

export { dialog, confirm }