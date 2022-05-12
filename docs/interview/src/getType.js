/**
 * @description 获取数据类型
 * @param {*} x 变量
 */
function getType (x) {
  const originType = Object.prototype.toString.call(x)
  const spaceIndex = originType.indexOf(' ')
  const type = originType.slice(spaceIndex + 1, -1)
  return type.toLowerCase()
}

console.log(getType(undefined)) // undefined
console.log(getType(null)) // null
console.log(getType(100)) // number
console.log(getType(true)) // boolean
console.log(getType(Symbol(1))) // symbol
console.log(getType(() => { })) // function
console.log(getType({ })) // object
