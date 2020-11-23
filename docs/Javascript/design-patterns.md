# 设计模式

设计模式是对软件设计开发过程中反复出现的某类问题的通用解决方案。设计模式更多的是指导思想和方法论，而不是现成的代码，当然每种设计模式都有每种语言中的具体实现方式。学习设计模式更多的是理解各种模式的内在思想和解决的问题，毕竟这是前人无数经验总结成的最佳实践，而代码实现则是对加深理解的辅助。

- 设计模式的类型：

1. **结构型模式（Structural Patterns）**： 通过识别系统中组件间的简单关系来简化系统的设计。

2. **创建型模式（Creational Patterns）**： 处理对象的创建，根据实际情况使用合适的方式创建对象。常规的对象创建方式可能会导致设计上的问题，或增加设计的复杂度。创建型模式通过以某种方式控制对象的创建来解决问题。

3. **行为型模式（Behavioral Patterns）**： 用于识别对象之间常见的交互模式并加以实现，如此，增加了这些交互的灵活性。

## 一. 结构型模式（Structural Patterns）

### 1. 外观模式（Facade Pattern）

![image](../../resources/images/js/designModel-1.jpg)

外观模式是最常见的设计模式之一，它为子系统中的一组接口提供一个统一的高层接口，使子系统更容易使用。简而言之外观设计模式就是把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的API。很多我们常用的框架和库基本都遵循了外观设计模式，比如JQuery就把复杂的原生DOM操作进行了抽象和封装，并消除了浏览器之间的兼容问题，从而提供了一个更高级更易用的版本。其实在平时工作中我们也会经常用到外观模式进行开发，只是我们不自知而已。

比如，我们可以应用外观模式封装一个统一的DOM元素事件绑定/取消方法，用于兼容不同版本的浏览器和更方便的调用：

```js
// 绑定事件
function addEvent(element, event, handler) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, handler);
  } else {
    element['on' + event] = fn;
  }
}

// 取消绑定
function removeEvent(element, event, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(event, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, handler);
  } else {
    element['on' + event] = null;
  }
}
```

### 2. 代理模式（Proxy Pattern）

![image](../../resources/images/js/designModel-2.jpg)

首先，一切皆可代理，不管是在实现世界还是计算机世界。现实世界中买房有中介、打官司有律师、投资有经纪人，他们都是代理，由他们帮你处理由于你缺少时间或者专业技能而无法完成的事务。类比到计算机领域，代理也是一样的作用，当访问一个对象本身的代价太高（比如太占内存、初始化时间太长等）或者需要增加额外的逻辑又不修改对象本身时便可以使用代理。ES6中也增加了 Proxy 的功能。

归纳一下，代理模式可以解决以下的问题：

1. 增加对一个对象的访问控制

2. 当访问一个对象的过程中需要增加额外的逻辑

要实现代理模式需要三部分：

1. **Real Subject**：真实对象

2. **Proxy**：代理对象

3. **Subject**接口：Real Subject 和 Proxy都需要实现的接口，这样Proxy才能被当成Real Subject的“替身”使用

比如有一个股票价格查询接口，调用这个接口需要比较久的时间（用 setTimeout 模拟2s的调用时间）：

**StockPriceAPI:**

```js
function StockPriceAPI() {
  // Subject Interface实现
  this.getValue = function (stock, callback) {
    console.log('Calling external API ... ');
    setTimeout(() => {
      switch (stock) {
        case 'GOOGL':
          callback('$1265.23');
          break;
        case 'AAPL':
          callback('$287.05');
          break;
        case 'MSFT':
          callback('$173.70');
          break;
        default:
          callback('');
      }
    }, 2000);
  }
}
```

我们不希望每次都去请求远程接口，而是增加缓存机制，当有缓存的时候就直接从缓存中获取，否则再去请求远程接口。我们可以通过一个proxy来实现：

**StockPriceAPIProxy：**

```js
function StockPriceAPIProxy() {
  // 缓存对象
  this.cache = {};
  // 真实API对象
  this.realAPI = new StockPriceAPI();
  // Subject Interface实现
  this.getValue = function (stock, callback) {
    const cachedPrice = this.cache[stock];
    if (cachedPrice) {
      console.log('Got price from cache');
      callback(cachedPrice);
    } else {
      this.realAPI.getValue(stock, (price) => {
        this.cache[stock] = price;
        callback(price);
      });
    }
  }
}
```

注意，Proxy需要和真实对象一样实现 getValue() 方法，getValue()就属于 Subject 接口。

测试一下：

