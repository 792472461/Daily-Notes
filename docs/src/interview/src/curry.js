/**
 * @description 函数柯里化
 * @param {Function} fn 函数
 */
function curry(fn) {
	const fnArgsLength = fn.length;
	let args = [];

	// 独立函数
	function calc(...newArgs) {
		args = [...args, ...newArgs];

		if (args.length < fnArgsLength) {
			// 参数不够返回函数
			return calc;
		} else {
			return fn.apply(this, args.slice(0, fnArgsLength));
		}
	}
	return calc;
}

function add(a, b, c) {
	return a + b + c;
}

const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3));
