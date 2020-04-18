# 代码优化

## 1.优化层叠的条件判断

```js
// 优化前
if (color) {
  if (color === 'black') {
    printBlackBackground();
  } else if (color === 'red') {
    printRedBackground();
  } else if (color === 'blue') {
    printBlueBackground();
  } else if (color === 'green') {
    printGreenBackground();
  } else {
    printYellowBackground();
  }
}

// 方法一：switch-->不推荐这样做，因为会给debug增加麻烦
switch(color) {
  case 'black':
    printBlackBackground();
    break;
  case 'red':
    printRedBackground();
    break;
  case 'blue':
    printBlueBackground();
    break;
  case 'green':
    printGreenBackground();
    break;
  default:
    printYellowBackground();
}

// 方法二：通过一个object
var colorObj = {
  'black': printBlackBackground,
  'red': printRedBackground,
  'blue': printBlueBackground,
  'green': printGreenBackground,
  'yellow': printYellowBackground
};
if (color && colorObj.hasOwnProperty(color)) {
  colorObj[color]();
}

// 方法三：通过includes方法（有兼容性问题）
if(['black', 'red', 'blue', 'green', 'yellow'].includes(color)) {
  // it's true
}

// 方法四：通过indexOf判断
['black', 'red', 'blue', 'green', 'yellow'].indexOf(color) >= 0

```

### 1.1 look-up表代替if-else

类似下面的需求：比如某平台的信用分数评级，超过700-950，就是信用极好，650-700信用优秀，600-650信用良好，550-600信用中等，350-550信用较差。

- 初代

```js
function showGrace(grace) {
    let _level='';
    if(grace>=700){
        _level='信用极好'
    }
    else if(grace>=650){
        _level='信用优秀'
    }
    else if(grace>=600){
        _level='信用良好'
    }
    else if(grace>=550){
        _level='信用中等'
    }
    else{
        _level='信用较差'
    }
    return _level;
}
// 问题
1.万一以后需求，改了比如650-750是信用优秀，750-950是信用极好。这样就整个方法要改。

2.方法存在各种神仙数字：700，650，600，550。日后的维护可能存在问题。
```

- 进化一代: look-up

```js
function showGrace(grace) {
    let graceForLevel=[700,650,600,550];
    let levelText=['信用极好','信用优秀','信用良好','信用中等','信用较差'];
    for(let i=0;i<graceForLevel.length;i++){
        if(grace>=graceForLevel[i]){
            return levelText[i];
        }
    }
    //如果不存在，那么就是分数很低，返回最后一个
    return levelText[levelText.length-1];
}
// 优点
优点就是如果有需求修改，只需要修改graceForLevel，levelText。业务逻辑不需要改。
```

- 封装

```js
function showGrace(grace,level,levelForGrace) {
    for(let i=0;i<level.length;i++){
        if(grace>=level[i]){
            return levelForGrace[i];
        }
    }
    //如果不存在，那么就是分数很低，返回最后一个
    return levelForGrace[levelForGrace.length-1];
}
let graceForLevel=[700,650,600,550];
let levelText=['信用极好','信用优秀','信用良好','信用中等','信用较差'];
```



### 1.2 配置对象代替switch

- 有一个需求：传入cash，check，draft，zfb，wx_pay，对应输出：现金，支票，汇票，支付宝，微信支付。

原始方法
```js
function getPayChanne(tag){
    switch(tag){
        case 'cash':return '现金';
        case 'check':return '支票';
        case 'draft':return '汇票';
        case 'zfb':return '支付宝';
        case 'wx_pay':return '微信支付';
    }
}
```

配置数据和业务逻辑分离

```js
function getPayChanne(tag){
    let payChanneForChinese = {
        'cash': '现金',
        'check': '支票',
        'draft': '汇票',
        'zfb': '支付宝',
        'wx_pay': '微信支付',
    };
    return payChanneForChinese[tag];
}
```

- 封装

```js
let payChanneForChinese = {
    'cash': '现金',
    'check': '支票',
    'draft': '汇票',
    'zfb': '支付宝',
    'wx_pay': '微信支付',
};
function getPayChanne(tag,chineseConfig){
    return chineseConfig[tag];
}
getPayChanne('cash',payChanneForChinese);
```

