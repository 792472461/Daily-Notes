/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;

  for (let i = 0, j = height.length - 1; i < j;) {
    let minHeight = 0

    if (height[i] < height[j]) {
      minHeight = height[i];

      i++;
    } else {
      minHeight = height[j]
      j--;
    }
    const area = (j - i + 1) * minHeight

    max = Math.max(max, area)
  }
  return max
};