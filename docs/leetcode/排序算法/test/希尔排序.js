const {
  shellSort,
  shellSort2,
  shellSort3
} = require("../code/希尔排序")
const SortHeleper = require("./SortHeleper")

const arr1 = SortHeleper.generateRandomArray()
shellSort(arr1)
console.log(SortHeleper.isSorted(arr1))

const arr2 = SortHeleper.generateRandomArray()
shellSort2(arr2)
console.log(SortHeleper.isSorted(arr2))

const arr3 = SortHeleper.generateRandomArray(30)
shellSort3(arr3)
console.log(SortHeleper.isSorted(arr3))