/**
 * @description 数组扁平化
 * @param {*[]} arr 数组
 */
function flatten(arr) {
	let res = [];

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (Array.isArray(item)) {
			res = res.concat(flatten(item));
		} else {
			res.push(item);
		}
	}

	return res;
}

console.log(flatten([1, 2, [3, 4, [5]]])); // [ 1, 2, 3, 4, 5 ]
console.log(flatten([1, 2, 3])); // [1, 2, 3]
