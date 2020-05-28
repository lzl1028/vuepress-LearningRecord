# 面试题

- es6语法用过哪些

- 基本数据类型

- let var区别

- 什么是闭包

- 闭包的同级变量和子级变量能否获取到

- this是什么

- 作用域有哪些

- 什么是块级作用域

- 如何在当前js中使用其他js

- 变量如何给数组添加新的方法？（考察原型、继承）

- 双等三等区别如何判断两个数组是否相等，是用双等还是三等？（是个坑，双等三等都不行）

- undefined和null区别

- 0.1+0.2在三等情况下是否等于0.3

- staic和assets有什么区别

- jQuery属性选择器如何拿到第三个input节点

- React生命周期，每个阶段做了什么

- docker用了哪些容器

- docker除容器外哪部分是抽离出来的

- ES6 继承方式有哪些

- 类有哪些东西可以被继承？

- 一个类中，static 普通方法 箭头函数重名时，会调用哪个？

- 箭头函数有哪些特性

- Scss如何复用变量

- scss中的@和％有什么区别

- 上传文件断点续传怎么做

- css兼容性有哪几种处理方案，

- css3新属性有哪些

- 怎么理解margin越界的问题

- js的继承方式有哪些

- 深拷贝怎么实现

- js的事件轮训机制有了解吗

- 说说call,apply,bind

- 聊聊es6的promise

- 为什么要用async，await

- vue生命周期

- vue双向数据绑定原理

- vue的异步更新，以及nexttick

- vue路由有哪几种方式，是如何实现的,以及注意事项

- vuex的使用，及其原理

- http与https的区别

- url输入到页面显示全过程

- redux的原理

- 项目中遇到过什么问题

- 有没有封装过组件，插件

- webpack怎么进行打包的

- 项目中是怎么优化的

- xss怎么处理的

- 基本上就这么多技术性的的问题，你们觉得难吗（是不是很简单，大佬见了都不信哈哈，），答案我就不写了，

- 然后就开始问我是如何管理前端组的

- 任务是如何分配

- 项目是怎么样协同开发的

- 如何兼顾产品经理和前端负责人的工作以及时间安排

- vuex包括哪些内容

- vue项目优化

- computed和watch区别

- vue-router钩子介绍

- vue-router懒加载实现

- 用过的组件库有哪些

- MVVM如何实现

- diff算法理解

- v-if v-show区别

- 单页面多页面区别

- computed、watch区别

- location.href和vue-router跳转有什么区别

- 生命周期mount阶段做来什么

- 项目中有多个环境怎么处理

- v-once是做什么的

- 路由懒加载如何实现

- 图片懒加载原理是什么

- Vue 项目比起传统项目有什么优势

- vue如何实现自定义指令呢

- Vue项目中状态判断如何处理 ，比如在某个页面我需要判断用户是否是登录状态？

- 解释下什么是动态规划？ 它的应用场景，项目中有没有用到

- 我们假如要做抽奖活动，保证绝对的公平，把人名放在数组中，怎么去做

- MVC与MVVM分别介绍下

- MVC的数据流向是怎样的「双向流动」怎么解释双向流动？

- 解释下数据双向绑定

- 三个框架中有哪些是双向绑定的「vue angular」

- Angular是如何实现双向绑定的？「脏值检查」

- 你觉得react和vue有什么区别？「vue有很多内置指令，模板语法，react是一切皆组件」

- 如果我一直写vue，现在上手react，难点在哪？「es6语法，jsx模板语法」

- Url输入到页面显示经历了什么？「导航阶段 dns解析 tcp连接 TLS验证 发起请求 接收响应 连接中断。解析阶段 html js css分开解析，html解析为dom对象，拆分标签 text，js由v8引擎处理，css被解析为cssom 层树，光栅化」

- DNS是如何解析的？怎么拿到地址的

- DNS解析耗时吗？「耗时的，因为要查看是否有缓存」如何优化？（没答出来，被告知可以看看dns预解析）

- 你说到v8引擎，说下v8引擎如何解析一段js代码？「先转成AST树，再转成机器码，最后转为字节码，执行字节码。浏览器对重复的js代码有优化 即时编译技术，如果发现一段代码经常使用，则不用转字节码 直接执行机器码」

- Tcp连接过程解释下「就是常说的三次握手 第一次是客户端发起请求 第二次服务端作出应答 第三次客户端收到应答 知道服务器是通的告诉服务端要请求数据了」

- 了解事件循环吗

- 提供事件的队列是哪来的？

- 继续事件循环。 你说的宏任务微任务解释下

