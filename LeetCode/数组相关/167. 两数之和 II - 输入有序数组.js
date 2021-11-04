/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {

  let i = 0,
    j = numbers.length - 1
  while (i < numbers.length) {
    if (numbers[i] + numbers[j] === target) return [i + 1, j + 1]
    j--
    if (j == i) {
      i++
      j = numbers.length - 1
    }
  }
};