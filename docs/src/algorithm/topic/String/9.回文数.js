/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
	const temp = x + '';

	let i = 0;
	let j = temp.length - 1;
	while (i < j) {
		if (temp.charAt(i) !== temp.charAt(j)) return false;
		i++;
		j--;
	}
	return true;
};

console.log(isPalindrome(121));
