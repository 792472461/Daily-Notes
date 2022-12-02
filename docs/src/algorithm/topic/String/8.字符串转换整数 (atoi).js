/**
 * @param {string} s
 * @return {number}
 */
export const myAtoi = function (s) {
	// Infinity不能参与运算，只能先这样定义好
	const max = 2147483647;
	const min = -2147483648;
	// 创建index指针
	let index = 0;
	// 创建符号
	let sign = 1;
	// 创建结果
	let total = 0;

	// 边界处理
	if (s.length === 0) return 0;

	// 删除多余的空格,指针往前走
	while (s.charAt(index) === ' ' && index < s.length) index++;

	// 处理正负号
	if (s.charAt(index) === '+' || s.charAt(index) === '-') {
		sign = s.charAt(index) === '+' ? 1 : -1;
		index++;
	}
	while (index < s.length) {
		// 空字符串会被当做0
		if (s.charAt === ' ') break;
		const digit = Number(s.charAt(index));
		// 不是数字到下个字符
		if (digit < 0 || digit > 9 || isNaN(digit)) break;
		// 边界处理
		if (max / 10 < total || (Math.floor(max / 10) === total && max % 10 < digit)) {
			return sign === 1 ? max : min;
		}

		total = 10 * total + digit;
		index++;
	}
	return total * sign;
};
