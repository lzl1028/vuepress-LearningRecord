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





