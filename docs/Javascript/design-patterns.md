# 设计模式

## 1.工厂模式

工厂模式的名字就很直白，封装的模块就像一个工厂一样批量的产出需要的对象。常见工厂模式的一个特征就是调用的时候不需要使用<font color=FF0000>new</font>，而且传入的参数比较简单。但是调用次数可能比较频繁，经常需要产出不同的对象，频繁调用时不用<font color=FF0000>new</font>也方便很多。

- 缺点：对象无法识别，因为所有的实例都指向一个原型

```js
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');
```

### 实例: 弹窗组件

> 我们项目需要一个弹窗，弹窗有几种：消息型弹窗，确认型弹窗，取消型弹窗，他们的颜色和内容可能是不一样的。

- 分别建一个类

```js
function infoPopup(content, color) {}
function confirmPopup(content, color) {}
function cancelPopup(content, color) {}
```

- 直接使用

```js
let infoPopup1 = new infoPopup(content, color);
let infoPopup2 = new infoPopup(content, color);
let confirmPopup1 = new confirmPopup(content, color);
...
```

- 工厂模式

```js
// 新加一个方法popup把这几个类都包装起来
function popup(type, content, color) {
  switch(type) {
    case 'infoPopup':
      return new infoPopup(content, color);
    case 'confirmPopup':
      return new confirmPopup(content, color);
    case 'cancelPopup':
      return new cancelPopup(content, color);
  }
}
// 直接调用
let infoPopup1 = popup('infoPopup', content, color); 
```

- 改造成面向对象

```js
// 上述代码虽然实现了工厂模式，但是switch始终感觉不是很优雅。我们使用面向对象改造下popup，将它改为一个类，将不同类型的弹窗挂载在这个类上成为工厂方法：

function popup(type, content, color) {
  // 如果是通过new调用的，返回对应类型的弹窗
  if(this instanceof popup) {
    return new this[type](content, color);
  } else {
    // 如果不是new调用的，使用new调用，会走到上面那行代码
    return new popup(type, content, color);
  }
}

// 各种类型的弹窗全部挂载在原型上成为实例方法
popup.prototype.infoPopup = function(content, color) {}
popup.prototype.confirmPopup = function(content, color) {}
popup.prototype.cancelPopup = function(content, color) {}
```

- 封装成模块

    - 这个popup不仅仅让我们调用的时候少了一个new，他其实还把相关的各种弹窗都封装在了里面，这个popup可以直接作为模块export出去给别人调用，也可以挂载在window上作为一个模块给别人调用。因为popup封装了弹窗的各种细节，即使以后popup内部改了，或者新增了弹窗类型，或者弹窗类的名字变了，只要保证对外的接口参数不变，对外面都没有影响。挂载在window上作为模块可以使用自执行函数：

```js
(function(){
 	function popup(type, content, color) {
    if(this instanceof popup) {
      return new this[type](content, color);
    } else {
      return new popup(type, content, color);
    }
  }

  popup.prototype.infoPopup = function(content, color) {}
  popup.prototype.confirmPopup = function(content, color) {}
  popup.prototype.cancelPopup = function(content, color) {}
  
  window.popup = popup;
})()

// 外面就直接可以使用popup模块了
let infoPopup1 = popup('infoPopup', content, color); 
```

### jQuery的工厂模式

```js
(function(){
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector);   // new一下init, init才是真正的构造函数
  }

  jQuery.fn = jQuery.prototype;     // jQuery.fn就是jQuery.prototype的简写

  jQuery.fn.init = function(selector) {
    // 这里面实现真正的构造函数
  }

  // 让init和jQuery的原型指向同一个对象，便于挂载实例方法
  jQuery.fn.init.prototype = jQuery.fn;  

  // 最后将jQuery挂载到window上
  window.$ = window.jQuery = jQuery;
})();
```


## 2. 构造函数模式

- 优点：实例可以识别为一个特定的类型

- 缺点：每次创建实例时，每个方法都要被创建一次

```js
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

// 优化
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
// 优点：解决了每个方法都要被重新创建的问题
```

## 3. 原型模式

原型模式最典型的应用就是JS本身啊，JS的原型链就是原型模式。JS中可以使用Object.create指定一个对象作为原型来创建对象:

