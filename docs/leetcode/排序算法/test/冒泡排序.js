const {
  bubbleSort,
  bubbleSort2,
  bubbleSort3
} = require("../code/冒泡排序")
const SortHeleper = require("./SortHeleper")

const arr1 = SortHeleper.generateRandomArray()
bubbleSort(arr1)
console.log(SortHeleper.isSorted(arr1))

const arr2 = SortHeleper.generateRandomArray()
bubbleSort2(arr2)
console.log(SortHeleper.isSorted(arr2))

const arr3 = SortHeleper.generateRandomArray()
bubbleSort3(arr3)
console.log(SortHeleper.isSorted(arr3))