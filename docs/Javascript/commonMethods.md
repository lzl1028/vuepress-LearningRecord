# Javascript常用操作

## 1. 使用!!将变量转换成布尔类型

- 有时，我们需要检查一些变量是否存在，或者它是否具有有效值，从而将它们的值视为true。对于做这样的检查，你可以使用!!（双重否定运算符），它能自动将任何类型的数据转换为布尔值，只有这些变量才会返回false：0，null，""，undefined或NaN，其他的都返回true。我们来看看这个简单的例子：

```js
function 
Account(cash) {  
    this.cash = cash;
    this.hasMoney = 
!!cash;
}
var account = new Account(100.50);  
console.log(account.cash); // 
100.50  
console.log(account.hasMoney); // true

var emptyAccount = new Account(0);  
console.log(emptyAccount.cash); // 
0  
console.log(emptyAccount.hasMoney); // 
false 
```

## 2. 使用+将变量转换成数字

- 这个转换超级简单，但它只适用于数字字符串，不然就会返回NaN（不是数字）。

```js
function 
toNumber(strNumber) {  
    return 
+strNumber;
}
console.log(toNumber("1234")); // 
1234  
console.log(toNumber("ACB")); // 
NaN 
```

- 这个转换操作也可以作用于Date，在这种情况下，它将返回时间戳：

```
console.log(+new Date()) // 
1461288164385 
```

## 3. 短路条件

- 如果你看到过这种类似的代码:
```js
if (conected) {  
    
login();
}

==>那么你可以在这两个变量之间使用&&（AND运算符）来缩短代码。
例如，前面的代码可以缩减到一行：

conected 
&& login(); 
```

## 4. 在循环中缓存array.length

```js
var 
length = array.length;  
for (var i = 0; i < length; i++) {  
    
console.log(array);
}
<!--或-->

for (var i = 0, length = 
array.length; i < length; i++) {  
    console.log(array);
}
```

## 5. 检测对象中的属性

- 当你需要检查某些属性是否存在，避免运行未定义的函数或属性时，这个技巧非常有用。如果你打算编写跨浏览器代码，你也可能会用到这个技术。例如，我们假设你需要编写与旧版Internet 
Explorer 6兼容的代码，并且想要使用document.querySelector()来通过ID获取某些元素。 
但是，在现代浏览器中，这个函数不存在。所以，要检查这个函数是否存在，你可以使用in运算符。看下这个例子：

```js
if ('querySelector' 
in document) {  
    document.querySelector("#id");
} else {
    
document.getElementById("id");
}
```

## 6. 获取数组的最后一个元素

- Array.prototype.slice（begin，end）可以用来裁剪数组。但是如果没有设置结束参数end的值的话，该函数会自动将end设置为数组长度值。我认为很少有人知道这个函数可以接受负值，如果你将begin设置一个负数的话，你就能从数组中获取到倒数的元素：

```js
var 
array = [1, 2, 3, 4, 5, 6];  
console.log(array.slice(-1)); // 
[6]  
console.log(array.slice(-2)); // 
[5,6]  
console.log(array.slice(-3)); // [4,5,6] 
```

## 7. 数组截断

- 这个技术可以锁定数组的大小，这对于要删除数组中固定数量的元素是非常有用的。例如，如果你有一个包含10个元素的数组，但是你只想获得前五个元素，则可以通过设置array.length = 5来阶段数组。看下这个例子：

```js
var array = [1, 2, 3, 4, 5, 
6];  
console.log(array.length); // 6  
array.length = 
3;  
console.log(array.length); // 3  
console.log(array); // 
[1,2,3] 
```

## 8. 全部替换

- String.replace()函数允许使用String和Regex来替换字符串，这个函数本身只能替换第一个匹配的串。但是你可以在正则表达式末尾添加/g来模拟replaceAll()函数：

```js
var 
string = "john john";  
console.log(string.replace(/hn/, "ana")); // "joana 
john"  
console.log(string.replace(/hn/g, "ana")); // "joana joana" 
```

## 9. 合并数组

- 如果你需要合并两个数组，你可以使用Array.concat()函数：

