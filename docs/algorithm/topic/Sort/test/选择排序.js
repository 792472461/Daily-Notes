const {
  selectSort,
  selectSort2
} = require('../code/选择排序')
const SortHeleper = require('./SortHeleper')

const arr1 = SortHeleper.generateRandomArray()
selectSort(arr1)
console.log(SortHeleper.isSorted(arr1))

const arr2 = SortHeleper.generateRandomArray()
selectSort2(arr2)
console.log(SortHeleper.isSorted(arr2))