### 1.3 使用 Array.includes 来处理多重条件

```js
// 条件语句
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
```

- 如果想要匹配更多的水果时

```js
function test(fruit) {
  // 把条件提取到数组中
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```

## 2.使用同一个方法处理数组和单一元素

```js
// 只需要先将它们并成一个数组，然后处理这个数据
function printUpperCase(words) {
  var elements = [].concat(words);
  for (var i = 0; i < elements.length; i++) {
    console.log(elements[i].toUpperCase());
  }
}

printUpperCase("cactus");
// => CACTUS
printUpperCase(["cactus", "bear", "potato"]);
// => CACTUS
//  BEAR
//  POTATO
```

## 3. 检测一小段javascript的效率

```js
/* 为了快速检测javascript代码块的执行效率，
我们可以使用 console 方法，比如 console.time(label) 和 console.timeEnd(label)
*/
console.time("Array initialize");
var arr = new Array(100),
    len = arr.length,
    i;
for (i = 0; i < len; i++) {
    arr[i] = new Object();
};
console.timeEnd("Array initialize"); // Outputs: Array initialize: 0.711ms
```

## 4.Node.js: 执行一个模块，如果它不是被required

```js
// 在node中，你可以告知程序在require(‘./something.js’) 和 node something.js 时触发不同的代码。
if (!module.parent) {
    // ran with `node something.js`
    app.listen(8088, function() {
        console.log('app listening on port 8088');
    })
} else {
    // used with `require('/.something.js')`
    module.exports = app;
}
```

## 5. 赋值判断操作

```js
{
    state.text ? <card value={state.text}/> : null 
}
{
    state.img ? <card value={state.img}/> : null
}
{
    state.other ? <card value={state.other}/> : null
}

// 优化：.filter(Boolean) 是去掉假值的常用技巧。
['text','img','other']
  .map(key=>self.state[key])
  .filter(Boolean)
  .map(value=><Card messageData={value}/>)

// 优化2
['text', 'img', 'other'].map(item => self.state[item] ? <Card messageData={self.state[item]}/> : null)
```

## 6. 标记语言（label）:break(终止整个循环)、continue(跳出本次循环)

- 有的时候我们会写双重 for 循环做一些数据处理，我们有的时候希望满足条件的时候就直接跳出循环。以免浪费不必要资源。

```js
firstLoop: 
for (let i = 0; i < 3; i++) { 
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue firstLoop; // 继续 firstLoop 循环
         // break firstLoop; // 中止 firstLoop 循环
      }
      console.log(`i = ${i}, j = ${j}`);
   }
}
// 输出
i = 1, j = 0
i = 2, j = 0
i = 2, j = 1
 
for (let i = 0; i < 3; i++) { 
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue 
      }
      console.log(`i = ${i}, j = ${j}`);
   }
}
// 输出
i = 0, j = 1
i = 0, j = 2
i = 1, j = 0
i = 1, j = 2
i = 2, j = 0
i = 2, j = 1
```

## 7. void 运算符

- void 运算符对给定的表达式进行求值，然后返回 undefined。

- 由于 void 会忽略操作数的值，因此在操作数具有副作用的时候使用 void 会更加合理。

- 作用
    1. 替代undefined：由于undefined并不是一个关键字，其在IE8-浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用void 0 来替换undefined
    2. 客户端URL
    ```js
    <a href="javascript:void window.open();">打开一个新窗口</a>
    ```
    3. 阻止默认事件:阻止默认事件的方式是给事件置返回值false
    ```js
    //一般写法
    <a href="http://example.com" onclick="f();return false;">文字</a>
    // 替代写法
    <a href="javascript:void(f())">文字</a>
    ```

## 8. IntersectionObserver

- IntersectionObserver 可以用来监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。

- 可以用这个特性来处理曝光埋点，而不是用 getBoundingClientRect().top 这种更加损耗性能的方式来处理。