- 优点：方法不会重新创建

- 缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

```js
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();
// 优化
function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
// 优点：封装性好了一点
// 缺点：重写了原型，丢失了constructor属性

// 优化2
function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
// 优点：实例可以通过constructor属性找到所属构造函数
// 缺点：原型模式该有的缺点还是有
```

## 4. 组合模式：构造函数模式+原型模式

- 优点：该共享的共享，该私有的私有，使用最广泛的方式

- 缺点：有的人就是希望全部都写在一起，即更好的封装性

```js
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();

// 动态原型模式
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();
```

## 5. 单例模式

单例模式适用于全局只能有一个实例对象的场景，单例模式的一般结构如下：

```js
function Singleton() {}

Singleton.getInstance = function() {
  if(this.instance) {
    return this.instance;
  }
  
  this.instance = new Singleton();
  return this.instance;
}
```

上述代码中，Singleton类挂载了一个静态方法getInstance，如果要获取实例对象只能通过这个方法拿，这个方法会检测是不是有现存的实例对象，如果有就返回，没有就新建一个。

### 实例：全局数据存储对象

> 我们需要对一个全局的数据对象进行管理，这个对象只能有一个，如果有多个会导致数据不同步。

这个需求要求全局只有一个数据存储对象，是典型的适合单例模式的场景，我们可以直接套用上面的代码模板，但是上面的代码模板获取instance必须要调getInstance才行，要是某个使用者直接调了Singleton()或者new Singleton()就会出问题，这次我们换一种写法，让他能够兼容Singleton()和new Singleton()，使用起来更加傻瓜化:

```js
function store() {
  if(store.instance) {
    return store.instance;
  }
  
  store.instance = this;
}
```

上述代码支持使用new store()的方式调用，我们使用了一个静态变量instance来记录是否有进行过实例化，如果实例化了就返回这个实例，如果没有实例化说明是第一次调用，那就把this赋给这个这个静态变量，因为是使用new调用，这时候的this指向的就是实例化出来的对象，并且最后会隐式的返回this。

如果我们还想支持store()直接调用，我们可以用前面工厂模式用过的方法，检测this是不是当前类的实例，如果不是就帮他用new调用就行了：

```js
function store() {
  // 加一个instanceof检测
  if(!(this instanceof store)) {
    return new store();
  }
  
  // 下面跟前面一样的
  if(store.instance) {
    return store.instance;
  }
  
  store.instance = this;
}
```

### 实例：vue-router

vue-router其实也用到了单例模式，因为如果一个页面有多个路由对象，可能造成状态的冲突，vue-router的单例实现方式又有点不一样，下列代码来自vue-router源码：

```js
let _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) return;
  install.installed = true

  _Vue = Vue
}
```

每次我们调用vue.use(vueRouter)的时候其实都会去执行vue-router模块的install方法，如果用户不小心多次调用了vue.use(vueRouter)就会造成install的多次执行，从而产生不对的结果。vue-router的install在第一次执行时，将installed属性写成了true，并且记录了当前的Vue，这样后面在同一个Vue里面再次执行install就会直接return了，这也是一种单例模式。

> 可以看到我们这里三种代码都是单例模式，他们虽然形式不一样，但是核心思想都是一样的，都是用一个变量来标记代码是否已经执行过了，如果执行过了就返回上次的执行结果，这样就保证了多次调用也会拿到一样的结果。

## 6. 建造者模式

建造者模式是用于比较复杂的大对象的构建，比如Vue，Vue内部包含一个功能强大，逻辑复杂的对象，在构建的时候也需要传很多参数进去。像这种需要创建的情况不多，创建的对象本身又很复杂的时候就适用建造者模式。建造者模式的一般结构如下：

```js
function Model1() {}   // 模块1
function Model2() {}   // 模块2

// 最终使用的类
function Final() {
  this.model1 = new Model1();
  this.model2 = new Model2();
}

// 使用时
var obj = new Final();
```
上述代码中我们最终使用的是Final，但是Final里面的结构比较复杂，有很多个子模块，Final就是将这些子模块组合起来完成功能，这种需要精细化构造的就适用于建造者模式。

