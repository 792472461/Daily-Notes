# Vue篇

## 1. 说说你对Vue的理解

Vue是一套用于构建用户界面的渐进式框架。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

Vue的设计目标是通过尽可能简单的API实现响应的数据绑定和组合的视图组件。

## 2. 说说你对MVVM的理解

MVVM是Model-View-ViewModel的缩写，是一种基于数据绑定的前端架构模式。它的核心思想是通过数据绑定把Model和View连接起来，当Model发生变化时，View也会随之变化，反之亦然。

## 3. 请简述Vue的diff算法

1. 对比标签

    ```javascript
    // 判断标签是否一致
    if(oldVnode.tag !== vnode.tag){
      oldVnode.el.parentNode.replaceChild(createElm(vnode),oldVnode.el)
    }
    ```

    在diff过程中会先比较标签是否一致，如果标签不一致用新的标签替换掉老的标签

2. 对比文本

  ```javascript
  if(oldVnode.text !== vnode.text){
    oldVnode.el.textContent = vnode.text
  }  
  ```
