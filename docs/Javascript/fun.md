# 撸js基础之函数

## 1. 创建函数

### 函数声明与函数表达式 （Function Declaration & Function Expression）
定义（创建）函数时可以分为
- 函数表达式
- 函数声明

```js
// 函数表达式
var foo = function(...){}
 
// 函数表达式
(function(){...})
 
// 匿名函数表达式
setTimeout(funciton timer(){...},200)
 
// 函数声明
function(){...}
```
- 函数表达式与函数声明的区别：
    1. 区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位置（不仅仅是一行代码， 而是整个声明中的位置）。 如果 function 是声明中的第一个词， 那么就是一个函数声明， 否则就是一个函数表达式。
    
    2. 函数表达式可以是匿名的，而函数声明则不可以省略函数名——在 JavaScript 的语法中这是非法的。
    
    3. 函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处。函数声明会绑定在自身的作用域中，而函数表达式会绑定在表达式自身的函数中，而不是所在作用域中。举个栗子：

### 箭头函数 （Arrow Function）
它与传统的 JavaScript 函数有些许的不同，主要集中在以下几个方面：

- 没有 this、super、arguments 和 new.target 绑定 箭头函数内部的这些值直接取自定义时的外围非箭头函数。
- 不能通过 new 关键字调用 箭头函数没有 Contruct 方法，所以不能被用作构造函数，如果通过 new 关键字调用箭头函数，程序会抛出错误。
- 没有原型 由于不可以通过 new 关键字调用箭头函数，因而没有构建原型的需求，所以箭头函数不存在 prototype 这个属性。
- 不可以改变 this 的绑定 函数内部的 this 值不可被改变，在函数声明周期内始终保持一致。
- 不支持 arguments 对象 箭头函数没有 arguments 绑定，所以你必须通过命名参数和不定参数这两种形式访问函数的参数。

- 不支持重复的命名参数 无论是在严格还是非严格模式下，箭头函数都不支持重复的命名参数；而在传统函数的规定中，只有在严格模式下才不能有重复的命名参数。

**需要注意的是，由于没有 this 的绑定，箭头函数的 this 值不受 call()、apply()、bind() 方法的影响。**

### 构造函数与类 （Constructor & Class）
构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的。按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。

```js
//例如
const arr = new Array(2,3,4)
//Array 就是个构造函数。
```

- 在 ES6 Class 特性出现以前，我们经常使用 构造函数来模拟类的特性。思路基本都是：首先创建一个构造函数，然后定义另一个方法并复制给构造函数的原型。

```js
function Person(name) {
    this.name = name
}
Person.prototype.sayName = function() {
    console.log(this.name)
}
 
const person = new Person('Tumars')
person.sayName()  // "Tumars"
 
console.log(person instance Person)  // true
console.log(person instance Object) // true
```
- 上面代码中 Person 是一个构造函数，其执行后创建了一个名为 name 的属性；给 Person 的原型添加一个 sayName() 方法，所以 Person 对象的所有实例都会共享这个方法。由于存在原型继承的特性，person 对象是 Person 的实例，也是 Object 的实例。

- 注意，intanceof 经常被用来检测实例与构造函数之间的关系，但实际上这里 intanceof 回答的问题是：在 person 的整条 [[ProtoType]] 链中是否有指向 Person.prototype 和 Object.prototype 的对象。
当我们对一个函数使用 new 调用时，实际是生成一个对象，并把这个对象内部的 [[ProtoType]] 链关联到构造函数的 prototype 属性上，同时将函数的 this 绑定到该对象。 

- ES6 中的类是对构造函数写法的一种语法糖，它简化了构造函数的写法。我们使用 class 来复写上一段示例：

```js
class PersonCLass {
    constructor(name) {
        this.name = name
    }
 
    // 等价于 Person.prototype.sayName()
    sayName() {
        console.log(this.name)
    }
}
 
const person = new Person('Tumars')
person.sayName()  // "Tumars"
 
console.log(person instance PersonClass)  // true
console.log(person instance Object) // true
```
- **类属性不可被赋予新值，在这个示例中，PersonClass.prototype 就是这样一个只可读的类属性，而 Person.prototype 则可读可写。**


## 2. 属性

###length

- length 属性表示函数希望接收的命名参数的个数。如：

 

```js
function sum (n1, n2) {
    return n1 + n2
}
console.log(sum.length) // 2
```

- 需要注意的是，length 统计的是函数命名参数的数量，不定参数的加入不会影响 length 属性的值。例如：

 

```js
function sum (n1, n2, ...rest) {
    return n1 + n2 + rest.reduce((prev, next)=> prev + next)
}
console.log(sum.length) // 2
```


- 这里加入 不定参数 …rest 后，length 属性的值仍然是 2。