```js
var array1 = [1, 2, 
3];  
var array2 = [4, 5, 6];  
console.log(array1.concat(array2)); // 
[1,2,3,4,5,6]; 
```

- 但是，这个函数对于大数组来说不并合适，因为它将会创建一个新的数组并消耗大量的内存。在这种情况下，你可以使用Array.push.apply（arr1，arr2），它不会创建一个新数组，而是将第二个数组合并到第一个数组中，以减少内存使用：

```js
var array1 = [1, 2, 3];  
var array2 = [4, 5, 6];  
console.log(array1.push.apply(array1, array2)); 
// 
[1,2,3,4,5,6]; 
```

## 10. 把NodeList转换成数组

- 如果运行document.querySelectorAll("p")函数，它会返回一个DOM元素数组，即NodeList对象。但是这个对象并没有一些属于数组的函数，例如：sort()，reduce()，map()，filter()。为了启用这些函数，以及数组的其他的原生函数，你需要将NodeList转换为数组。要进行转换，只需使用这个函数：[] 
.slice.call（elements）

```js
var elements = document.querySelectorAll("p"); // 
NodeList  
var arrayElements = [].slice.call(elements); // 现在已经转换成数组了
var 
arrayElements = Array.from(elements); // 把NodeList转换成数组的另外一个方法
```

## 11. 对数组元素进行洗牌

- 如果要像外部库Lodash那样对数据元素重新洗牌，只需使用这个技巧：

```js
var list = [1, 2, 
3];  
console.log(list.sort(function() {  
    return Math.random() - 
0.5
})); // [2,1,3]
```

- 方法二：

```js
const arrayShuffle = array => {
    if (!Array.isArray(array)) {
        throw new Error('Argument must be an array')
	}
    let end = array.length
    if (!end) {
        return array
    }
    while (end) {
        let start = Math.floor(Math.random() * end--)
        ;[array[start], array[end]] = [array[end], array[start]]
    }
    return array
}

// e.g.
arrayShuffle([1, 2, 3])
```

## 12. 实现值交换
1. var temp = a; a = b; b = temp; (传统，但需要借助临时变量)
2. a ^= b; b ^= a; a ^= b; (需要两个整数)
3. b = [a, a = b][0] (借助数组)
4. [a, b] = [b, a]; (ES6，解构赋值)
5. a = a + b; b = a - b; a = a - b; (小学奥赛题)

## 13. 去掉小数部分
- parseInt(num)
- ~~num
- num >> 0
- num | 0

## 14. 判断 x 是否是整数

```js
function isInt(x) {
  return (x ^ 0) === x
}
// return Math.round(x) === x
// return (typeof x === 'number') && (x % 1 === 0)
// ES6 -> Number.isInteger()
```

## 15. 递归求阶乘

```js
function factorial(n) {
  return (n > 1) ? n * f(n - 1) : n
}
```

## 16. 判断符号是否相同

```js
function sameSign(a, b) {
  return (a ^ b) >= 0
}
```

## 17. 克隆数组
- arr.slice(0)

## 18. 数组去重

```js
// ES6
Array.from(new Set(arr))

// ES5
arr.filter(function(ele, index, array){
    return index===array.indexOf(ele)
})
```

## 19. 数组最大值

```js
function maxArr(arr) {
  return Math.max.apply(null, arr)
}
```

## 20. 数组最小值

```js
function minArr(arr) {
  return Math.min.apply(null, arr)
}
```

## 21. 随机获取数组的一个成员

```js
function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
```

## 22. 产生随机颜色

```js
function getRandomColor() {
    return `#${Math.random().toString(16).substr(2, 6)}`
}
```

## 23. 随机生成指定长度的字符串

```js
function randomStr(n) {
  let standard = 'abcdefghijklmnopqrstuvwxyz9876543210'
  let len = standard.length
  let result = ''

  for (let i = 0; i < n; i++) {
    result += standard.charAt(Math.floor(Math.random() * len))
  }

  return result
}
```

## 24. 深拷贝

- JSON.parse(JSON.stringify(obj))

## 25. 回到顶部

1. **锚点**

- 使用锚点链接是一种简单的返回顶部的功能实现。该实现主要在页面顶部放置一个指定名称的锚点，然后在页面下方放置一个返回到该锚点的链接，用户点击该链接即可返回到该锚点所在的位置。原理和实现都很简单，核心就是通过锚点跳转到指定元素位置，然后把要跳转的元素放到页面顶部。

```html
<body style="height: 2000px;">
    <div id="topAnchor"></div>
    <a href="#topAnchor" style="position: fixed;right: 0;bottom: 0;">回到顶部</a>