```js
const api = new StockPriceAPIProxy();
api.getValue('GOOGL', (price) => { console.log(price) });
api.getValue('AAPL', (price) => { console.log(price) });
api.getValue('MSFT', (price) => { console.log(price) });

setTimeout(() => {
  api.getValue('GOOGL', (price) => { console.log(price) });
  api.getValue('AAPL', (price) => { console.log(price) });
  api.getValue('MSFT', (price) => { console.log(price) });
}, 3000)
```

**输出**

```js
Calling external API ...
Calling external API ...
Calling external API ...
$1265.23
$287.05
$173.70
Got price from cache
$1265.23
Got price from cache
$287.05
Got price from cache
$173.70
```

## 二. 创建型模式（Creational Patterns）

### 1. 工厂模式（Factory Pattern）

![image](../../resources/images/js/designModel-3.jpg)

工厂模式的名字就很直白，封装的模块就像一个工厂一样批量的产出需要的对象。常见工厂模式的一个特征就是调用的时候不需要使用<font color=FF0000>new</font>，而且传入的参数比较简单。但是调用次数可能比较频繁，经常需要产出不同的对象，频繁调用时不用<font color=FF0000>new</font>也方便很多。

什么场景适合应用工厂模式而不是直接 <font color=FF0000>new</font> 一个对象呢？当构造函数过多不方便管理，且需要创建的对象之间存在某些关联（有同一个父类、实现同一个接口等）时，不妨使用工厂模式。工厂模式提供一种集中化、统一化的方式，避免了分散创建对象导致的代码重复、灵活性差的问题。

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

示例：构造一个简单的汽车工厂来生产汽车：

```js
// 汽车构造函数
function SuzukiCar(color) {
  this.color = color;
  this.brand = 'Suzuki';
}

// 汽车构造函数
function HondaCar(color) {
  this.color = color;
  this.brand = 'Honda';
}

// 汽车构造函数
function BMWCar(color) {
  this.color = color;
  this.brand = 'BMW';
}

// 汽车品牌枚举
const BRANDS = {
  suzuki: 1,
  honda: 2,
  bmw: 3
}

/**
 * 汽车工厂
 */
function CarFactory() {
  this.create = function (brand, color) {
    switch (brand) {
      case BRANDS.suzuki:
        return new SuzukiCar(color);
      case BRANDS.honda:
        return new HondaCar(color);
      case BRANDS.bmw:
        return new BMWCar(color);
      default:
        break;
    }
  }
}
```

测试一下：

```js
const carFactory = new CarFactory();
const cars = [];

cars.push(carFactory.create(BRANDS.suzuki, 'brown'));
cars.push(carFactory.create(BRANDS.honda, 'grey'));
cars.push(carFactory.create(BRANDS.bmw, 'red'));

function say() {
  console.log(`Hi, I am a ${this.color} ${this.brand} car`);
}

for (const car of cars) {
  say.call(car);
}
```

输出：

```
Hi, I am a brown Suzuki car
Hi, I am a grey Honda car
Hi, I am a red BMW car
```

> 使用工厂模式之后，不再需要重复引入一个个构造函数，只需要引入工厂对象就可以方便的创建各类对象。

#### 实例: 弹窗组件

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

#### jQuery的工厂模式

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

### 2. 单例模式

单例模式中Class的实例个数最多为1。当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上了用场。而除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态。

实现单例模式需要解决以下几个问题：

1. 如何确定Class只有一个实例？

2. 如何简便的访问Class的唯一实例？

3. Class如何控制实例化的过程？

4. 如何将Class的实例个数限制为1？

我们一般通过实现以下两点来解决上述问题：

1. 隐藏Class的构造函数，避免多次实例化

2. 通过暴露一个 getInstance() 方法来创建/获取唯一实例

Javascript中单例模式可以通过以下方式实现：

```js
// 单例构造器
const FooServiceSingleton = (function () {
  // 隐藏的Class的构造函数
  function FooService() {}

  // 未初始化的单例对象
  let fooService;

  return {
    // 创建/获取单例对象的函数
    getInstance: function () {
      if (!fooService) {
        fooService = new FooService();
      }
      return fooService;
    }
  }
})();
```

实现的关键点有：

1. 使用 IIFE创建局部作用域并即时执行；

2. getInstance() 为一个 闭包 ，使用闭包保存局部作用域中的单例对象并返回。

我们可以验证下单例对象是否创建成功：

```js
const fooService1 = FooServiceSingleton.getInstance();
const fooService2 = FooServiceSingleton.getInstance();

console.log(fooService1 === fooService2); // true
```

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

