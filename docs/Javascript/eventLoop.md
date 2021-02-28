# Js 的事件循环(Event Loop)机制

## Js是单线程

- js作为主要运行在浏览器的脚本语言，js主要用途之一是操作DOM。

- 如果js同时有两个线程，同时对同一个dom进行操作，这时浏览器不知道应该听哪个线程的，无法判断优先级。

- 所以为了避免这种问题，Js必须是单线程的。

![](https://cdn.jsdelivr.net/gh/Scorpio-li/picture/document/jimi/thread.png)

### 1. GUI 渲染线程（渲染布局）

- 绘制页面，解析 HTML、CSS，构建 DOM 树，布局和绘制等

- 页面重绘和回流

- 与 JS 引擎线程互斥，也就是所谓的 JS 执行阻塞页面更新

### 2. JS 引擎线程（解析执行js）

- 负责 JS 脚本代码的执行

- 负责准执行准备好待执行的事件，即定时器计数结束，或异步请求成功并正确返回的事件

- 与 GUI 渲染线程互斥，执行时间过长将阻塞页面的渲染

### 3. 事件触发线程

- 负责将准备好的事件交给 JS 引擎线程执行

- 多个事件加入任务队列的时候需要排队等待(JS 的单线程)

### 4. 定时器触发线程

- 负责执行异步的定时器类的事件，如 setTimeout、setInterval

- 定时器到时间之后把注册的回调加到任务队列的队尾

### 5. HTTP 请求线程

- 负责执行异步请求

- 主线程执行代码遇到异步请求的时候会把函数交给该线程处理，当监听到状态变更事件，如果有回调函数，该线程会把回调函数加入到任务队列


## 执行栈

- 当执行某个函数、用户点击一次鼠标，Ajax完成，一个图片加载完成等事件发生时，只要指定过回调函数，这些事件发生时就会进入执行栈队列中，等待主线程读取,遵循先进先出原则。

## 主线程

- 主线程规定现在执行执行栈中的哪个事件。

- 主线程循环：即主线程会不停的从执行栈中读取事件，会执行完所有栈中的同步代码。

- 当遇到一个异步事件后，并不会一直等待异步事件返回结果，而是会将这个事件挂在与执行栈不同的队列中，我们称之为==任务队列(Task Queue)==。

## 任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

JavaScript语言的设计者意识到，主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。

- 同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

- 异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。浏览器本身存在一个监听的进程，当主线程执行完毕，他就会去通知异步任务队列，拿一个异步任务到主线程执行。

## js 异步执行的运行机制

1. 所有任务都在主线程上执行，形成一个执行栈。

2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。那些对应的异步任务，结束等待状态，进入执行栈并开始执行。

4. 主线程不断重复上面的第三步。


## 宏任务与微任务

- 异步任务分为 宏任务（macrotask） 与 微任务 (microtask)，不同的API注册的任务会依次进入自身对应的队列中，然后等待 Event Loop 将它们依次压入执行栈中执行。

### 宏任务(macrotask)：

- script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)

### 微任务(microtask)：

- Promise

- MutaionObserver

- process.nextTick(Node.js环境）

- Async/Await

## Event Loop(事件循环)：

- Event Loop(事件循环)中，每一次循环称为 tick, 每一次tick的任务如下：

    1. 执行栈选择最先进入队列的宏任务(通常是script整体代码)，如果有则执行
    
    2. 检查是否存在 Microtask，如果存在则不停的执行，直至清空 microtask 队列
    
    3. 更新render(每一次事件循环，浏览器都可能会去更新渲染)
    
    4. 重复以上步骤

![image](https://user-gold-cdn.xitu.io/2018/6/16/164081cfd8400f92?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```js
botton.addEventListener('click', () => {
    Promise.resolve().then(() => {
        console.log('microtask 1');
    });
    console.log('listener 1'); 
});
botton.addEventListener('click', () => {
    Promise.resolve().then(() => {
        console.log('microtask 2');
    });
    console.log('listener 2'); 
});
```

```js
botton.addEventListener('click', () => {
    Promise.resolve().then(() => {
        console.log('microtask 1');
    });
    console.log('listener 1'); 
});
botton.addEventListener('click', () => {
    Promise.resolve().then(() => {
        console.log('microtask 2');
    });
    console.log('listener 2'); 
});
button.click();
```

- 第一种情况下，浏览器并不知道会有几个listener，会一个一个执行，当前执行完成之后，在看看后面还没有其他的listener，当第一个listener执行完成之后，主任务为空了，执行异步任务输出microtask 1。再执行第二个listener。

- 第二种情况，使用button.click，浏览器会把click手机到事件队列中，依次同步执行。当同步执行完成之后，再执行异步任务。









