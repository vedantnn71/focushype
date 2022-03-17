/**
 * Returns a string with trailing 0
 * @param {number} n number to trail
 * @returns {string} trailed number
 **/
function trailZero(n) {
  if (n <= 9) return `0${n}`;
  else return `${n}`;
}

/**
 * Returns a string with trailing 0
 * @param {string} n number to trail
 * @returns {number} trailed number
 **/
function untrailZero(n) {
  if (n.charAt(0) === "0") return +n.substring(1);
  else return n;
}

export { trailZero, untrailZero };
