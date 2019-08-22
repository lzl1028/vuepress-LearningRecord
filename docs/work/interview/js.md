# JavaScript

## 1. 类型及其转换
- JavaScript 内置了7种类型：==null==, ==undefined== , ==boolean==, ==number==, ==string==, ==object以及== ==symbol== (ES6).
    1. 原始类型（基本类型）：按值访问，可以操作保存在变量中实际的值。原始类型汇总中null和undefined比较特殊。
    2. 引用类型：引用类型的值是保存在内存中的对象。
    3. 与其他语言不同的是，JavaScript不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。所以引用类型的值是按引用访问的。

- 除了 object 以外，这几种类型都可以归类为原始类型。

- Undefined 表示尚未定义。它被用作表示未初始化变量，未提供的函数参数，对象缺少的属性的默认值。当函数没有返回值时也会默认返回 undefined .

- Null 则表示空值。它可以被赋值给一个变量来表示的“没有值”。

- 隐式类型转换:
    - Falsy 类型的值是指在强制类型转换时会被转换为布尔 false 的值。包括："", 0, null, undefined, NaN, false.
    - 除了 Falsy 类型值以外的都被称为 truthy 类型值，它们会被转换为 true.空的数组，对象和函数布尔值也会被转换为 true ！

- String & Number 运算
    - 你需要注意的第一件事是 + 操作符。这是一个棘手的操作符，因为它同时适用于数值运算和字符串连接。

    - 但是，*，/和-操作符都是数字运算专用的。当这些运算符与字符串一起使用时，会强制转换字符串为数字类型的值。
    
- == 与 ===
    - 事实上，== 是比较强制类型转换之后的结果，而 === 则是直接比较。

- 基本类型中的number,string和boolean都有对应的包装类型。

```js
var str = "string";//string
var strObj = new String("string");//String {0:"s",1:'t'···}

```
把一个基本类型尝试用对象的方式使用它的时候，比如访问length属性，或者增加一些属性的操作时，javascript会把这些基本类型转化为对应的包装类型对象。完成这样一个访问比如a.length返回以后或者a.t设置了以后，这个临时对象会被销毁掉。所以a.t赋值3了以后，再去输出a.t值是undefined。

str，number和true都有包装类型，所以可以把数字用括号括起来调用toString()方法

```js
(123).toString();==='123'

```
---