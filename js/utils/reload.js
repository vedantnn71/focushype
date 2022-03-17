/**
 * Reload an specific DOM element.
 * @param {HTMLElement} element element to reload
 **/
function reload(element) {
  const elementContent = element.innerHTML;
  element.innerHTML = elementContent;
}

export default reload;
