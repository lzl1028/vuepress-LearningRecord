# 前端开发中的常见错误

## 定义

首先，我们要知道的关于Error的内容如下：

1. Error对象是JavaScript的一个内置对象，也就是说所有的js引擎都会默认支持这个对象；

2. 当我们以函数的形式去使用Error的时候，Error('xx err') 和 new Error('xx err')得到的结果是一样的，所以你大可以省略掉new关键字(注意这跟String，Number等内置对象是不一样的，后者使用new和不使用new的场景返回的类型是不同的~)；

3. 通过Error的构造器可以创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出；

## 获取浏览器支持的所有Errors对象

这里以chrome为例，打开chrome，在console中复制下面的代码，然后回车拿到结果

```js
Object.getOwnPropertyNames(window).filter(err => err.endsWith ('Error'))
```

得到结果如下：

```js
(13) ["Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "RTCError", "OverconstrainedError", "GeolocationPositionError", "DOMError", "MediaError", "webkitSpeechRecognitionError"]
0: "Error"
1: "EvalError"
2: "RangeError"
3: "ReferenceError"
4: "SyntaxError"
5: "TypeError"
6: "URIError"
7: "RTCError"
8: "OverconstrainedError"
9: "GeolocationPositionError"
10: "DOMError"
11: "MediaError"
12: "webkitSpeechRecognitionError"
length: 13
__proto__: Array(0)
```

### 1. Error

1. Error代表一个js中的错误对象，当运行时候有错误发生，Error的实例对象会被抛出，当然我们也可以利用此对象去构造一些自定义的错误对象。

2. 参数，从caniuse上可以查到，大部分的浏览器都支持了message 和 filename 和lineno(发生错误的代码行数)，所以我们使用的时候可以放心大胆的用~

