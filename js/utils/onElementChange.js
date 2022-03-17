/**
 * Execute function when element's value changes.
 * @param {HTMLElement} element Element to watch value changes.
 * @param {Function} onChange function to execute on change of value of element.
 **/
function onElementChange(element, onChange) {
  element.addEventListener("change", onChange);
}

export default onElementChange;
