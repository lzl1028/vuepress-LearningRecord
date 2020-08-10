# JS继承

## 构造函数实现继承

```js
function fun() {
  this.name = 'fun'
}
fun.prototype.myLog = function() { console.log(1) }
 
function obj() {
  fun.call(this)
  this.type = 'child'
}
var O = new obj
console.log(O.myLog)   // undefined
```
- 原理： 通过call实现的继承本质是改变了this指向，让父类里面的this指到子类的上下文，这样在父类里面通过this设置的属性或者方法会被写到子类上面。

- 缺点：只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法。

## 通过原型链实现继承

```js
function fun() {
  this.name = 'fun'
  this.arr = [1, 2, 3]
}
fun.prototype.myLog = function() { console.log(1) }

function obj(type) {
  this.type = type
}
obj.prototype = new fun()

var O1 = new obj('o1')
var O2 = new obj('o2')

O1.name = 'is O1'
O1.arr.push('123')

console.log(O1.myLog) // 可以继承原型上的属性和方法
console.log(O2.name)  // fun
console.log(O2.arr)   // [1, 2, 3, '123']
```

- 原理：利用原型链向上查找的机制实现继承，给 obj.prototype 赋值为父类的一个实例，当把obj作为构造函数在它的实例O1上查找属性时查找顺序依次是 O1本身 -> obj.prototype（fun实例）-> fun.prototype 这样既能继承父类构造函数上的属性。也能继承父类原型上的属性。 

- 缺点：因为 O1.proto === O2.proto  所以当改变父类构造函数上的属性时O1和O2会相互影响，例子中当改变 O1.arr 时 O2.arr 也跟着变了就是这个原因，而 O1.name 变了 O2.name 没变是因为当设置值时会优先在 O1 自身上查找没有发现 name 属性会在 O1 自身上设置 name 值，这个时候根本没有影响到 proto 上的name。O1 和 O2 上的值不管是自身构造函数上的还是父类构造函数的都应该独立维护相互影响是我们不希望看到的。



## 构造函数+原型链 实现继承

```js
function fun() {
  this.name = 'fun'
  this.arr = [1, 2, 3]
}
fun.prototype.myLog = function() { console.log(1) }

function obj () {
  fun.call(this)
  this.type = 'obj'
}
obj.prototype = new fun()

var O1 = new obj()
var O2 = new obj()
O1.arr.push('123')

console.log(O1.arr)  // [1, 2, 3, '123']
console.log(O2.arr)  // [1, 2, 3]
```

- 原理：通过fun.call(this)改变上下文this指向，父类构造函数上的属性和方法设置到了子类上，相互独立避免影响；通过 obj.prototype = new fun() 实现了继承父类原型上的属性和方法。

- 缺点：这种方法实现继承，父类构造函数会被执行两次分别在 fun.call(this) 和 obj.prototype = new fun()，而且父类构造函数上的属性在子类自身和子类的原型上都存在，这导致执行了 delete O1.arr 只是删除了O1自身上的arr属性，O1原型上依然存在，根据原型链向上查找机制O1.arr依然可以访问到。

```js
function fun() {
  this.name = 'fun'
  this.arr = [1, 2, 3]
}
fun.prototype.myLog = function() { console.log(1) }

function obj () {
  fun.call(this)
  this.type = 'obj'
}
obj.prototype = new fun()

var O1 = new obj()
O1.arr.push('123')
console.log(O1.arr) // [1, 2, 3, "123"]
delete O1.arr
console.log(O1.arr) // [1, 2, 3]
```

## 构造函数+原型链 实现继承（优化）

```js
function fun() {
  this.name = 'fun'
  this.arr = [1, 2, 3]
}
fun.prototype.myLog = function() { console.log(1) }

function obj() {
  fun.call(this)
  this.type = 'obj'
}
obj.prototype = fun.prototype  // 把实例改成了引用解决了上诉问题

var O1 = new fun()
var O2 = new obj()

O1 instanceof obj  // true
O2 instanceof obj  // true
(new fun()).__proto__.constructor  // 父类函数
(new obj()).__proto__.constructor  // 父类函数
```

