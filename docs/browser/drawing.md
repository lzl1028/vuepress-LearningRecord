# 浏览器如何渲染网页

1. 使用 HTML 创建文档对象模型（DOM）
2. 使用 CSS 创建 CSS 对象模型（CSSOM）
3. 基于 DOM 和 CSSOM 执行脚本（Scripts）
4. 合并 DOM 和 CSSOM 形成渲染树（Render Tree）
5. 使用渲染树布局（Layout）所有元素
6. 渲染（Paint）所有元素

![image](http://jinlong.github.io/image/browser-fe-optimizing/p1.png)


## 步骤一： HTML
- 浏览器从上到下读取标签，把他们分解成节点，从而创建 DOM 。

### HTML 加载优化策略
1. 样式在顶部，脚本在底部
    - 总体思路是尽可能早的加载样式，尽可能晚的加载脚本。原因是脚本执行之前，需要 HTML 和 CSS 解析完成，因此，样式尽可能的往顶部放，当底部脚本开始执行之前，样式有足够的时间完成计算。

2. 最小化和压缩：方法可用于所有内容，包括HTML，CSS，JavaScript，图片和其它资源。
    - 最小化是移除所有多余的字符，包括空格，注释，多余的分号，等等。
    - 压缩比如 GZip，大大压缩下载文件的大小
3. 无障碍
    - 不会提升页面的下载速度，但会大大提升残障人士的满意度。给元素加上 aria 标签，图片提供 alt 文本。
    - 使用诸如 WAVE 的工具鉴别哪些地方可以提高可访问性。

## 步骤二：CSS
- 当浏览器发现任何与节点相关的样式时，比如：外部，内部，或行内样式，立即停止渲染 DOM ，并利用这些节点创建 CSSOM。这就是 CSS “渲染阻塞“ 的由来。这里是不同类型样式的优缺点。

```html
//外部样式
<link rel="stylesheet" href="styles.css">
// 内部样式
<style>
  h1 {
    font-size: 18px;
  }
</style>
// 行内样式
<button style="background-color: blue;">Click me</button>
```

- CSSOM 节点创建与 DOM 节点创建类似，随后，两者合并如下：
![image](http://jinlong.github.io/image/browser-fe-optimizing/p3.png)

- CSSOM 的构建会阻塞页面的渲染，因此我们想尽早加载样式

1. CSS 加载优化策略
    - 使用 media 属性: media 属性指定加载样式的条件，比如：符合最大或最小分辨率？还是面向屏幕阅读器？
    - 延迟加载 CSS: 有些样式，比如：首屏以下的，或者不那么重要的，可以等待首屏最有价值的内容渲染完成再加载，可以使用脚本等待页面加载，然后再插入样式。
    - 只加载需要的样式: 使用 uncss 类似的工具，尽量移除不需要的样式。


## 步骤三 — JavaScript

- 浏览器不断构建 DOM / CSSOM 节点，直到发现外部或者行内的脚本。
- 由于脚本可能需要访问或操作之前的 HTML 或样式，我们必须等待它们构建完成。
- 因此浏览器必须停止解析节点，完成构建 CSSOM，执行脚本，然后再继续。这就是 JavaScript 被称作“解析器阻塞”的原因。
- 脚本只能等到先前的 CSS 节点构建完成。

1. JavaScript 加载优化策略
    - 脚本添加 async 属性，可以通知浏览器不要阻塞其余页面的加载，下载脚本处于较低的优先级。一旦下载完成，就可以执行。
    - async 适用于不影响 DOM 或 CSSOM 的脚本，对一些跟我们的代码无关的，不影响用户体验的外部脚本尤其适用，比如：分析统计脚本。

2. 延迟加载脚本
    - defer 跟 async 非常相似，不会阻塞页面加载，但会等到 HTML 完成解析后再执行。
    - 使用 defer 策略的 另一个好选择:onload，或者也可以使用 addEventListener
    - 不幸的是 async 和 defer 对于行内的脚本不起作用，浏览器默认会编译执行它们。

3. 操作之前克隆节点
    - 多次操作 DOM 时可以尝试，首先克隆整个 DOM 节点更加高效，操作克隆后的节点，然后替换先前的节点，避免了多次重绘，降低了 CPU 和内存消耗，同时也避免了不必要的页面闪烁。
    - 需要注意，克隆的时候并没有克隆事件监听。
4. Preload/Prefetch/Prerender/Preconnect: 这些新属性并不是所有的浏览器都支持。


## 步骤四 — 渲染树（Render Tree）
- 一旦所有节点已被解析，DOM 和 CSSOM 准备合并，浏览器便会构建渲染树。如果我们把节点想象成单词，那么对象模型就是句子，渲染树便是整个页面。

附图![image](http://jinlong.github.io/image/browser-fe-optimizing/p7.png)



## 步骤五 — 布局（Layout）
- 布局阶段需要确定页面上所有元素的大小和位置
![image](http://jinlong.github.io/image/browser-fe-optimizing/p8.png)

## 步骤六 — 渲染（Paint）
- 最终的渲染阶段，会真正地光栅化屏幕上的像素，把页面呈现给用户。
![image](http://jinlong.github.io/image/browser-fe-optimizing/p9.png)

- 整个过程耗时1秒或十分之一秒，我们的任务是让它更快。
- 如果 JavaScript 事件改变了页面的某部分，便会引起渲染树的重绘，并且迫使布局（Layout）和渲染（Paint）过程再次进行。





