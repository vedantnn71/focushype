/**
 * Modify text and icon of the button element.
 * @param {HTMLElement} element the button element to modify.
 * @param {string} text new text of the button.
 * @param {icon} icon new icon of the button.
 **/
function modifyButton(element, text, icon) {
  const elementText = document.querySelector(`#${element.id} .text`);
  const elementIcon = document.querySelector(`#${element.id} .material-icons`);

  elementText.innerText = text;
  elementIcon.innerText = icon;
}

export default modifyButton;
