/**
 * @param {string} s
 * @return {number}
 */
export const firstUniqChar = function (s) {
	const hm = new Map();
	for (let i = 0; i < s.length; i++) {
		const cur = hm.get(s.charAt(i)) || 0;
		hm.set(s.charAt(i), cur + 1);
	}
	for (let i = 0; i < s.length; i++) {
		if (hm.get(s.charAt(i)) === 1) {
			return i;
		}
	}
	return -1;
};
