# Web Workers
[web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
[怎么在 ES6+Webpack 下使用 Web Worker](https://juejin.im/post/5acf348151882579ef4f5a77)
## 1. 介绍

Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。此外，他们可以使用XMLHttpRequest执行 I/O  (尽管responseXML和channel属性总是为空)。一旦创建， 一个worker 可以将消息发送到创建它的JavaScript代码, 通过将消息发布到该代码指定的事件处理程序（反之亦然）。

- 作用： 可以把复杂的循环操作单独放在一个线程里

## 2. 实例

```html
<button id="btn1">js</button>
<button id="btn2">worker</button>
<input type="text">
```

- 点击btn1时，js会进行大量计算，你会发现页面卡死了，点击input不会有任何反应

```js
// index.js
const btn1 = document.getElementById('btn1');

btn1.addEventListener('click', function () {
    let total = 1;

    for (let i = 0; i < 5000000000; i++) {
      total += i;
    }
    console.log(total);
})
```

- 优化代码：

```js
// worker.js
onmessage = function(e) {
  if (e.data === 'total') {
    let total = 1;

    for (let i = 0; i < 5000000000; i++) {
      total += i;
    }
    postMessage(total);
  }
}
```

```js
// index.js
if (window.Worker) {
  const myWorker = new Worker('worker.js');

  myWorker.onmessage = function (e) {
    console.log('total', e.data);
  };

  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');

  btn1.addEventListener('click', function () {
    let total = 1;

    for (let i = 0; i < 5000000000; i++) {
      total += i;
    }

    console.log('total', total);
  })

  btn2.addEventListener('click', function () {
    myWorker.postMessage('total');
  });

}
```
- 我们开启了一个单独的worker线程来进行复杂操作，通过postMessage和onmessage来进行两个线程间的通信。

