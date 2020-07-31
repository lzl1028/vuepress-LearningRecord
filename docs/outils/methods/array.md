# JS数组骚操作

## 随机排序

### 1、生成随机数

遍历数组，每次循环都随机一个在数组长度范围内的数，并交换本次循环的位置和随机数位置上的元素

```js
function randomSort1(arr) {
    for(let i = 0, l = arr.length; i < l; i ++) {
        let rc = parseInt(Math.random() * l)
        // 让当前循环的数组元素和随机出来的数组元素交换位置
        const empty = arr[i]
        arr[i] = arr[rc]
        arr[rc] = empty
    }
    return arr;
}

var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 下面两次的结果肯定是不一样的；
console.log(randomSort1(arr1))
console.log(randomSort1(arr1))
```

### 2、生成新数组

1. 申明一个新的空数组,利用 while 循环，如果数组长度大于 0，就继续循环；

2. 每次循环都随机一个在数组长度范围内的数，将随机数位置上的元素 push 到新数组里，

3. 并利用 splice（对 splice 不太理解的同学可以看这里）截取出随机数位置上的元素，同时也修改了原始数组的长度；

```js
function randomSort2(arr) {
  var mixedArr = []
  while (arr.length > 0) {
    let rc = parseInt(Math.random() * arr.length)
    mixedArr.push(arr[rc])
    arr.splice(rc, 1)
  }
  return mixedArr
}
// 例子
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(randomSort2(arr1))
```

### 3、 arr.sort

1. 如果 compareFunction(a, b)的返回值 小于 0 ，那么 a 会被排列到 b 之前；

2. 如果 compareFunction(a, b)的返回值 等于 0 ，那么 a 和 b 的相对位置不变；

3. 如果 compareFunction(a, b)的返回值 大于 0 ，那么 b 会被排列到 a 之前；

```js
function randomSort3(arr) {
  arr.sort(function (a, b) {
    return Math.random() - 0.5
  })
  return arr
}
// 例子
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(randomSort3(arr1))
```

## 数组对象排序

### 1、单个属性排序

```js
function compare(property) {
  return function (a, b) {
    let value1 = a[property]
    let value2 = b[property]
    return value1 - value2
  }
}

let arr = [
  { name: 'zopp', age: 10 },
  { name: 'gpp', age: 18 },
  { name: 'yjj', age: 8 },
]

console.log(arr.sort(compare('age')))
```

### 2、多个属性排序

```js
function by(name, minor) {
  return function(o, p) {
    let a, b
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name]
      b = p[name]
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      thro('error')
    }
  }
}
```

## 数组扁平化

### 1、调用 ES6 中的 flat 方法

```js
ary = arr.flat(Infinity)

console.log([1, [2, 3, [4, 5, [6, 7]]]].flat(Infinity))
```

### 2、普通递归

```js
let result = []
let flatten = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if (Array.isArray(arr[i])) {
      flatten(item)
    } else {
      result.push(item)
    }
  }
  return result
}

let arr = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(arr))
```

### 3、利用 reduce 函数迭代

```js
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

let arr = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(arr))
```

### 4、扩展运算符

```js
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

let arr = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(arr))
```

## 数组去重

### 1、利用数组的 indexOf 下标属性来查询

```js
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```

### 2、先将原数组排序，在与相邻的进行比较，如果不同则存入新数组。

```js
function unique(arr) {
  var formArr = arr.sort()
  var newArr = [formArr[0]]
  for (let i = 1; i < formArr.length; i++) {
    if (formArr[i] !== formArr[i - 1]) {
      newArr.push(formArr[i])
    }
  }
  return newArr
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```

### 3、利用对象属性存在的特性，如果没有该属性则存入新数组。

```js
function unique(arr) {
  var obj = {}
  var newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```

### 4、利用数组原型对象上的 includes 方法。

```js
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```

### 5、利用数组原型对象上的 filter 和 includes 方法。

```js
function unique(arr) {
  var newArr = []
  newArr = arr.filter(function (item) {
    return newArr.includes(item) ? '' : newArr.push(item)
  })
  return newArr
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```

### 6、利用 ES6 的 set 方法。

```js
function unique(arr) {
  return Array.from(new Set(arr)) // 利用Array.from将Set结构转换成数组
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]))
```

## 根据属性去重

### 方法一：

```js
function unique(arr) {
  const res = new Map()
  return arr.filter((item) => !res.has(item.productName) && res.set(item.productName, 1))
}
```

### 方法二：

```js
function unique(arr) {
  let result = {}
  let obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].key]) {
      result.push(arr[i])
      obj[arr[i].key] = true
    }
  }
}
```

## 交集/并集/差集

### 1、includes 方法结合 filter 方法

```js
let a = [1, 2, 3]
let b = [2, 4, 5]

// 并集
let union = a.concat(b.filter((v) => !a.includes(v)))
// [1,2,3,4,5]

// 交集
let intersection = a.filter((v) => b.includes(v))
// [2]

// 差集
let difference = a.concat(b).filter((v) => !a.includes(v) || !b.includes(v))
// [1,3,4,5]
```

### 2、ES6 的 Set 数据结构

```js
let a = new Set([1, 2, 3])
let b = new Set([2, 4, 5])

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4,5}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)))
// set {2}

// a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x)))
// Set {1, 3}
```

## 数组求和

### 1、万能的 for 循环

```js
function sum(arr) {
  var s = 0
  for (var i = arr.length - 1; i >= 0; i--) {
    s += arr[i]
  }
  return s
}

sum([1, 2, 3, 4, 5]) // 15
```

### 2、递归方法

```js
function sum(arr) {
  var len = arr.length
  if (len == 0) {
    return 0
  } else if (len == 1) {
    return arr[0]
  } else {
    return arr[0] + sum(arr.slice(1))
  }
}

sum([1, 2, 3, 4, 5]) // 15
```

### 3、ES6 的 reduce 方法

```js
function sum(arr) {
  return arr.reduce(function (prev, curr) {
    return prev + curr
  }, 0)
}

sum([1, 2, 3, 4, 5]) // 15
```

## 类数组转化

### 1、Array 的 slice 方法

```js
let arr = Array.prototype.slice.call(arguments)
```

### 2、ES6 的 Array.from()

```js
let arr = Array.from(arguments)
```

### 3、扩展运算符...

```js
let arr = [...arguments]
```

## 数组上下移动

```js
function swapItems(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

function up(arr, index) {
  if (index === 0) {
    return
  }
  this.swapItems(arr, index, index - 1)
}

function down(arr, index) {
  if (index === this.list.length - 1) {
    return
  }
  this.swapItems(arr, index, index + 1)
}
```

## 数组转化为树形结构

```js
let arr = [
  {
    id: 1,
    name: '1',
    pid: 0,
  },
  {
    id: 2,
    name: '1-1',
    pid: 1,
  },
  {
    id: 3,
    name: '1-1-1',
    pid: 2,
  },
  {
    id: 4,
    name: '1-2',
    pid: 1,
  },
  {
    id: 5,
    name: '1-2-2',
    pid: 4,
  },
  {
    id: 6,
    name: '1-1-1-1',
    pid: 3,
  },
  {
    id: 7,
    name: '2',
  },
]
```

```js
function toTree(data, parentId = 0) {
  var itemArr = []
  for (var i = 0; i < data.length; i++) {
    var node = data[i]
    if (node.pid === parentId) {
      var newNode = {
        ...node,
        name: node.name,
        id: node.id,
        children: toTree(data, node.id),
      }
      itemArr.push(newNode)
    }
  }
  return itemArr
}

console.log(toTree(arr))
```