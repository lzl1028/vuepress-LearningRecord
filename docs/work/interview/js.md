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

## 2. 函数问题

```js
function Foo () {
 getName = function () { alert(1) }
 return this
 }
 Foo.getName = function () { alert(2) }
 
 Foo.prototype.getName = function () { alert(3) }
 var getName = function () { alert(4) }
 function getName () { alert(5) }
 Foo.getName();
 getName();
 Foo().getName();
 getName();
 new Foo.getName();
 new Foo().getName();
 new new Foo().getName();

// 答案
 Foo.getName(); //2
 getName(); //4
 Foo().getName(); //1
 getName();//1
 new Foo.getName(); //2
 new Foo().getName(); //3
 new new Foo().getName(); //3
```
- 此题涉及的知识点众多，包括变量定义提升、this指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级等等

### 1. 第一问

- 解析
    1. 首先定义了一个叫Foo的函数
    
    2. 之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数
    
    3. 之后为Foo的原型对象新创建了一个叫getName的匿名函数。
    
    4. 之后又通过函数变量表达式创建了一个getName的函数
    
    5. 最后再声明一个叫getName函数。

- 第一问的 Foo.getName 自然是访问Foo函数上存储的静态属性，自然是2

### 2. 第二问

- 直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以跟1 2 3都没什么关系。此处有两个坑，一是变量声明提升，二是函数表达式。

- 变量声明提升：即所有声明变量或声明函数都会被提升到当前函数的顶部。
    注意：
    1. 初始化不会提升。
    2. 函数提升优先级高于变量提升，且不会被变量声明覆盖，但是会被变量赋值之后覆盖
    
- 例如下代码：

```js
console.log(x);//输出：function x(){}
var x=1;
function x(){}
```
- 实际执行的代码为，先将 var x=1 拆分为 var x; 和 x = 1; 两行，再将 var x;(变量声明提升) 和 function x(){}（函数提升优先级高于变量提升） 两行提升至最上方变成：

```js
function x(){}
var x;//仅仅是声明不会覆盖！所以后面还是fun
console.log(x);//输出
x=1
```
- 所以最终函数声明的x覆盖了变量声明的x，log输出为x函数。

```js
function Foo() {
 getName = function () { alert (1); };
 return this;
}
function getName() { alert (5);}//提升函数声明，覆盖var的声明
var getName;//只提升变量声明
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
getName = function () { alert (4);};//最终的赋值再次覆盖function getName声明
getName();//最终输出4
```

### 3. 第三问

- 第三问的 Foo().getName(); 先执行了Foo函数，然后调用Foo函数的返回值对象的getName属性函数。

- Foo函数的第一句 getName = function () { alert (1); }; 是一句函数赋值语句，注意它没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有。再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是第二问中的alert(4)函数，将此变量的值赋值为 function(){alert(1)}。

- 此处实际上是将外层作用域内的getName函数修改了。

- **注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量。**

- 遂Foo函数返回的是this(window对象)，相当于执行 window.getName() ，而window中的getName已经被修改为alert(1)，所以最终会输出1

### 4. 第四问

- 直接调用getName函数，相当于 window.getName() ，因为这个变量已经被Foo函数执行时修改了，遂结果与第三问相同，为1

### 5. 第五问

- 第五问 new Foo.getName(); ,此处考察的是js的运算符优先级问题。
 
- 通过查文档可以得知点（.）的优先级高于new（无参数列表）操作，遂相当于是: **new (Foo.getName)();**

- 所以实际上将getName函数作为了构造函数来执行，遂弹出2。

### 6. 第六问

- 第六问 new Foo().getName() ，比较的是 new(有参数)、成员访问、执行函数()的优先级，这几个是同级的，从左到右依次执行，就是((new Foo()).getName)()，遂先执行Foo函数，而Foo此时作为构造函数却有返回值，所以这里需要说明下什么是**new(有参数列表)和js中的构造函数返回值问题。**

- new(有参数列表)
    1. new(有参数列表)，例如：new abc()或者new abc(...arg)
    2. new(无参数列表)，例如：new abc

- 构造函数的返回值：在传统语言中，构造函数不应该有返回值，实际执行的返回值就是此构造函数的实例化对象。而在js中构造函数可以有返回值也可以没有。
    - 1、没有返回值则按照其他语言一样返回实例化对象。
    ```js
    function F() {} // undefined
    new F() // F {}
    ```
    - 2、若有返回值则检查其返回值是否为引用类型。如果是非引用类型，如基本类型（string,number,boolean,null,undefined）则与无返回值相同，实际返回其实例化对象。
    ```js
    function F() {return true;} // undefined
    new F() // F {}
    ```
    
    - 3、若返回值是引用类型，则实际返回值为这个引用类型。
    ```js
    function F() {return {a: 1}} // undefined
    new F() // Object{a: 1}
    ```
- 原题中，返回的是this，而this在构造函数中本来就代表当前实例化对象，遂最终Foo函数返回实例化对象。

- 之后调用实例化对象的getName函数，因为在Foo构造函数中没有为实例化对象添加任何属性，遂到当前对象的原型对象（prototype）中寻找getName，找到了。

### 7. 第七问

- 第七问, new new Foo().getName(); 同样是运算符优先级问题。最终实际执行为：new ((new Foo()).getName)();

- 先初始化Foo的实例化对象，然后将其原型上的getName函数作为构造函数再次new。