#### 实例：全局数据存储对象

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

#### 实例：vue-router

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

## 三. 行为型模式（Behavioral Patterns）

### 1. 策略模式（Strategy Pattern）

策略模式简单描述就是：对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。比如每个人都要“交个人所得税”，但是“在美国交个人所得税”和“在中国交个人所得税”就有不同的算税方法。最常见的使用策略模式的场景如登录鉴权，鉴权算法取决于用户的登录方式是手机、邮箱或者第三方的微信登录等等，而且登录方式也只有在运行时才能获取，获取到登录方式后再动态的配置鉴权策略。所有这些策略应该实现统一的接口，或者说有统一的行为模式。Node 生态里著名的鉴权库 Passport.js API的设计就应用了策略模式。

还是以登录鉴权的例子我们仿照 passport.js 的思路通过代码来理解策略模式：

```js
function SocialStragety() {
  this.login = ({ id, secret }) => {
    console.log(id, secret);
    // authenticating with id and secret...
  }
}

const loginController = new LoginController();

// 调用用户名、密码登录接口，使用LocalStrategy
app.use('/login/local', function (req, res) {
  loginController.setStrategy(new LocalStragegy());
  loginController.login(req.body);
});

// 调用手机、验证码登录接口，使用PhoneStrategy
app.use('/login/phone', function (req, res) {
  loginController.setStrategy(new PhoneStragety());
  loginController.login(req.body);
});

// 调用社交登录接口，使用SocialStrategy
app.use('/login/social', function (req, res) {
  loginController.setStrategy(new SocialStragety());
  loginController.login(req.body);
});
```

从以上示例可以得出使用策略模式有以下优势：

1. 方便在运行时切换算法和策略

2. 代码更简洁，避免使用大量的条件判断

3. 关注分离，每个strategy类控制自己的算法逻辑，strategy和其使用者之间也相互独立

### 2. 迭代器模式（Iterator Pattern）

ES6中的迭代器 Iterator 相信大家都不陌生，迭代器用于遍历容器（集合）并访问容器中的元素，而且无论容器的数据结构是什么（Array、Set、Map等），迭代器的接口都应该是一样的，都需要遵循 迭代器协议。

迭代器模式解决了以下问题：

1. 提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构

2. 提供遍历容器（集合）的能力而无需改变容器的接口

一个迭代器通常需要实现以下接口：

- hasNext()：判断迭代是否结束，返回Boolean
- next()：查找并返回下一个元素

为Javascript的数组实现一个迭代器可以这么写：

```js
const item = [1, 'red', false, 3.14];

function Iterator(items) {
  this.items = items;
  this.index = 0;
}

Iterator.prototype = {
  hasNext: function () {
    return this.index < this.items.length;
  },
  next: function () {
    return this.items[this.index++];
  }
}
```
验证一下迭代器是否工作：

```js
const iterator = new Iterator(item);

while(iterator.hasNext()){
  console.log(iterator.next());
}
```
输出：
```
1, red, false, 3.14
```

ES6提供了更简单的迭代循环语法 **for...of**，使用该语法的前提是操作对象需要实现 可迭代协议（The iterable protocol），简单说就是该对象有个Key为 **Symbol.iterator** 的方法，该方法返回一个iterator对象。

比如我们实现一个 Range 类用于在某个数字区间进行迭代：

```js
function Range(start, end) {
  return {
    [Symbol.iterator]: function () {
      return {
        next() {
          if (start < end) {
            return { value: start++, done: false };
          }
          return { done: true, value: end };
        }
      }
    }
  }
}
```

验证一下：

```js
for (num of Range(1, 5)) {
  console.log(num);
}
```

输出：

```
1, 2, 3, 4
```

### 3. 观察者模式（Observer Pattern）

![image](../../resources/images/js/designModel-4.jpg)

观察者模式又称发布订阅模式（Publish/Subscribe Pattern），是我们经常接触到的设计模式，日常生活中的应用也比比皆是，比如你订阅了某个博主的频道，当有内容更新时会收到推送；又比如JavaScript中的事件订阅响应机制。观察者模式的思想用一句话描述就是：**被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者。**

比如给DOM元素绑定事件的 addEventListener() 方法：

```js
target.addEventListener(type, listener [, options]);
```

Target就是被观察对象Subject，listener就是观察者Observer。

观察者模式中Subject对象一般需要实现以下API：

- subscribe(): 接收一个观察者observer对象，使其订阅自己

- unsubscribe(): 接收一个观察者observer对象，使其取消订阅自己

- fire(): 触发事件，通知到所有观察者

用JavaScript手动实现观察者模式：

