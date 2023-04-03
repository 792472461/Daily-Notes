# Css篇

## 盒模型宽度计算 {#boxModelWidth}

```html
<!-- 以下代码中，请问div1的 offsetWitdh 是多少 -->
<style>
  .div1 {
    width: 100px;
    padding: 10px;
    border: 10px solid #000;
    margin: 10px;
  }
</style>
<div class="div1"></div>
```

offsetWidth定义是：元素的宽度 + 左右padding + 左右border，不包括margin，所以div1的offsetWidth是140px

::: tip 思考
如何让div1的offsetWidth等于100px？

```html
<style>
  .div1 {
    width: 100px;
    padding: 10px;
    border: 10px solid #000;
    margin: 10px;
    box-sizing: border-box;
  }
</style>
<div class="div1"></div>
```

box-sizing: border-box;表示元素的宽度包括padding和border，所以div1的offsetWidth等于100px
:::

## margin重叠问题 {#marginCollapse}

```html
<!-- 1和2的间距是多少 -->
<style>
  p {
    font-size: 20px;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>
<p>1</p>
<p></p>
<p></p>
<p></p>
<p>2</p>
```

答案是15px，因为margin重叠，取最大值，空标签不会计算margin，所以答案是15px

## margin设置负值 {#marginNegative}

- margin-top、margin-left设置负值，会向上、向左移动元素
- margin-right设置负值，右侧元素会向左移动，自身不会影响
- margin-bottom设置负值，下方元素会向上移动，自身不会影响

## BFC {#bfc}

- bfc是块级格式化上下文，一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素

BFC的形成条件：

- float不为none
- position为absolute或fixed
- display为inline-block、table-cell、table-caption、flex、inline-flex
- overflow不为visible

BFC的作用：

- 清除浮动
- 阻止元素被浮动元素覆盖
- 阻止margin重叠

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

## CSS选择器 {#cssSelector}

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

## CSS预处理器 {#cssPreprocessor}

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

## CSS3 {#css3}

### CSS3有哪些新特性

- 新增选择器
  - 后代选择器
  - 子选择器
  - 相邻兄弟选择器
  - 通用兄弟选择器
  - 属性选择器
  - 伪类选择器
  - 伪元素选择器
- 新增属性
  - 文本属性
  - 背景属性
  - 边框属性
  - 盒模型属性
  - 列表属性
  - 表格属性
  - 转换属性
  - 动画属性
  - 多列属性
  - 用户界面属性
  - 媒体查询属性
  - 其他属性
- 新增伪类
  - :root
  - :nth-child()
  - :nth-last-child()
  - :nth-of-type()
  - :nth-last-of-type()
  - :first-child
  - :last-child
  - :first-of-type
  - :last-of-type
  - :only-child
  - :only-of-type
  - :empty
  - :link
  - :visited
  - :active
  - :hover
  - :focus
  - :target
  - :enabled
  - :disabled
  - :checked
  - :not()
- 新增伪元素
  - ::before
  - ::after
  - ::first-letter
  - ::first-line
- 新增动画
  - @keyframes
  - animation
  - animation-name
  - animation-duration
  - animation-timing-function
  - animation-delay
  - animation-iteration-count
  - animation-direction
  - animation-fill-mode
  - animation-play-state
- 新增媒体查询
  - @media
  - @import
  - @charset
  - @namespace
  - @supports
  - @document
  - @page
  - @font-face
  - @keyframes
  - @viewport
  - @counter-style
  - @font-feature-values
  - @property
  - @color-profile
