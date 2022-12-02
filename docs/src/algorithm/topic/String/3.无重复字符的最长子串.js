/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
	// 定义一个hashmap
	const window = new Map();

	let left = 0;
	let right = 0;
	let res = 0; // 记录结果
	while (right < s.length) {
		const c = s[right];
		right++;
		// 进行窗口内数据的一系列更新
		if (!window.get(c)) window.set(c, 0);
		window.set(c, window.get(c) + 1);
		// 判断左侧窗口是否要收缩
		while (window.get(c) > 1) {
			const d = s[left];
			left++;
			// 进行窗口内数据的一系列更新
			if (!window.get(d)) window.set(d, 0);
			window.set(d, window.get(d) - 1);
		}
		// 在这里更新答案
		res = Math.max(res, right - left);
	}
	return res;
};

console.log(lengthOfLongestSubstring('abcabcbb')); // 3
console.log(lengthOfLongestSubstring('bbbbb')); // 1
