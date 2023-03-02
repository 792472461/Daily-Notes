// https://leetcode.cn/problems/reverse-words-in-a-string/

/**
 *
 * @param {string} s
 * @returns {string}
 */
function reverseWords(s) {
  // 1. 使用正则表达式去除多余的空格
  // 2. 使用 split 方法将字符串转换为数组
  // 3. 使用 reverse 方法反转数组
  // 4. 使用 join 方法将数组转换为字符串
  return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ');
}

// 示例 1：
// 输入："the sky is blue"
// 输出："blue is sky the"
console.log(reverseWords('the sky is blue')); // blue is sky the

// 示例 2：
// 输入："  hello world!  "
// 输出："world! hello"
// 解释：输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
console.log(reverseWords('  hello world!  ')); // world! hello

// 示例 3：
// 输入："a good   example"
// 输出："example good a"
// 解释：如果两个单词间有多余的空格，将砍掉多余的空格。
console.log(reverseWords('a good   example')); // example good a
