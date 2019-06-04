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
```
## 2.使用同一个方法处理数组和单一元素

```js
<!--只需要先将它们并成一个数组，然后处理这个数据-->
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
<!--为了快速检测javascript代码块的执行效率，我们可以使用 console 方法，比如 console.time(label) 和 console.timeEnd(label)-->
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


```
<!--在node中，你可以告知程序在require(‘./something.js’) 和 node something.js 时触发不同的代码。-->
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