### name

- name 属性返回函数实例的名称。例如：

```js
function foo () {}
bar = function(){}
 
console.log(foo.name) // foo
console.log(bar.name) // bar
```


- 这段代码中，foo() 函数的name属性值为“foo”，对应着声明时的函数名称；匿名函数表达式 bar() 的 name 属性值是“bar”，对应着被赋值为该匿名函数的变量的名称。

    1. Function.bind() 所创建的函数将会在函数的名称前加上”bound “:

    ```js
    function foo() {}; 
        foo.bind({}).name; // "bound foo"
    ```
    
    2. 当通过 get 和 set 访问器来存取属性时, “get” 或 “set” 会出现在函数名称前:
    ```js
        var o = { 
            get foo(){}, 
            set foo(x){} 
        }; 
        var descriptor = Object.getOwnPropertyDescriptor(o, "foo"); 
        descriptor.get.name; // "get foo" 
        descriptor.set.name; // "set foo";
    ```
    
    3. 如果 Symbol 被用于函数名称，并且这个 symbol 具有相应的描述符，那么方法的名字就是方括号中的描述符。
    ```js
    var sym1 = Symbol("foo"); 
    var sym2 = Symbol(); 
    var o = { 
        [sym1]: function(){}, 
        [sym2]: function(){} 
    }; 
     
    o[sym1].name; // "[foo]"
    o[sym2].name; // ""
    ```

 

- 切记，函数的 name 属性值不一定引用同名变量，它只是协助调试用的额外信息，所以不能使用 name 属性的值来获取对于函数的引用。


### prototype

- Function.prototype属性存储了Function的原型对象。一般用来给Function实例添加公共方法和属性。

1. 元属性 new.target

    - 元属性是指非对象的属性，其可以提供非对象目标的补充信息（例如 new）。 

- 为了解决判断函数是否通过 new 关键字调用的问题，ECMAScript6 引入了 new.target 这个元属性。当调用函数的 [[Construct]] 方法时，new.target 返回一个指向构造方法或函数的引用；如果调用 [[Call]] 方法，则 new.target 的值为 undefined。

- 有了这个元属性，可以通过检测 new.target 是否被定义过来安全地检测一个函数是否是通过 new 关键字调用的：

 

```js
function Person(name) {
    if(typeof new.target !== "undefined") {
        this.name = name
    } else {
        throw new Error("必须通过 new 关键字来调用 Person")
    }
}

const person = new Person("Tumars")
const notPerson1 = Person("Tumars")  // Uncaught Error: 必须通过 new 关键字来调用 Person
const notPerson2 = Person.call(person, "Tumars") // Uncaught Error: 必须通过 new 关键字来调用 Person
``` 

- 也可以检查 new.target 是否被某个特定的构造函数所调用：

 

```js
function Person(name) {
    if(new.target === Person) {
        this.name = name
    } else {
        throw new Error("必须通过 new Person() 生成该实例")
    }
}
function AnotherPerson(name) {
    Person.call(this, name);
}
var person = new Person("Tumars");
var anotherPerson = new AnotherPerson("Tumars");  // error!
```

- 在这段代码中，如果要让程序正确运行，new.target 一定要指向 Person，否则就会抛出错误。





## 函数
- 函数声明、函数表达式、匿名函数

    - 函数声明：function fnName () {…};
    使用function关键字声明一个函数，再指定一个函数名，叫函数声明。
    
    - 函数表达式 var fnName = function (){…};
    使用function关键字声明一个函数，但未给函数命名，最后将匿名函数赋予一个变量，叫函数表达式，这是最常见的函数表达式语法形式。
    
    - 匿名函数：function () {};
    使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数，匿名函数属于函数表达式，匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等等。

函数声明和函数表达式不同之处在于：

一、Javascript引擎在解析javascript代码时会‘函数声明升’（Function declaration Hoisting）当前执行环境（作用域）上的函数声明，而函数表达式必须等到Javascirtp引擎执行到它所在行时，才会从上而下一行一行地解析函数表达式；

二、函数表达式后面可以加括号立即调用该函数，函数声明不可以，只能以fnName()形式调用 。以下是两者差别的两个例子。
```
nName();
function fnName(){
    ...
}
//正常，因为‘提升'了函数声明，函数调用可在函数声明之前

fnName();
var fnName=function(){
    ...
}
//报错，变量fnName还未保存对函数的引用，函数调用必须在函数表达式之后
```
- 回头看看( function(){…} )()和( function (){…} () )这两种立即执行函数的写法，最初我以为是一个括号包裹匿名函数，并后面加个括号立即调用函数，当时不知道为什么要加括号，后来明白，要在函数体后面加括号就能立即调用，则这个函数必须是函数表达式，不能是函数声明。













