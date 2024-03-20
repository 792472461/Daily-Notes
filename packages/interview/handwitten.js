/**
 * 高频手写题
 */

/**
 * 防抖
 * @param {*} func 防抖函数
 * @param {*} wait 等待时间
 */
function debounce(func, wait = 50) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * 节流函数
 * @param {*} func
 * @param {*} wait
 * @returns
 */
function throttle(func, wait = 50) {
  let timer;
  return function (...args) {
    if (timer) return;
    setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * 实现一个自定义的 instanceOf 函数，用于检查一个对象是否是某个构造函数的实例。
 * @param {Object} obj 要检查的对象
 * @param {Function} constructor 构造函数
 * @returns {boolean} 如果 obj 是 constructor 的实例则返回 true，否则返回 false
 */
const myInstanceof = (obj, constructor) => {
  // 获取obj的原型
  let proto = Object.getPrototypeOf(obj);
  // 向上查找，遍历原型链
  while (proto !== null) {
    // 如果找到了 constructor 的原型，则返回 true
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

/**
 * 手写实现一个 new 操作符
 * @param {Function} constructor 构造函数
 * @param  {...any} args 构造函数参数
 * @returns {Object} 构造函数的实例
 */
function myNew(constructor, ...args) {
  // 创建一个新的对象，且该对象的原型链指向构造函数的原型对象
  const obj = Object.create(constructor.prototype);
  // 使用 apply 方法调用构造函数，将构造函数内部的 this 绑定到新创建的对象
  const result = obj.apply(constructor, args);
  // 如果构造函数有返回值且返回值是对象或者函数，则返回该返回值，否则返回新创建的对象
  return typeof result === 'object' || typeof result === 'function'
    ? result
    : obj;
}
/**
 * 柯里化函数
 * @param {Function} fn 要柯里化的函数
 * @returns {Function} 柯里化后的函数
 */
function curry(fn, ...args) {
  // 返回一个新函数
  return function curried(...nextArgs) {
    // 将之前传入的参数和新传入的参数合并
    const allArgs = args.concat(nextArgs);

    // 如果参数个数足够，则执行原函数
    if (allArgs.length >= fn.length) {
      return fn.apply(this, allArgs);
    } else {
      // 如果参数个数不够，则递归调用自身，传入新的参数
      return curry.call(this, fn, ...allArgs);
    }
  };
}

// function add(a, b, c) {
//   return a + b + c;
// }

// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3));

/**
 * 比较两个版本号的大小
 * @param {string} version1 版本号1
 * @param {string} version2 版本号2
 * @returns {number} 如果 version1 大于 version2，则返回 1；如果 version1 小于 version2，则返回 -1；如果 version1 等于 version2，则返回 0。
 */
function compareVersion(version1, version2) {
  // 将版本号字符串转换为数组，每个元素表示一个版本号的部分
  const v1Arr = version1.split('.');
  const v2Arr = version2.split('.');
  // 找到两个版本号中较长的数组，并使用它的长度作为循环次数
  const length = Math.max(v1Arr.length, v2Arr.length);

  for (let i = 0; i < length; i++) {
    // 将数组中的每个部分转换为数字，如果部分不存在则为0
    const v1Part = parseInt(v1Arr[i] || 0);
    const v2Part = parseInt(v2Arr[i] || 0);

    // 如果版本号的某个部分不相等，直接返回比较结果
    if (v1Part > v2Part) {
      return 1;
    } else if (v1Part < v2Part) {
      return -1;
    }
  }
  return 0;
}

/**
 * 将多维数组扁平化为一维数组
 * @param {Array} arr 待扁平化的数组
 * @returns {Array} 扁平化后的数组
 */
function flat(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val),
    []
  );
}

/**
 * 自定义实现 Promise.all 函数
 * @param {Array<Promise>} promises 由 Promise 对象组成的数组
 * @returns {Promise} 返回一个新的 Promise 对象，该对象在数组中所有 Promise 对象都成功解析后才会被解析，如果数组中任何一个 Promise 对象被拒绝，则返回的 Promise 对象会立即被拒绝，并带有拒绝的原因。
 */
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolveCount = 0;
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          // 将解析的结果存入对应的位置
          results[index] = res;
          resolveCount++;
          // 如果全部Promise已经返回成功，则返回结果
          if (resolveCount === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          // 如果有任何一个 Promise 被拒绝，则立即拒绝新的 Promise 对象
          reject(err);
        });
    });
  });
}