- 哪些被定义为宏任务，哪些被定义为微任务

- Promise是属于微任务吗？「不 promise.then属于微任务」

- 说下http请求方式「get post option还有restful中的put delete」

- Get post区别

- 说下restful规范

- 跨域如何解决？「jsonp iframe proxy nginx反向代理 websocket，后端配置响应头」 还有吗？「在本地开发时，有用chorme插件来关闭csrf检测解决跨域」说下iframe怎么跨域的？（网上看到的 说不清楚）proxy跨域的原理是什么？（这个确实不知道，被告知是webpack中的devsever配置后，node相当于启动了服务器，浏览器请求服务器相当于请求本地服务。）

- 小程序有做过吗？你见过小程序跨域吗？「没有」那意思就是跨域只在浏览器出现，那么 proxy解决跨域的原理就是启动了node服务器，转发其他端口的服务到本地，这样就不会跨域了。

- Webpack有用过吗？做过哪些配置？「不同环境的配置，devserver」有哪些优化措施？「tree shaking，路由懒加载，代码分割」

- 有做过哪些性能优化措施？「资源文件加载，代码压缩 雪碧图，cdn资源服务器」

- 既然webpack用过，那图片文件打包时转为base64，你觉得打包以后体积大了还是小了？「小了」其实打包以后图片体积大了30% 「那为什么还要打包？」因为当你图片特别多的时候 svg 等等图标特别多，每次请求src是不是都要请求网络，那请求网络是不是占用资源。 所以加载base64能减少请求次数

- Nodejs有没有接触过？「简历里那个公众号项目就是node做的」原生node吗？「koa做的」你介绍下koa「基于express的一个node框架，本质非常简单，把其他应用都作为中间件外包出去，核心是洋葱圈模型」  koa是基于express的？「嗯 是的」

- 说说洋葱圈模型「类似于柯里化，内层中间件返回的值作为外层中间件的参数」

- 说说柯里化「参数分开与放在一个括号里的结果相同」怎么实现呢？「可以拦截它的get方法和apply方法来实现」

- 有自己写过中间件吗？「没有，都用的别人的」node服务在线上跑的时候，报错了怎么查看控制台结果「错误统一捕获，在全局处理，放到日志中，查看日志」 日志用的是什么库？「koa-logger」

- node服务怎么让它后台启动的？「supervisor配置，然后开启进程」

- Webpack打包时间过久？打包文件过大怎么解决「第二个问题 代码拆分，把类似于vue这种几乎不变的框架放到cdn缓存，其他的文件模块化拆分，组件库按需加载，第一个问题打包时间过久虽然经常有遇到过，但也没办法解决。不过我了解到最近vue3有新动作，弃用webpack，改用新框架，主要解决开发环境打包过久的问题」

- 在网络请求中如何把大文件资源压缩传输？（没答上来）你知道GZip格式吗？「嗯 知道，在nginx配置时有设置过gzip压缩」

- 你简历写的oss大文件上传能具体说下吗

- 你在团队中是什么角色？你提到的规范是指？或者你从哪看到的相关规范？「vue官方文档写的已经很清楚了，推荐优化策略和规范」

- Vue生命周期

- 说下具体每个阶段做了什么事

- Vuex单向数据流解释下

- app有做过吗？

- Pc是如何适配移动端的

- 混合开发有做过吗

## 1. 操作计算题

### ['1','2','3'].map(parseInt)

- 答案：[1,NaN,NaN]

