/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
	const wordsMap = new Map();
	let tot = 0;
	words.forEach((word) => {
		tot += word.length;
		let num = wordsMap.get(word) || 0;
		wordsMap.set(word, ++num);
	});
	const ans = [];
	for (let i = 0; i + tot <= s.length; i++) {
		if (valid(s.substr(i, tot), words, wordsMap)) {
			ans.push(i);
		}
	}
	return ans;
};

/**
 *
 * @param {string} str
 * @param {string[]} words
 * @param {Map<string, number>} wordsMap
 */
function valid(str, words, wordsMap) {
	const k = words[0].length;
	const splitWordsMap = new Map();
	for (let i = 0; i < str.length; i += k) {
		let num = splitWordsMap.get(str.substr(i, k)) || 0;
		splitWordsMap.set(str.substr(i, k), ++num);
	}
	return equalsMap(splitWordsMap, wordsMap);
}

/**
 * 判断两个map是否一样
 * @param {Map<string, number>} a
 * @param {Map<string, number>} b
 * @returns {undefined}
 */
function equalsMap(a, b) {
	for (const [key, value] of a.entries()) {
		if (!b.get(key) || b.get(key) !== value) return false;
	}
	for (const [key, value] of b.entries()) {
		if (!a.get(key) || a.get(key) !== value) return false;
	}
	return true;
}

console.log(findSubstring('barfoothefoobarman', ['foo', 'bar']));
console.log(findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']));