</body>
```

2. scrollTop

- scrollTop属性表示被隐藏在内容区域上方的像素数。元素未滚动时，scrollTop的值为0，如果元素被垂直滚动了，scrollTop的值大于0，且表示元素上方不可见内容的像素宽度。可以利用scrollTop来实现回到顶部的功能，修改body的scrollTop。示例如下：
JavaScript实现回到顶部功能的五种方法，建议收藏

```html
<body style="height: 2000px;">
    <button id="test" style="position: fixed;right: 0;bottom: 0;">回到顶部</button>
    <script>
        var test = document.getElementById("test");
        test.onclick = function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    </script>
</body>
```

3. scrollTo()

- scrollTo(x,y)是js原生的方法，作用是滚动当前window中显示的文档至（x,y）点。这是很常用的一种方法，设置scrollTo(0,0)就可以实现回到顶部的效果。示例如下：

```html
<body style="height: 2000px;">
    <button id="test" style="position: fixed;right: 0;bottom: 0;">回到顶部</button>
    <script>
        var test = document.getElementById("test");
        test.onclick = function(){
            // document.body.scrollTop = document.documentElement.scrollTop = 0;
            scrollTo(0,0);
        }
    </script>
</body>
```

4. scrollBy()

- scrollBy(x,y)方法滚动当前window中显示的文档，x和y指定滚动的相对量。只要把当前页面的滚动长度作为参数，逆向滚动，则可以实现回到顶部的效果。

```html
<body style="height: 2000px;">
    <button id="test" style="position: fixed;right: 0;bottom: 0;">回到顶部</button>
    <script>
        var test = document.getElementById("test");
        test.onclick = function(){
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            console.log(top);
            scrollBy(0,-top);
        }
    </script>
</body>
```

5. scrollIntoView()

- Element.scrollIntoView方法可以滚动当前元素，使其进入浏览器的可见区域。该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。

- 使用该方法的原理与使用锚点的原理类似，在页面最上方设置目标元素，当页面滚动时，目标元素被滚动到页面区域以外，点击回到顶部按钮，使目标元素重新回到原来位置，则达到预期效果。

```html
<body style="height: 2000px;">
    <div id="target"></div>
    <button id="test" style="position: fixed;right: 0;bottom: 0;">回到顶部</button>
    <script>
        var test = document.getElementById("test");
        var target = document.getElementById('target');
        test.onclick = function(){
            target.scrollIntoView();
        }
    </script>
</body>
```

## 26. 延迟函数delay

```js
const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const getData = status => new Promise((resolve, reject) => {
    status ? resolve('done') : reject('fail')
})
const getRes = async (data) => {
    try {
        const res = await getData(data)
        const timestamp = new Date().getTime()
        await delay(1000)
        console.log(res, new Date().getTime() - timestamp)
    } catch (error) {
        console.log(error)
    }
}
getRes(true) // 隔了1秒
```

## 27. 函数柯里化

```js
const curring = fn => {
    const { length } = fn
    const curried = (...args) => {
        return (args.length >= length
              ? fn(...args)
              : (...args2) => curried(...args.concat(args2)))
    }
    return curried
}

const listMerge = (a, b, c) => [a, b, c]
const curried = curring(listMerge)
console.log(curried(1)(2)(3)) // [1, 2, 3]

console.log(curried(1, 2)(3)) // [1, 2, 3]

console.log(curried(1, 2, 3)) // [1, 2, 3]
```

## 获取当前子元素是其父元素下子元素的排位

```js
const getIndex = el => {
    if (!el) {
        return -1
    }
    let index = 0
    do {
        index++
    } while (el = el.previousElementSibling);
    return index
}

