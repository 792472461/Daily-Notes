function myInstanceOf (instance, origin) {
  if (instance === null) return false

  const type = typeof instance
  if (type !== 'object' && type !== 'function') { return false }

  // 备份
  let tempInstance = instance
  // 往上一直找
  while (tempInstance) {
    if (tempInstance.__prop__ === origin.__prop__) {
      return true
    }
    // 顺着原型链往上找
    tempInstance = tempInstance.__prop__
  }
  return false
}
function Person (name) {
  this.name = name
}
const p1 = new Person('AAA')
console.log(myInstanceOf(p1, Person)) // true
console.log(myInstanceOf(p1, Object)) // true
console.log(p1 instanceof Person) // true
console.log(p1 instanceof Object) // true
