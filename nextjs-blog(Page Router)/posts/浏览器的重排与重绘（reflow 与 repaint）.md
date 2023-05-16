---
title: '浏览器的重排与重绘（reflow 与 repaint）'
date: '2020-01-02'
---

## 浏览器渲染流程

先来参考一下 webkit 渲染主要流程：

![图片描述](/images/bVHJfZ.png)

- HTML 解析成 DOM 树，CSS 解析成 CSSOM 树，两者结合生成一棵 Render 树。
- 根据 Render Tree（包含节点、样式、从属关系）计算出每个节点在屏幕中的大小、位置。
- 最后绘制到屏幕上。

## 重排（reflow）

我们改变了元素的几何信息（位置、大小），浏览器需要重新计算布局，这个过程就叫 reflow。

**一些会导致 reflow 的情况：**

- 添加、删除可见元素
- 改变元素位置、尺寸
- 浏览器窗口大小变化
- 元素字体大小变化
- 激活 CSS 伪类。比如：`:hover`
- 一些查询方法（为了保证数据准确性）。比如：offsetWidth、offsetHeight、getComputedStyle。

**常见引起 reflow 属性和方法：**

| 属性和方法              | --                       | --                 | --         |
| ----------------------- | ------------------------ | ------------------ | ---------- |
| width                   | height                   | margin             | padding    |
| display                 | border-width             | border             | position   |
| overflow                | font-size                | vertical-align     | min-height |
| clientWidth             | clientHeight             | clientTop          | clientLeft |
| offsetWidth             | offsetHeight             | offsetTop          | offsetLeft |
| scrollWidth             | scrollHeight             | scrollTop          | scrollLeft |
| scrollIntoView()        | scrollTo()               | getComputedStyle() |            |
| getBoundingClientRect() | scrollIntoViewIfNeeded() |                    |            |

## 重绘（repaint）

当页面中元素样式的改变并不影响它在文档流中的位置时，浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

**常见的引起 repaint 的属性：**

| 属性：          | --               | --                  | --                |
| --------------- | ---------------- | ------------------- | ----------------- |
| color           | border-style     | visibility          | background        |
| text-decoration | background-image | background-position | background-repeat |
| outline-color   | outline          | outline-style       | border-radius     |
| outline-width   | box-shadow       | background-size     |                   |

## 性能影响

reflow 的代价要高于 repaint。

由于浏览器采用流式布局模型，有时一个元素 reflow，会导致其父元素和跟随它的元素一起 reflow。

现代浏览器会对 reflow 和 repaint 进行优化：

- 维护一个队列，将所有引起 reflow 和 repaint 的操作入队，在一定阈值下批处理。

但是有些为了保证数据的准确性，一些属性和方法会导致立即清空队列。

> 如：clientWidth、offsetWidth、scrollWidth、scrollTop、width、getComputedStyle()等等。
>
> 准确性：队列里的一些操作可能会影响到返回值。

## 优化建议

- 何用 class 一次性改变样式
- 避免读写会引发 reflow 的属性方法。需要多次使用，用变量缓存起来。
- 避免频繁操作 DOM，使用 documentFragment，对它进行操作，再一次性添加到文档中。
- 动画劲量用 translate 这类属性跳过 reflow、repaint，直接合成。
- 使用 absolute 或 fixed 脱离文档流，这样不会对其他元素造成影响。
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局。
- 尽量在低层级的DOM节点上操作，尽量减少 reflow 范围。

## 参考

https://juejin.cn/post/6844903569087266823

https://juejin.cn/post/6844904083212468238

https://segmentfault.com/a/1190000014520786