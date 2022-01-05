# 队列与双端队列

队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

## 队列的接口定义

```typescript
interface Queue<T> {
  // 向队列尾部添加一个（或多个）新的项。
  enqueue: (e: T) => void
  // 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素
  dequeue: () => T
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动
  peek: () => T
  // 返回队列包含的元素个数，与数组的 length 属性类似
  getSize: () => number
  // 如果队列中不包含任何元素，返回 true，否则返回 false。
  isEmpty: () => boolean
}
```

## 创建队列

创建一个类来表示队列

```javascript
class Queue {
  constructor () {
    this.count = 0; // 队列的总长度
    this.lowestCount = 0; // 队首的指针
    this.items = {}; // 存放数据源
  }
}
```

## 实现入队操作

入队操作，该方法负责向队列添加新元素，新元素只能添加到队尾

```javascript
enqueue(element)
{
  this.items[this.count] = element;
  this.count++;
}
```

我们这里是基于对象实现的队列，所以我们忘队列里添加元素的时候，我们要把count变量作为item的key，对应的元素作为它的值。将元素加入队列后，count++

### 实现出队操作

出队操作，由于队列遵循先进先出原则，最先添加的项也是最先被移除的。

```javascript
dequeue()
{
  // 如果为空就直接返回undefined
  if (this.isEmpty()) {
    return undefined;
  }
  // 暂存队列头部的值，用来返回
  const result = this.items[this.lowestCount];
  // 删除队首
  delete this.items[this.lowestCount];
  // 队首的指针+1
  this.lowestCount++;
  // 返回被删除的队首
  return result;
}
```

## 查看队首元素

额外辅助方法，用来查看队首元素的。

```javascript
peek()
{
  // 队首为空返回undefined
  if (this.isEmpty()) {
    return undefined;
  }
  // 返回队首指针所在的元素
  return this.items[this.lowestCount];
}
```

## 实现isEmpty和size

isEmpty函数比较简单，只需要判断队首指针和队尾指针是否一样就可以了

```javascript
isEmpty()
{
  return this.count - this.lowestCount === 0;
}
```

同理如果我们要计算队列的长度，队尾指针减去队首指针就是队列的长度

```javascript
size()
{
  return this.count - this.lowestCount;
}
```

简化isEmpty

```javascript
isEmpty()
{
  return this.size() === 0;
}
```

## 清空队列

清空队列也比较简单，只需要把队列的属性值重置一下就可以了

```javascript
clear()
{
  this.items = {};
  this.count = 0;
  this.lowestCount = 0;
}
```

## 双端队列的数据结构

撰写中...
