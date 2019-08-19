# forEach、filter、map、some、every、find、findIndex、reduce间的区别

## 1. 批量操作（forEach和map）

- forEach和map的最大区别就在于，forEach没有返回值。 即便你给forEach加上return也没用

```js
potatos.forEach(potato => { potato.weight += 20 })
potatos.map(potato => { potato.weight += 20 })
```


## 2. 筛选过滤（filter）

- 返回一个新的对象数组，并不会改变原数组

```js
var bigOnes = potatos.filter(potato => { return potato.weight > 100 })

//[ { id: '1003', weight: 120 }, { id: '1005', weight: 110 } ]
```

## 3. 有符合（some）

- 当只需要判断数组中有没有符合条件的时候（一个就行） 就需要我们的some

- some只要找到一个符合条件的，就回来报告true 所以并不会全部遍历，不做多余的活（性能优良）


```js
var hasbig = potatos.some(potato => { return potato.weight > 100 })

//true
```

## 4. 全符合（every）

- every因为要检查所有元素是否都符合条件，所以性能比较差 因此一些简单的情况，可以反向检查 比如这一例，可以换成用some检查是否有小个的，再将结果取反，就可以减少遍历，节省性能


```js
var allbig = potatos.every(potato => { return potato.weight > 100 })

//false

var allbig=!potatos.some(potato => { return potato.weight <= 100 })

//false
```

## 5. 返回一个符合的（find）

```js
var big = potatos.find(potato => { return potato.weight > 100 })

//{ id: '1003', weight: 120 }
```
- find和some很类似，都是寻找符合条件的，有一个就可以 不过some进去搜罗了一圈回来报了个“有”（true），而find则把那个土豆抱了出来（返回第一个符合条件的对象）


```js
var i = potatos.findIndex(potato=>{ return potato.weight > 100 })

//2
```
- 当需要知道所需元素的索引，就可以用findIndex。findIndex返回第一个符合条件的索引号


## 6. 递归累加（reduce）

```js
var sum = weight.reduce((sum, w) => { return w + sum },0)

//460
//并不会改变原表格
```
- reduce()方法接收一个回调函数作为第一个参数，回调函数又接受四个参数，分别是：
    1. previousValue =>初始值或上一次回调函数叠加的值；
    2. currentValue => 本次回调（循环）将要执行的值；
    3. index=>“currentValue”的索引值；
    4. arr => 数组本身；
    reduce()方法返回的是最后一次调用回调函数的返回值；


