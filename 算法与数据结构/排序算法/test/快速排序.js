const {
  quickSort,
  sort2ways,
  sort3ways
} = require("../code/快速排序")
const SortHeleper = require("./SortHeleper")

const arr1 = SortHeleper.generateRandomArray()
quickSort(arr1)
console.log(SortHeleper.isSorted(arr1))

const arr2 = SortHeleper.generateRandomArray()
sort2ways(arr2)
console.log(SortHeleper.isSorted(arr2))

const arr3 = SortHeleper.generateRandomArray()
sort3ways(arr3)
console.log(SortHeleper.isSorted(arr3))