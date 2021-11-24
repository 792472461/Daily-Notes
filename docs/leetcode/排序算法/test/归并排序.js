const {
  mergeSort
} = require("../code/归并排序")
const SortHeleper = require("./SortHeleper")

const arr1 = SortHeleper.generateRandomArray()
mergeSort(arr1)
console.log(SortHeleper.isSorted(arr1))

// const arr2 = SortHeleper.generateRandomArray()
// sort2ways(arr2)
// console.log(SortHeleper.isSorted(arr2))

// const arr3 = SortHeleper.generateRandomArray()
// sort3ways(arr3)
// console.log(SortHeleper.isSorted(arr3))