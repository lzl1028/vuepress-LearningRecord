# Promise

## 一、 Promise概念

- Promise是一个包含三种状态的对象（pending、fulfilled、rejected），可以链式的处理异步请求（then方法）并能很好地处理异常问题， 是解决回调地狱的良好方案之一。 

- Promise 中文翻译为“承诺”， 是 JavaScript 的一种对象，表示承诺终将返回一个结果，无论成功还是失败。

- Promise 有三个状态：等待中（pending），完成（fullfilled），失败（rejected）, Promise 的设计具有原子性，状态一旦从 pending 状态转换为 fullfilled 状态或者 rejected 状态后，将不能被改变。

![image](https://user-gold-cdn.xitu.io/2019/2/24/1691e84dc7850464?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
var promise1 = new Promise((resolve, reject) => {
    console.log("Promise 构造器会立即执行");
    setTimeout(function (){
        if(true) {
            resolve("完成");
        } else {
            reject("失败");
        }
    }, 1000);
})
promise1
.then((result) => {
    // do something
    console.log(result);
    return 1
    
    // return Promise.resolve(1);  // 返回一个决议为成功的 promise 实例
    // return Promise.reject("error");  // 返回一个决议为拒绝的 Promise 实例
})
.then((result) => {
    // .then() 方法会返回一个 promise, 完成调用的参数为前一个 promise 的返回值或者决议值。
    // do other things
    console.log(result);
    throw new Error("错误")  // 抛出错误是隐式拒绝
})
.catch((error) => {
    // 捕捉错误
    console.log(error)
})
.then(() => {
    // 还能继续执行！
})
.finally(() => {
    // always do somethings
    console.log("finally!")
})

```

## 二、Promise 的优势

1. 链式调用
    - Promise 使用 then 方法后还会返回一个新的 Promise 对象，便于我们传递状态数据，同时链式写法接近于同步写法，更符合线性思维。

2. 错误捕捉
    - 相比回调函数的错误无法在外部捕捉的问题，Promise 能够为一连串的异步调用提供错误处理。

3. 控制反转再反转
    - 由于第三方提供的异步函数，无法保证回调函数如何被执行，但是 Promise 的特点，能够保证异步函数只能被 resolve 一次，以及始终以异步的形式执行代码。

4. 可以利用 Promise.all 和 Promise.race 来解决 Promise 始终未决议和并行 Promise 嵌套的问题

## 三、Promise 的不足

- 每个 .then() 都是一个独立的作用域
    - 加入有很多个 .then() 方法，就会创建很多个独立的作用域，那么将只能通过外面包裹一层函数作用域的闭包来共享状态数据

- 无法取消单个 .then()
    - 当 Promise 链中任意一个 .then() 方法中有语句执行错误后，尽管经过 catch 方法的错误处理，还是并不会中断整个 Promise 链的执行。

- 无法得知进度
    - 由于 Promise 只能从 pending 到 fullfilled 或 rejected 状态，无法得知 pending 阶段的进度。