// el: document.getElementById()
```

## 获取当前元素相对于浏览器视口的偏移量

```js
const getOffset = el => {
    const {
        top,
        left
    } = el.getBoundingClientRect()
    const {
        scrollTop,
        scrollLeft
    } = document.body
    return {
        top: top + scrollTop,
        left: left + scrollLeft
    }
}
```

## 获取元素类型

```js
const dataType = obj => Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
```

## 判断是否是移动端

```js
const isMobile = () => 'ontouchstart' in window
```

## 判断是否支持webp图片格式

```js
const canUseWebp = () => (document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0)

// e.g.
canUseWebp() // 新版的chrome里为true，火狐里为false
```

## fade动画

```js
const fade = (el, type = 'in') {
    el.style.opacity = (type === 'in' ? 0 : 1)
    let last = +new Date()
    const tick = () => {
        const opacityValue = (type === 'in' 
            ? (new Date() - last) / 400 // 400: 动画时间
            : -(new Date() - last) / 400)
        el.style.opacity = +el.style.opacity + opacityValue
    	last = +new Date()
        if (type === 'in'
          ? (+el.style.opacity < 1)
          : (+el.style.opacity > 0)) {
            requestAnimationFrame(tick)
        }
    }
    tick()
}
```

## 将指定格式的字符串解析为日期字符串

```js
const dataPattern = (str, format = '-') => {
    if (!str) {
        return new Date()
    }
    const dateReg = new RegExp(`^(\\d{2})${format}(\\d{2})${format}(\\d{4})$`)
    const [, month, day, year] = dateReg.exec(str)
    return new Date(`${month}, ${day} ${year}`)
} 

console.log(dataPattern('12-25-1995')) // Mon Dec 25 1995 00:00:00 GMT+0800 (中国标准时间)
```

## 禁止网页复制粘贴

```js
const html = document.querySelector('html')
html.oncopy = () => false
html.onpaste = () => false
```

## input框限制只能输入中文

```js
const input = document.querySelector('input[type="text"]')
const clearText = target => {
    const {
        value
    } = target
    target.value = value.replace(/[^\u4e00-\u9fa5]/g, '')
}
input.onfocus = ({target}) => {
    clearText(target)
}
input.onkeyup = ({target}) => {
    clearText(target)
}
input.onblur = ({target}) => {
    clearText(target)
}
input.oninput = ({target}) => {
    clearText(target)
}
```

## 去除字符串中的html代码

```js
const removeHTML = (str = '') => str.replace(/<[\/\!]*[^<>]*>/ig, '')
console.log(removeHTML('<h1>哈哈哈哈<呵呵呵</h1>')) // 哈哈哈哈<呵呵呵
```

## 返回日期数列里与目标数列最近的日期下标

```js
const getNearestDateIndex = (targetDate, dates) => {
    if (!targetDate || !dates) {
        throw new Error('Argument(s) is illegal !')
    }
    if (!dates.length) {
        return -1
    }
    const distances = dates.map(date => Math.abs(date - targetDate))
    return distances.indexOf(Math.min(...distances))
}

// e.g.
const targetDate = new Date(2019, 7, 20)
const dates = [
  new Date(2018, 0, 1),
  new Date(2019, 0, 1),
  new Date(2020, 0, 1),
]
getNearestDateIndex(targetDate, dates) // 2
```

## 返回日期数列里最小的日期

```js
const getMinDate = dates => {
    if (!dates) {
        throw new Error('Argument(s) is illegal !')
    }
    if (!dates.length) {
        return dates
	}
    return new Date(Math.min.apply(null, dates)).toISOString()
}

// e.g.
const dates = [
  new Date(2018, 3, 10),
  new Date(2019, 3, 10),
  new Date(2020, 3, 10),
]
getMinDate(dates) // 2018-04-09T16:00:00.000Z
```

## 连字符转驼峰

```js
const toCamelCase = (str = '', separator = '-') => {
    if (typeof str !== 'string') {
        throw new Error('Argument must be a string')
    }
    if (str === '') {
        return str
    }
    const newExp = new RegExp('\\-\(\\w\)', 'g')
    return str.replace(newExp, (matched, $1) => {
        return $1.toUpperCase()
    })
}

