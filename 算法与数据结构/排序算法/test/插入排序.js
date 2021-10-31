const {
  insertSort,
  insertSort2,
  insertSort3
} = require("../code/插入排序")
const SortHeleper = require("./SortHeleper")

const arr1 = SortHeleper.generateRandomArray()
insertSort(arr1)
console.log(SortHeleper.isSorted(arr1))

const arr2 = SortHeleper.generateRandomArray()
insertSort2(arr2)
console.log(SortHeleper.isSorted(arr2))

const arr3 = SortHeleper.generateRandomArray()
insertSort3(arr3)
console.log(SortHeleper.isSorted(arr3))