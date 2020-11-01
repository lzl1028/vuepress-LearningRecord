# JavaScript深拷贝

## 深拷贝的方法：

- eg:

```
const obj = {
 arr: [111, 222],
 obj: {key: '对象'},
 a: () => {console.log('函数')},
 date: new Date(),
 reg: /正则/ig
}
```

### 1. JSON.parse(JSON.stringify(obj))

- 这种方法存在一些缺点，由于它是依赖于JSON，因此它不支持JSON不支持的其他格式，通过JSON的官网可知，JSON只支持object,array,string,number,true,false,null这几种数据或者值，其他的比如函数，undefined，Date，RegExp等数据类型都不支持。对于它不支持的数据都会直接忽略该属性。

```
JSON.parse(JSON.stringify(obj))
```
1. 对象中不能有函数，否则无法序列化

2. 对象中不能有undefined，否则无法序列化

3. 对象中不能有RegExp正则，否则无法序列化

   - 如果对象属性中存在正则，使用JSON.parse(JSON.stringify))克隆后会被忽略，最终变成空。

4. Date类型数据会被转化为字符串类型
   
   - 如果对象中存在Date类型的数据，会被转换成字符串，从而丢失Date的一些特性，比如时间格式化等方法。

5. 对象不能是环状结构的，否则会导致报错

   - 所谓环状结构的对象，就是对象的属性又指向了自身，window就是最常见的一个环状对象。
   ```js
   let obj = {name:'hello'}
   obj.self = obj   // self属性又指向了obj对象，形成了一个换
   ```
   - 这种环状结构的对象，在使用JSON.parse(JSON.stringify)深拷贝时会报错。
### 2. 使用for...in加递归完成

```
function isObj(obj) {
 return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}
function deepCopy(obj) {
 let tempObj = Array.isArray(obj) ? [] : {}
 for(let key in obj) {
 tempObj[key] = isObj(obj[key]) ? deepCopy(obj[key]) : obj[key]
 }
 return tempObj
}
```

## 缺点

- 两个方法都无法拷贝函数，date，reg类型的对象

## 解决方案：

```js
// 只解决date，reg类型，其他的可以自己添加

function deepCopy(obj, hash = new WeakMap()) {
 let cloneObj
 let Constructor = obj.constructor
 switch(Constructor){
     case RegExp:
        cloneObj = new Constructor(obj)
     break
     case Date:
        cloneObj = new Constructor(obj.getTime())
     break
     default:
         if(hash.has(obj)) return hash.get(obj)
         cloneObj = new Constructor()
         hash.set(obj, cloneObj)
 }
 for (let key in obj) {
    cloneObj[key] = isObj(obj[key]) ? deepCopy(obj[key], hash) : obj[key];
 }
 return cloneObj
}
```

- 拷贝复杂对象：Array, Function, RegExp, Date

```js

function deepClone(target){
  if(target instanceof Object){
      let dist ;
      if(target instanceof Array){
        // 拷贝数组
        dist = [];
      }else if(target instanceof Function){
        // 拷贝函数
        dist = function () {
          return target.call(this, ...arguments);
        };
      }else if(target instanceof RegExp){
        // 拷贝正则表达式
       dist = new RegExp(target.source,target.flags);
      }else if(target instanceof Date){
          dist = new Date(target);
      }else{
        // 拷贝普通对象
        dist = {};
      }
      for(let key in target){
          dist[key] = deepClone(target[key]);
      }
      return dist;
  }else{
      return target;
  }
}
```

### 代码优化

1. 忽略原型上的属性

我们在遍历对象的属性的时候，使用的是for in，for in 会遍历包括原型上的所有可迭代的属性。 比如：

```js
let a = Object.create({name:'hello'});
a.age = 14;
```

那么使用遍历时，会遍历name和age属性。而不仅仅是a自身身上的age属性。但是，事实上我们不应该去遍历原型上的属性，因为这样会导致对象属性非常深。因此，使用for in遍历时我们最好把原型上的属性和自身属性区分开来，通过hasOwnProperty筛选出自身的属性进行遍历。

```js
    for (let key in source) {
      // 只遍历本身的属性
      if(source.hasOwnProperty(key)){
        dist[key] = deepClone(source[key]);
      }
    }
```

2. 环状对象的爆栈问题

在之前使用JSON.parse(JSON.stringify())拷贝对象时，就遇到过如果出现环状对象，会导致报错问题。那么使用我们自己的深拷贝函数同样会遇到问题。这是由于我们在deepClone函数中使用了递归，按理来说每一个递归应该有一个终止条件的，但是由于对象树结构一般会有终点，因此会自动在终点结束递归。但是如果一个对象有属性指向自身，那么就会形成一个环

```js
let a = {name:"小明"};
a.self = a;   // a的self属性指向a
```

在进行递归调用的过程中会无限循环，最终爆栈。因此，我们需要添加递归终止条件。所谓的递归终止条件，就是判断一个对象是否已经被克隆过了，如果被克隆过了那么就直接使用克隆后的对象，不再进行递归。因此，我们需要一个东西来保存可能重复的属性以及它的克隆地址。最好的方式就是map。

```js
let cache = new Map();
function deepClone(target){
  if(cache.get(target)){
      return cache.get(target)
  }
  if(target instanceof Object){
      let dist ;
      if(target instanceof Array){
        // 拷贝数组
        dist = [];
      }else if(target instanceof Function){
        // 拷贝函数
        dist = function () {
          return target.call(this, ...arguments);
        };
      }else if(target instanceof RegExp){
        // 拷贝正则表达式
       dist = new RegExp(target.source,target.flags);
      }else if(target instanceof Date){
          dist = new Date(target);
      }else{
        // 拷贝普通对象
        dist = {};
      }
      // 将属性和拷贝后的值作为一个map
      cache.set(target, dist);
      for(let key in target){
          // 过滤掉原型身上的属性
        if (target.hasOwnProperty(key)) {
            dist[key] = deepClone(target[key]);
        }
      }
      return dist;
  }else{
      return target;
  }
}
```

