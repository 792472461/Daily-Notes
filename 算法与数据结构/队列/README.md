# 队列

- 队列是一种先进先出的数据结构（先到先得）
- First In First Out(FIFO)

```typescript
interface Queue<T> {
  // 入队
  enqueue: (e: T) => void
  // 出队
  dequeue: () => T
  // 获取队首元素
  getFront: () => T
  // 获取队列长度
  getSize: () => number
  // 判断队列是否为空
  isEmpty: () => boolean
}
```