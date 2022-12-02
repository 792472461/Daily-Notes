import { Placement } from './utils/flags';

export function ReactFiber(vnode, retunFiber) {
  const { type, key, props } = vnode;
  return {
    type,
    key,
    props,
    // 原生标签,DOM
    // class组件，实例
    stateNode: null,
    // 第一个子fiber
    child: null,
    // 下一个兄弟节点
    sibling: null,
    return: retunFiber,
    // 当前任务的状态，删除、插入、更新
    flag: Placement,
    index: null
  };
}