// e.g.
toCamelCase('hello-world') // helloWorld
```

## 驼峰转连字符

```js
const fromCamelCase = (str = '', separator = '-') => {
    if (typeof str !== 'string') {
        throw new Error('Argument must be a string')
    }
    if (str === '') {
        return str
    }
    return str.replace(/([A-Z])/g, `${separator}$1`).toLowerCase()
}

// e.g.
fromCamelCase('helloWorld') // hello-world
```

## 等级判断

```js
const getLevel = (value = 0, ratio = 50, levels = '一二三四五') => {
    if (typeof value !== 'number') {
        throw new Error('Argument must be a number')
    }
    const levelHash = '一二三四五'.split('')
	const max = levelHash[levelHash.length - 1]
	return levelHash[Math.floor(value / ratio)] || max
}

// e.g.
getLevel1(0) // 一
getLevel1(40) // 一
getLevel(77) // 二
```

## 判断dom是否相等

```js
const isEqualNode = (dom1, dom2) => dom1.isEqualNode(dom2)

/*
    <div>这是第一个div</div>
    <div>这是第二个div</div>
    <div>这是第一个div</div>
*/
const [一, 二, 三,] = document.getElementsByTagName('div')

// e.g.
isEqualNode(一, 二) // false
isEqualNode(一, 三) // true
isEqualNode(二, 三) // false
```

## 获取指定范围内的随机数

```js
const getRandom = (min = 0, max = 100) => {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Argument(s) is illegal !')
	}
    if (min > max) {
        [min, max] = [max, min]
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// e.g.
getRandom(1, 100) // 89
getRandom(1, 100) // 5
```

## 文件尺寸格式化

```js
const formatSize = size => {
    if (typeof +size !== 'number') {
        throw new Error('Argument(s) is illegal !')
	}
    const unitsHash = 'B,KB,MB,GB'.split(',')
    let index = 0
    while (size > 1024 && index < unitsHash.length) {
        size /= 1024
        index++
    }
    return Math.round(size * 100) / 100 + unitsHash[index]
}
formatSize('10240') // 10KB
formatSize('10240000') // 9.77MB
```

## 获取数组前/后指定数量元素

```js
const arrayRange = (array, index, distance = '+') => {
    if (!Array.isArray(array) || typeof index !== 'number' || index < 0) {
        throw new TypeError('Argument(s) is illegal');
    }
    return array.slice(0, `${distance}${index}`)
}

arrayRange(['a', 'b', 'c'], 2) // ["a", "b"]
arrayRange(['a', 'b', 'c'], 2, '-') // ["a"]
```

## 用户名-手机号加密特殊处理

### 用户名-只保留姓氏或中间字符特殊处理

1. 方法 1:封装函数,利用substr截取字符串**

```js
function formatName(name) {
  let newStr;
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*'; // 通过substr截取字符串从第0位开始截取,截取1个
  } else if (name.length > 2) {
    // 当名字大于2位时
    let char = '';
    for (let i = 0, len = name.length - 2; i < len; i++) {
      // 循环遍历字符串
      char += '*';
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
    newStr = name;
  }

  return newStr;
}
console.log(formatName('王海龙')); // 输出 王*龙
```

2. 方法 2: 使用正则表达式，只保留姓后面都变为`***``

```js
var str = '王小明';
var reg = /(?<=.)./g;
result = str.replace(reg, '*');
console.log(result); // 王**
```

### 手机号码中间 4 位用星号（*）替换显示

1. 方法 1: 使用正则表达式

```js
var phone = '13701134148';
var resultPhone = phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
console.log(resultPhone); // 137****4148
```

2. 方法 2: 使用substr方法,字符串截取

```js
var phone = '13701134148';
var mphone = phone.substr(0, 3) + '****' + phone.substr(7);
console.log(mphone);
// 如果用 Es6 模板字符串的话,可以不用+号做拼接
var phone = '13701134148';
var mphone = `${phone.substr(0, 3)}****${phone.substr(7)}`;
```