- 可以用这个 API 来优化滚动吸顶：
```js
IntersectionObserverFun: function() {
    let self = this;
    let ele = self.$refs.pride_tab_fixed;
    if( !!IntersectionObserver ){
        let observer = new IntersectionObserver(function(){
            let offsetTop = ele.getBoundingClientRect().top;
            self.titleFixed = offsetTop < 0;
        }, {
            threshold: [1]
        });
        observer.observe(document.getElementsByClassName('title_box')[0]);
    } else {
        window.addEventListener('scroll', _.throttle(function(){
            let offsetTop = ele.getBoundingClientRect().top;
            self.titleFixed = offsetTop < 0;
        }, 50));
    }
}, 
```

## 9. 使用 Array.from 快速生成数组

- 一般我们生成一个有规律的数组会使用循环插入的方法，比如使用时间选择插件时，我们可能需要将小时数存放在数组中：

```js
let hours = [];

for (let i = 0; i < 24; i++) {
    hours.push(i + '时');
}
```

- 简写方法：

```js
let hours = Array.from({ length: 24 }, (value, index) => index + '时');
```

## 10. 使用 router.beforeEach 来处理跳转前逻辑

- 在某些情况下，我们需要在路由跳转前处理一些特定的业务逻辑，比如修改路由跳转、设置 title 等，代码如下：

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 首页
const Home = (resolve => {
    require.ensure(['../views/home.vue'], () => {
        resolve(require('../views/home.vue'))
    })
})

let base = `${process.env.BASE_URL}`;

let router =  new Router({
    mode: 'history',
    base: base,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { title: '首页' }
        },
    ]
})

router.beforeEach((to, from, next) => {
    let title = to.meta && to.meta.title;
    
    if (title) {
        document.title = title; // 设置页面 title
    }
    
    if (to.name === 'home') {
    
        // 拦截并跳转至 page2 单页，$openRouter 方法在第 5 节中封装
        Vue.$openRouter({
            name: 'page2'
        });
    }
    
    next();
})

export default router
```

- 注意最后需要调用 next() 方法执行路由跳转。

## 11. 使用 v-if 来优化页面加载

- 在 Vue 页面中，一些模块可能需要用户主动触发才会显示，比如弹框组件等这样的子组件，那么我们可以使用 v-if 来进行按需渲染，没必要一进页面就渲染所有模块。比如：

```js
<template>
    <div @click="showModuleB = true"></div>
    <module-b v-if="isShowModuleB"></module-b>
</template>

<script>
import moduleB from 'components/moduleB'
export default {
    data() {
        return {
            isShowModuleB: false
        }  
    },
    components: {
        moduleB
    }
}
</script>
```

-这样当 isShowModuleB 为 false 的时候便不会加载该模块下的代码，包括一些耗时的接口调用。当然 v-if 主要适用于代码量较多、用户点击不是很频繁的模块的显示隐藏，同时如果涉及到权限问题的代码都需要使用 v-if，而不是 v-show。


## 12. 路由跳转尽量使用 name 而不是 path

- 我们前期配置的路由路径后期难免会进行修改，如果我们页面跳转的地方全是使用的 path，那么我们需要修改所有涉及该 path 的页面，这样不利于项目的维护。而相对于 path，name 使用起来就方便多了，因为其具有唯一性，即使我们修改了 path，还可以使用原来的 name 值进行跳转。

```js
this.$router.push({ 
    name: 'page1'
});

