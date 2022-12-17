# Css篇

## Flex

### flex有哪些属性

- flex-direction 主轴方向，属性有row、row-reverse、column、column-reverse
- flex-wrap 是否换行，属性有nowrap、wrap、wrap-reverse
- flex-flow flex-direction和flex-wrap的简写，属性有row nowrap、row wrap、row wrap-reverse、column nowrap、column wrap、column wrap-reverse
- justify-content 主轴对齐方式，属性有flex-start、flex-end、center、space-between、space-around
- align-items 交叉轴对齐方式，属性有flex-start、flex-end、center、baseline、stretch
- align-content 多根轴线的对齐方式，属性有flex-start、flex-end、center、space-between、space-around、stretch

### flex布局的优缺点

- 优点
  - 代码简洁
  - 支持多种屏幕尺寸
  - 支持响应式布局
- 缺点
  - 低版本浏览器不支持
  - 无法在IE8及以下版本中实现垂直居中

### flex:1 与 flex:auto的区别

- flex:1
  - flex:1是flex-grow、flex-shrink、flex-basis的简写
  - flex-grow:1
  - flex-shrink:1
  - flex-basis:0%
- flex:auto
  - flex:auto是flex-grow、flex-shrink、flex-basis的简写
  - flex-grow:1
  - flex-shrink:1
  - flex-basis:auto

### flex:0 与 flex:none的区别

- flex:0
  - flex:0是flex-grow、flex-shrink、flex-basis的简写
  - flex-grow:0
  - flex-shrink:0
  - flex-basis:0%
- flex:none
  - flex:none是flex-grow、flex-shrink、flex-basis的简写
  - flex-grow:0
  - flex-shrink:0
  - flex-basis:auto

## BFC

### BFC是什么

- BFC(Block Formatting Context)块级格式化上下文，是Web页面的可视化CSS渲染的一部分，是块级盒子布局的区域，也是浮动元素与其他元素的交互限定区域

### BFC有哪些特性

- 内部的Box会在垂直方向，一个接一个地放置
- Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的margin box的左边，与包含块border box的左边相接触（对于从左往右的格式化，否则相反），即使存在浮动也是如此
- BFC的区域不会与float box重叠
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是如此
- 计算BFC的高度时，浮动元素也参与计算

### 如何创建BFC

- 根元素或包含根元素的元素
- 浮动元素：float除none以外的值
- 绝对定位元素：position (absolute、fixed)
- display为inline-block、table-cells、flex
- overflow除了visible以外的值（hidden、auto、scroll）

### BFC的应用

- 清除浮动
- 阻止元素被浮动元素覆盖
- 阻止margin重叠

## CSS选择器

### CSS选择器有哪些

- 元素选择器，例如h1、p、div
- 类选择器，例如.class
- id选择器，例如#id
- 通配符选择器，例如*
- 后代选择器，例如div p
- 子选择器，例如div>p
- 相邻兄弟选择器，例如h1+p
- 通用兄弟选择器，例如h1~p
- 属性选择器，例如a[rel="external"]
- 伪类选择器，例如a:hover、li:nth-child
- 伪元素选择器，例如::before、::after

### CSS选择器的优先级

- 优先级为：!important > 行内样式 > id选择器 > 类选择器 > 标签选择器 > 通配符选择器
- 优先级相同的情况下，样式定义最近者为准
- 继承的样式不计算在内

## CSS预处理器

### CSS预处理器有哪些

- Less
- Sass
- Stylus
- ...

### CSS预处理器的优缺点

- 优点
  - 可以使用变量、函数、嵌套等功能
  - 可以使用@import导入其他文件
  - 可以使用@extend继承
  - 可以使用@mixins混入
  - 可以使用@for循环
  - 可以使用@if条件判断
- 缺点
  - 需要编译
  - 有一定的学习成本