- 解析：
    - map的参数：
        1. currentValue
        callback 数组中正在处理的当前元素。
        
        2. **index可选 ** 看到这里先注意起来这个参数，思考一下
        callback 数组中正在处理的当前元素的索引。
        
        3. array可选
        callback  map 方法被调用的数组。
    - parseInt参数：
        - ![parseInt](https://user-gold-cdn.xitu.io/2019/2/22/1691435685020630?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
        - string: 必须，要被解析的字符串
        - radix：可选。表示要解析的数字的基数。

- 实际调用情况：

```js
parseInt('1',0,theArray);
parseInt('2',1,theArray);
parseInt('3',2,theArray);
```
- 第一次，当我我们第一次调用的时候 是这样的：parseInt('1',0) 这个是没问题的 转十进制的 看我红框的图片
返回 1

- 第二次，调用第二个index参数是1,也是说1作为数值的基础。规范里说的很清楚了，如果基础是非0或者小于2，函数都不会查询字符串直接返回NaN。

- 第三次，2作为基数。这就意味着字符串将被解析成字节数，也就是仅仅包含数值0和1。parseInt的规范第十一步指出，它仅尝试分析第一个字符的左侧，这个字符还不是要求基数的有效数字。这个字符串的第一个字符是“3”，它并不是基础基数2的一个有效数字。所以这个子字符串将被解析为空。第十二步说了：如果子字符串被解析成空了，函数将返回为NaN。

- 解决：

```js
['1','2','3'].map(function(value){
        return parseInt(value)
})
// <!--或-->
['1','2','3'].map(Number)
```

## 2. JavaScript块级作用域的默认变量和声明函数

```js
{
  a = 10;
  function a(){};
  console.log(a)//10
};
console.log(a);//10
```

### 块级作用域的默认变量

```js
console.log(window.a, a);//undefined, ReferenceError: a is not defined
{
  console.log(window.a,a);//undefined  、a is not defined
    a = 10;
    console.log(window.a,a)//10 10
}
console.log(window.a,a);//10 10
```
我们可以清晰的看到，在块级作用域中默认声明的变量，只有执行了声明代码，变量才会被挂载到全局作用域上。

```js
console.log(window.a,a);//undefined  undefined
{
  console.log(window.a,a);//undefined  、undefined
    var a = 10;
    console.log(window.a,a)//10 10
}
console.log(window.a,a);//10 10
```
对比上一个例子，我们可以得出，使用var声明的变量会在编译阶段被提升到全局作用域上，不过它只是将声明提升，赋值操作并未提升上去。

### 小结

- 在块级作用域中默认声明的变量，只有代码执行到声明语句之后，才可以进行访问，否则会报错。

- 块级作用域中默认声明的变量会被提升到全局作用域。

### 块级作用域的函数声明

块级作用域函数，就像预先在全局作用域中使用var声明了一个变量，且默认值为undefined。

```js
console.log(window.a,a);//undefined undefined
{
  console.log(window.a,a);//undefined function a(){}
  function a(){};
  console.log(window.a,a)//function a(){} function a(){}
}
console.log(window.a,a);//function a(){} function a(){}
```
- 至于第二行window.a=undefoned，而a=function a(){} ，上面在阮一峰老师的文章中说过，声明函数a会被提升到全局作用域，且在其块级作用域中，也会被提升到顶层。而window.a为什么会为undefined呢？因为只有window.a只有等块级作用域中函数声明的定义的那行代码执行过之后，才会被映射到全局作用域。

### 小结：

- 块级作用域函数在编译阶段将函数声明提升到全局作用域，并且会在全局声明一个变量，值为undefined。同时，也会被提升到对应的块级作用域顶层。

- 块级作用域函数只有定义声明函数的那行代码执行过后，才会被映射到全局作用域。

### 块级作用域中有同名的变量和函数声明

```js
console.log(window.a,a);//undefined undefined
{
    console.log(window.a,a);//undefined function a(){}
    function a() {};
    a = 10;
    console.log(window.a,a); //function a(){}  10
};
console.log(window.a,a); //function a(){}  function a(){}
```

首先，块级作用域函数a的声明会被提升到全局作用域，第一行打印比较符合预期。然后在块级作用域中，由于声明函数a提升到块级作用域顶端，所以打印a = function a(){}，而window.a由于并没有执行函数定义的那一行代码，所以仍然为undefined。当执行到声明函数定义的时候，就会把函数a映射到全局作用域中。当执行a = 10的时候，JS引擎会进行LHS查找，此时，声明函数已经被同时提升到全局作用域和块级作用域顶端了，由于遮蔽效果，此时查找a只会找到块级作用域内的a，并不会找到全局作用域的a，这时，a已经被定义，a = 10只会执行赋值操作，并不会进行提升。

```js
console.log(window.a,a);//undefined undefined
{
    console.log(window.a,a);//undefined function a(){}
       a = 10;
    function a() {};
    console.log(window.a,a); //10  10
};
console.log(window.a,a); //10 10
```

我们直接进行下一步，执行a = 10，我们知道，此时，在块级作用域中函数声明已经被提升到顶层，那么此时执行a，就是相当于赋值，将函数声明a赋值为数字a，可以理解吗？如果有疑问，可以看🌰1。然后，执行到函数声明语句，此时，虽然这一行代码是函数声明语句，但是a，已经为数字10了，所以，执行function a(){}之后，a的值10就会被赋值给全局作用域上的a，所以下面打印的window.a,a都为10！！！

### 小结

- 块级作用域函数只有执行函数声明语句的时候，才会重写对应的全局作用域上的同名变量。