// 而不是
this.$router.push({ 
    path: 'page1'
});
```

## 13. 使用 key 来优化 v-for 循环

- v-for 是 Vue 提供的基于源数据多次渲染元素或模板块的指令。正因为是数据驱动，所以在修改列表数据的时候，Vue 内部会根据 key 值去判断某个值是否被修改，其会重新渲染修改后的值，否则复用之前的元素。

- 这里如果数据中存在唯一表示 id，则推荐使用 id 作为 key，如果没有则可以使用数组的下标 index 作为 key。因为如果在数组中间插入值，其之后的 index 会发生改变，即使数据没变 Vue 也会进行重新渲染，所以最好的办法是使用数组中不会变化且唯一的那一项作为 key 值。

```js
<template>
    <ul>
        <li v-for="(item, index) in arr" :key="item.id">{{ item.data }}</li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            arr: [
                {
                    id: 1,
                    data: 'a'
                },
                {
                    id: 2,
                    data: 'b'
                },
                {
                    id: 3,
                    data: 'c'
                }
            ]
        }
    }
}
</script>
```

## 14. 使用 computed 代替 watch

- 区别：
  
  1. watch：当监测的属性变化时会自动执行对应的回调函数
  
  2. computed：计算的属性只有在它的相关依赖发生改变时才会重新求值

- 其实它们在功能上还是有所区别的，但是有时候可以实现同样的效果，而 computed 会更胜一筹，比如：

```js
<template>
    <div>
        <input type="text" v-model="firstName">
        <input type="text" v-model="lastName">
        <span>{{ fullName }}</span>
        <span>{{ fullName2 }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            fullName2: ''
        }
    },
    
    // 使用 computed
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        }
    },
    
    // 使用 watch
    watch: {
        firstName: function(newVal, oldVal) {
            this.fullName2 = newVal + ' ' + this.lastName;
        },
        lastName: function(newVal, oldVal) {
            this.fullName2 = this.firstName + ' ' + newVal;
        },
    }
}
</script>
```
![image](https://user-gold-cdn.xitu.io/2018/11/1/166cafdda21ccc5b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- computed 监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算；而 watch 监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。


## 15. 统一管理缓存变量

- 在项目中或多或少会使用浏览器缓存，比如 sessionStorage 和 localStorage，当一个项目中存在很多这样的缓存存取情况的时候就会变得难以维护和管理，因为其就像全局变量一样散落在项目的各个地方，这时候我们应该将这些变量统一管理起来，放到一个或多个文件中去，比如：

```js
/* types.js */

export const USER_NAME = 'userName';
export const TOKEN = 'token';
```

- 在需要存取的时候，直接引用：

```js
import { USER_NAME, TOKEN } from '../types.js'

sessionStorage[USER_NAME] = '张三';
localStorage[TOKEN] = 'xxx';
```

- 使用这种方法的好处在于一旦我们需要修改变量名，直接修改管理文件中的值即可，无需修改使用它的页面，同时这也可以避免命名冲突等问题的出现，这类似于 vuex 中 mutations 变量的管理。


## 16. 使用 setTimeout 代替 setInterval

- 一般情况下我们在项目里不建议使用 setInterval，因为其会存在代码的执行间隔比预期小以及 “丢帧” 的现象，原因在于其本身的实现逻辑。很多人会认为 setInterval 中第二个时间参数的作用是经过该毫秒数执行回调方法，其实不然，其真正的作用是经过该毫秒数将回调方法放置到队列中去，但是如果队列中存在正在执行的方法，其会等待之前的方法完毕再执行，如果存在还未执行的代码实例，其不会插入到队列中去，也就产生了 “丢帧”。

- 而 setTimeout 并不会出现这样的现象，因为每一次调用都会产生了一个新定时器，同时在前一个定时器代码执行完之前，不会向队列插入新的定时器代码。

```js
// 该定时器实际会在 3s 后立即触发下一次回调
setInterval(() => {
    // 执行完这里的代码需要 2s
}, 1000);

// 使用 setTimeout 改写，4秒后触发下一次回调
let doSometing = () => {
    // 执行完这里的代码需要 2s
    
    setTimeout(doSometing, 1000);
}

doSometing();
```

## 17. 不要使用 for in 循环来遍历数组

- 大家应该都知道 for in 循环是用于遍历对象的，但它可以用来遍历数组吗？答案是可以的，因为数组在某种意义上也是对象，但是如果用其遍历数组会存在一些隐患：其会遍历数组原型链上的属性。

```js
let arr = [1, 2];

for (let key in arr) {
    console.log(arr[key]); // 会正常打印 1, 2
}

// 但是如果在 Array 原型链上添加一个方法
Array.prototype.test = function() {};

for (let key in arr) {
    console.log(arr[key]); // 此时会打印 1, 2, ƒ () {}
}
```

- 因为我们不能保证项目代码中不会对数组原型链进行操作，也不能保证引入的第三方库不对其进行操作，所以不要使用 for in 循环来遍历数组。