/**
 * 将数组转换为树形结构
 * @param {Array} array 待转换的数组
 * @returns {Array} 转换后的树形结构
 */
function arrayToTree(arr) {
  let results = [];
  const map = {};
  arr.forEach((item) => {
    const { id, parentId } = item;
    // 如果没有存储过
    if (!map[id]) {
      map[id] = { children: [] };
    }
    map[id] = { ...item, children: map[id].children };
    // 如果当前节点没有父节点，则将其作为根节点
    if (parentId === null) {
      results.push(map[id]);
    } else {
      if (!map[parentId]) {
        map[parentId] = { children: [] };
      }
      map[parentId].children.push(map[id]);
    }
  });
}

/**
 * 安全地获取对象的属性值，即使对象的属性路径不存在也不会抛出错误
 * @param {Object} obj 待获取属性的对象
 * @param {string} path 属性路径，可以是以点号分隔的字符串，也可以是数组形式的属性路径
 * @param {*} defaultValue 可选参数，属性不存在时返回的默认值，默认为 undefined
 * @returns {*} 返回对象的属性值，如果属性路径不存在则返回默认值
 */
function getObjectPath(obj, path, defaultValue) {
  // 如果属性路径是字符串形式，则将其转换为数组形式
  const keys = Array.isArray(path) ? path : path.slice('.');

  // 使用reduce找对应的key
  return keys.reduce((currentObj, key) => {
    if (currentObj === null || currentObj[key] === undefined) {
      return defaultValue;
    }
    return currentObj[key];
  }, obj);
}

/**
 * 计算二叉树的最大深度（递归方法）
 * @param {TreeNode} root 二叉树的根节点
 * @returns {number} 最大深度
 */
function maxDepth(root) {
  if (!root) {
    return 0; // 如果节点为空，返回深度为 0
  }
  // 递归计算左子树和右子树的最大深度，取其较大值并加 1（当前节点的深度）
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

/**
 * 计算二叉树的最大深度（迭代方法）
 * @param {TreeNode} root 二叉树的根节点
 * @returns {number} 最大深度
 */
function maxDepth1(root) {
  if (!root) {
    return 0; // 如果节点为空，返回深度为 0
  }

  let depth = 0;
  const queue = [root]; // 初始化队列，并将根节点入队

  while (queue.length > 0) {
    const size = queue.length; // 当前层的节点数
    depth++; // 每遍历一层就增加深度

    // 遍历当前层的所有节点，并将下一层的节点入队
    for (let i = 0; i < size; i++) {
      const node = queue.shift(); // 出队一个节点
      if (node.left) {
        queue.push(node.left); // 将左子节点入队
      }
      if (node.right) {
        queue.push(node.right); // 将右子节点入队
      }
    }
  }

  return depth;
}

/**
 * 计算无重复字符的最长子串长度
 * @param {string} s 输入字符串
 * @returns {number} 最长子串长度
 */
function lengthOfLongestSubstring(s) {
  const map = new Map(); // 使用 Map 数据结构来存储字符及其出现的位置
  let maxLength = 0; // 最长子串长度
  let left = 0; // 窗口的左边界+

  // 遍历字符串 "abcabcbb"
  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    // 如果当前字符已经在窗口中出现过，则更新窗口的左边界为当前字符上次出现的位置的下一个位置
    if (map.has(currentChar) && map.get(currentChar) >= left) {
      left = map.get(currentChar) + 1;
    }

    // 更新当前字符的位置为右边界
    map.set(currentChar, right);

    // 更新最长子串长度
    maxLength = Math.max(maxLength, right - left + 1);
  }
  console.log(map);
  return maxLength;
}

console.log(lengthOfLongestSubstring('abcabcabc'));