```js
// 被观察者
function Subject() {
  this.observers = [];
}

Subject.prototype = {
  // 订阅
  subscribe: function (observer) {
    this.observers.push(observer);
  },
  // 取消订阅
  unsubscribe: function (observerToRemove) {
    this.observers = this.observers.filter(observer => {
      return observer !== observerToRemove;
    })
  },
  // 事件触发
  fire: function () {
    this.observers.forEach(observer => {
      observer.call();
    });
  }
}
```

验证一下订阅是否成功：

```js
const subject = new Subject();

function observer1() {
  console.log('Observer 1 Firing!');
}


function observer2() {
  console.log('Observer 2 Firing!');
}

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.fire();
```

```
Observer 1 Firing! 
Observer 2 Firing!
```

验证一下取消订阅是否成功：

```js
subject.unsubscribe(observer2);
subject.fire();
```

### 4. 中介者模式（Mediator Pattern）

![image](../../resources/images/js/designModel-5.jpg)

在中介者模式中，中介者（Mediator）包装了一系列对象相互作用的方式，使得这些对象不必直接相互作用，而是由中介者协调它们之间的交互，从而使它们可以松散偶合。当某些对象之间的作用发生改变时，不会立即影响其他的一些对象之间的作用，保证这些作用可以彼此独立的变化。

中介者模式和观察者模式有一定的相似性，都是一对多的关系，也都是集中式通信，不同的是中介者模式是处理同级对象之间的交互，而观察者模式是处理Observer和Subject之间的交互。中介者模式有些像婚恋中介，相亲对象刚开始并不能直接交流，而是要通过中介去筛选匹配再决定谁和谁见面。中介者模式比较常见的应用比如聊天室，聊天室里面的人之间并不能直接对话，而是通过聊天室这一媒介进行转发。一个简易的聊天室模型可以实现如下：

聊天室成员类：

```js
function Member(name) {
  this.name = name;
  this.chatroom = null;
}

Member.prototype = {
  // 发送消息
  send: function (message, toMember) {
    this.chatroom.send(message, this, toMember);
  },
  // 接收消息
  receive: function (message, fromMember) {
    console.log(`${fromMember.name} to ${this.name}: ${message}`);
  }
}
```

聊天室类：

```js
function Chatroom() {
  this.members = {};
}

Chatroom.prototype = {
  // 增加成员
  addMember: function (member) {
    this.members[member.name] = member;
    member.chatroom = this;
  },
  // 发送消息
  send: function (message, fromMember, toMember) {
    toMember.receive(message, fromMember);
  }
}
```

测试一下：

```js
const chatroom = new Chatroom();
const bruce = new Member('bruce');
const frank = new Member('frank');

chatroom.addMember(bruce);
chatroom.addMember(frank);

bruce.send('Hey frank', frank);
```

输出：

```js
bruce to frank: hello frank
```

这只是一个最简单的聊天室模型，真正的聊天室还可以加入更多的功能，比如敏感信息拦截、一对多聊天、广播等。得益于中介者模式，Member不需要处理和聊天相关的复杂逻辑，而是全部交给Chatroom，有效的实现了关注分离。

### 5. 访问者模式（Visitor Pattern）

![image](../../resources/images/js/designModel-6.jpg)

访问者模式是一种将算法与对象结构分离的设计模式，通俗点讲就是：访问者模式让我们能够在不改变一个对象结构的前提下能够给该对象增加新的逻辑，新增的逻辑保存在一个独立的访问者对象中。访问者模式常用于拓展一些第三方的库和工具。

访问者模式的实现有以下几个要素：

1. Visitor Object：访问者对象，拥有一个 visit() 方法

2. Receiving Object：接收对象，拥有一个 accept() 方法

3. visit(receivingObj)：用于Visitor接收一个Receiving Object

4. accept(visitor)：用于Receving Object接收一个Visitor，并通过调用Visitor的 visit() 为其提供获取Receiving Object数据的能力

Receiving Object：

```js
function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
}

Employee.prototype = {
  getSalary: function () {
    return this.salary;
  },
  setSalary: function (salary) {
    this.salary = salary;
  },
  accept: function (visitor) {
    visitor.visit(this);
  }
}
```

Visitor Object：

```js
function Visitor() { }

Visitor.prototype = {
  visit: function (employee) {
    employee.setSalary(employee.getSalary() * 2);
  }
}
```

验证： 

```js
const employee = new Employee('bruce', 1000);
const visitor = new Visitor();
employee.accept(visitor);

console.log(employee.getSalary());
```

```
2000
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

