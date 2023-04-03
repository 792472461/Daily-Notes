// 数组结构转树结构
const data = [
  { id: 1, name: '1', parentId: 0 },
  { id: 2, name: '2', parentId: 1 },
  { id: 3, name: '3', parentId: 1 },
  { id: 4, name: '4', parentId: 2 },
  { id: 5, name: '5', parentId: 2 },
  { id: 6, name: '6', parentId: 3 },
  { id: 7, name: '7', parentId: 3 },
  { id: 8, name: '8', parentId: 4 },
  { id: 9, name: '9', parentId: 4 },
  { id: 10, name: '10', parentId: 5 }
];

const arrayToTree = (data, parentId = 0) => {
  const result = [];
  data.forEach((item) => {
    // 如果当前项的父id等于传入的父id，说明当前项是传入父id的子项
    if (item.parentId === parentId) {
      // 递归，查找当前项的子项
      const children = arrayToTree(data, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      result.push(item);
    }
  });
  return result;
};

// 优化
const arrayToTree1 = (data) => {
  const itemMap = {};
  let result = [];

  // 先循环一遍，把所有的数据都放到一个map里面，方便后面的查找
  data.forEach((item) => {
    const newItem = { ...item, children: [] };
    itemMap[item.id] = newItem;
  });

  // 遍历map，把每个数据的子数据放到children里面
  Object.values(itemMap).forEach((item) => {
    const parentItem = itemMap[item.parentId];

    if (parentItem) {
      parentItem.children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
};

console.log(arrayToTree(data));
console.log(arrayToTree1(data));
