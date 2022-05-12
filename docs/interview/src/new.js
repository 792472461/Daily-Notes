/**
 * @description new 实现
 * @param {Function} constructor 构造函数
 * @param  {...any} args 其他参数
 * @returns {Object}
 */
function customNew (constructor, ...args) {
  // 1.创建空对象并设置原型
  const obj = Object.create(constructor.prototype)
  // 2.绑定this并执行构造函数
  const result = constructor.apply(obj, args)
  // 4.返回构造函数显示返回的值或新对象
  return isObject(result) ? result : obj
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

// 测试
function Person (name) {
  this.name = name
}
const p1 = customNew(Person, 'AAA')
console.log(p1 instanceof Person) // true
console.log(p1.name) // AAA

// 测试
function Student (name) {
  this.name = name
  return {
    name: 'AAA',
    age: 23
  }
}
const stu = customNew(Student, 'BBB')
console.log(stu instanceof Student) // false
console.log(stu)
