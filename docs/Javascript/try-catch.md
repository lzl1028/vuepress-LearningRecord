# try..catch简介

在 JS 中处理错误，我们主要使用try、catch、finally和throw关键字。

- try块包含我们需要检查的代码

- 关键字throw用于抛出自定义错误

- catch块处理捕获的错误

- finally 块是最终结果无论如何，都会执行的一个块，可以在这个块里面做一些需要善后的事情

建议：

1. 每个try块必须与至少一个catch或finally块，否则会抛出SyntaxError错误。

2. 建议将try与catch块一起使用，它可以优雅地处理try块抛出的错误。

3. try..catch 无法捕获无效的 JS 代码，例如try块中的以下代码在语法上是错误的，但它不会被catch块捕获。

```js
try {
  ~!$%^&*
} catch(err) {
  console.log("这里不会被执行");
}
```

4. try..catch无法捕获在异步代码中引发的异常，例如setTimeout：

```js
try {
  setTimeout(function() {
    noSuchVariable;   // undefined variable
  }, 1000);
} catch (err) {
  console.log("这里不会被执行");
}
```