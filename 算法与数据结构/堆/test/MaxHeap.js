const MaxHeap = require("../code/MaxHeap")

const maxHeap = new MaxHeap()
const n = 5
for (let i = 0; i < n; i++) {
  maxHeap.add(Math.floor(Math.random() * 100))
}

const arr = []
for (let i = 0; i < n; i++) {
  arr.push(maxHeap.extractMax())
}

for (let i = 1; i < n; i++) {
  if (arr[i - 1] < arr[i]) {
    console.log('堆有毛病啊')
    break
  }
}