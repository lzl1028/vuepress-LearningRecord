# 面试题

- 一面是两个帅哥，介绍了一下自己就开始轮流发问了

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

- 从输入URL到页面展示发生了什么

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



