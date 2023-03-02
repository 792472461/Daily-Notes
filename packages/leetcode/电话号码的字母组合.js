// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if(!digits) return [];
  let result = [];
  let map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  }

  const findCombination = (digits, index, s) => {
    if(index === digits.length) {
      result.push(s);
      return;
    }
    let letters = map[digits[index]];
    for(let i = 0; i < letters.length; i++) {
      findCombination(digits, index + 1, s + letters[i]);
    }
  }
  findCombination(digits, 0, '')
  return result;
};

// 示例 1：
// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations('23'));

// 示例 2：
// 输入：digits = ""
// 输出：[]
console.log(letterCombinations(''));

// 示例 3：
// 输入：digits = "2"
// 输出：["a","b","c"]
console.log(letterCombinations('2'));

// 提示：
// 0 <= digits.length <= 4

