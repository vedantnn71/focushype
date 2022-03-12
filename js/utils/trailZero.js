/**
 * Returns a string with trailing 0
 * @param {number} n number to trail
 * @returns {string} trailed number
 **/
function trailZero(n) {
  if (n <= 9) {
    return `0${n}`;
  } else {
    return `${n}`;
  }
}

export default trailZero;
