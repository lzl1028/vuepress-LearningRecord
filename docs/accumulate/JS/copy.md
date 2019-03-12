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

```
JSON.parse(JSON.stringify(obj))
```


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