- 原理：这个原理就不讲了，上面看明白了这个道理是一样的。

- 缺点：因为obj.prototype = fun.prototype，导致父类和子类的实例无法做出区分。

## Object.create 实现继承

```js
function fun() {
  this.name = 'fun'
  this.arr = [1, 2, 3]
}
fun.prototype.myLog = function() { console.log(1) }

function obj() {
  fun.call(this)
  this.type = 'obj'
}
obj.prototype = Object.create(fun.prototype)
obj.prototype.constructor = obj

var O1 = new fun()
var O2 = new obj()

O1 instanceof obj  // false
O2 instanceof obj  // true
(new fun()).__proto__.constructor  // 父类函数 fun()
(new obj()).__proto__.constructor  // 子类函数 obj()
```

- 原理：通过create函数创建中间对象，把两个对象区分开，因为通过create创建的对象，原型就是create函数的参数。

- 优点：实现了继承，实现了父子类隔离。

## 同时继承多个对象

```js
function fun1() {
  this.name1 = 'fun1'
  this.arr1 = [1, 2, 3]
}
fun1.prototype.myLog1 = function() { console.log(1) }

function fun2() {
  this.name2 = 'fun2'
  this.arr2 = [11, 22, 33]
}
fun2.prototype.myLog2 = function() { console.log(2) }

function obj() {
  fun1.call(this)
  fun2.call(this)
  this.type = 'obj'
}

obj.prototype = Object.assign(obj.prototype, fun1.prototype, fun2.prototype)
obj.prototype.constructor = obj

var O = new obj()
```

::: tips
Object.assign(target, ...sources)：该方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，它将返回目标对象。
:::

## class

- class 是es6新增的，我们看如何用class来搞一个对象以及实现继承。

class搞一个对象

```js
function Student(name) {
  this.teacher = '王老师'
  this.name = name
}
Student.prototype.hello = function () {
  console.log(`我是${this.name}，我的老师是${this.teacher}。`)
}
var xiaoming = new Student('小明')
var xiaohong = new Student('小红')
```

```js
class Student {
  constructor(name) {  // 构造函数
    this.teacher = '王老师'
    this.name = name
  }
  hello() { // 定义在原型对象上的函数
    console.log(`我是${this.name}，我的老师是${this.teacher}。`)
  }
}
var xiaoming = new Student('小明')
var xiaohong = new Student('小红')
```

- 通过class定义的类需要实例化出对象的时候也需要new，这和前面说的对象都是new出来的相对应，区别在于通过class关键字定义类代码更简洁，避免了挂载prototype这种分散的代码。

class继承

```js
class Base {
  constructor(name) {
    this.name = name
    this.school = 'xx大学'
    this.course = ['语文', '数学']
    this.teacher = '王老师'
  }
  modifyTeacher(tName) {
    this.teacher = tName
  }
}

class Student extends Base {
  constructor(name) {
    super(name)
    this.time = new Date()
  }
  addCourse(course) {
    this.course.push(course)
  }
}

var xiaoming = new Student('小明')
var xiaohong = new Student('小红')
```

:::tips
extends：extends关节字用来继承一个父类，子类拥有父类的属性和方法。（extends表示原型链对象来自Base）。 super()：super用来调用父类的构造函数，否则父类的name属性无法正常初始化。
:::

- 通过 extends 关节字就实现了继承，比通过原型链实现代码清爽了许多，xiaoming 和 xiaohong 这两个实例上拥有属性 time、name、school、course、teacher，拥有方法 modifyTeacher、addCourse，且互不影响。

- ES6引入的class和原有的JavaScript原型继承有什么区别呢？实际上它们没有任何区别，class的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。简而言之，用class的好处就是极大地简化了原型链代码。