3. 共用缓存导致的互相影响问题

在上面的deepClone函数中，我们通过新增了一个缓存cache来保存已经克隆过的对象和它对应的克隆地址。但是这种方式会带来一个新的问题：由于每次克隆创建一个对象都会使用这个cache，这样的话会导致克隆一个新的对象受到上一个克隆对象的影响。示例：

```js
  let a = {
    name:"hello",
  }     
  let a1 = deepClone(a);
  console.log(map);  //{ name: 'hello' } => { name: 'hello' }
  let b = {
    age:24
  }
  let b1 = deepClone(b);
  console.log(map);  //   { name: 'hello' } => { name: 'hello' },{ age: 24 } => { age: 24 } }

```

在深拷贝对象b的时候，map中已经有值了{ name: 'hello' }。而事实上这些值不是b身上已经拷贝过的属性。也就是说b的拷贝受到了a的拷贝的影响，这会导致问题。因此，我们不能让所有的深拷贝共用同一个缓存，而是让每一个深拷贝使用自己的属性。
解决办法是：在调用函数时，每次都创建一个新的map（默认参数），然后如果需要递归，就把这个map往下传。

```js
function deepClone(target,cache = new Map()){
  if(cache.get(target)){
      return cache.get(target)
  }
  if(target instanceof Object){
      let dist ;
      if(target instanceof Array){
        // 拷贝数组
        dist = [];
      }else if(target instanceof Function){
        // 拷贝函数
        dist = function () {
          return target.call(this, ...arguments);
        };
      }else if(target instanceof RegExp){
        // 拷贝正则表达式
       dist = new RegExp(target.source,target.flags);
      }else if(target instanceof Date){
          dist = new Date(target);
      }else{
        // 拷贝普通对象
        dist = {};
      }
      // 将属性和拷贝后的值作为一个map
      cache.set(target, dist);
      for(let key in target){
          // 过滤掉原型身上的属性
        if (target.hasOwnProperty(key)) {
            dist[key] = deepClone(target[key], cache);
        }
      }
      return dist;
  }else{
      return target;
  }
}
```

4. 对象过长导致的爆栈问题

我们深拷贝中使用了递归，而递归是有递归栈的，递归栈的深度是有限的，一旦对象的递归深度超过了递归栈的深度，那么就可能出现爆栈。 比如，下面的对象a的对象深度有20000个属性。这样的话基本上递归到5000时就出现爆栈了，导致报错。

```js
      let a = {
        child:null 
      }
      let b = a;
      for(let i = 0;i < 20;i++){
        b.child = {
          child:null
        }
        b = b.child;
      }
      console.log(a);
```

这种由于对象过深导致的爆栈问题，暂时没有什么解决办法，而且也很少会有这么深的对象。

### 测试

```js
function deepClone(target,cache = new Map()){
  if(cache.get(target)){
      return cache.get(target)
  }
  if(target instanceof Object){
      let dist ;
      if(target instanceof Array){
        // 拷贝数组
        dist = [];
      }else if(target instanceof Function){
        // 拷贝函数
        dist = function () {
          return target.call(this, ...arguments);
        };
      }else if(target instanceof RegExp){
        // 拷贝正则表达式
       dist = new RegExp(target.source,target.flags);
      }else if(target instanceof Date){
          dist = new Date(target);
      }else{
        // 拷贝普通对象
        dist = {};
      }
      // 将属性和拷贝后的值作为一个map
      cache.set(target, dist);
      for(let key in target){
          // 过滤掉原型身上的属性
        if (target.hasOwnProperty(key)) {
            dist[key] = deepClone(target[key], cache);
        }
      }
      return dist;
  }else{
      return target;
  }
}
```

```js
          const a = {
            i: Infinity,
            s: "",
            bool: false,
            n: null,
            u: undefined,
            sym: Symbol(),
            obj: {
              i: Infinity,
              s: "",
              bool: false,
              n: null,
              u: undefined,
              sym: Symbol(),
            },
            array: [
              {
                nan: NaN,
                i: Infinity,
                s: "",
                bool: false,
                n: null,
                u: undefined,
                sym: Symbol(),
              },
              123,
            ],
            fn: function () {
              return "fn";
            },
            date: new Date(),
            re: /hi\d/gi,
          };
          let a2 = deepClone(a);
          console.log(a2 !== a);
          console.log(a2.i === a.i);
          console.log(a2.s === a.s);
          console.log(a2.bool === a.bool);
          console.log(a2.n === a.n);
          console.log(a2.u === a.u);
          console.log(a2.sym === a.sym);
          console.log(a2.obj !== a.obj);
          console.log(a2.array !== a.array);
          console.log(a2.array[0] !== a.array[0]);
          console.log(a2.array[0].i === a.array[0].i);
          console.log(a2.array[0].s === a.array[0].s);
          console.log(a2.array[0].bool === a.array[0].bool);
          console.log(a2.array[0].n === a.array[0].n);
          console.log(a2.array[0].u === a.array[0].u);
          console.log(a2.array[0].sym === a.array[0].sym);
          console.log(a2.array[1] === a.array[1]);
          console.log(a2.fn !== a.fn);
          console.log(a2.date !== a.date);
          console.log(a2.re !== a.re);
```

