# 常用URL参数操作方法

## 自定义函数方法
### 1.获取单个参数

```js
/**
 * [getParam ]
 * @param  {String} name 
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}  
 */
function getParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

getParam('query','https://juejin.im/search?query=hello&time=2017-11-12')
// output: 
// "hello"
```

### 2.设置单个参数

```js
/**
 * [setParam 设置单个参数]
 * @param {String} name
 * @param {String|Number} val  
 * @return {String|Boolean}  
 */
function setParam(name, val, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var _name = name.replace(/[\[\]]/g, '\\$&');
    var value = name + '=' + encodeURIComponent(val);
    var regex = new RegExp(_name + '=[^&]*');
    var urlArr = url.split('#');
    var result = '';

    if(regex.exec(url)){
        result =  url.replace(regex, value);
    }else{
        result = urlArr[0]+'&'+value+ (urlArr[1] || '');
    }

    return result
}
setParam('query','world','https://juejin.im/search?query=hello&time=2017-11-12')
// output: 
// "https://juejin.im/search?query=world&time=2017-11-12"
```

### 3.移除单个参数

```js
/**
 * [removeParam 移除单个参数]
 * @param  {String} name 
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}      
 */
function removeParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    var urlparts = url.split('?');
    var prefix = encodeURIComponent(name + '=');
    var pars = urlparts[1].split(/[&;]/g);
    var i = 0, len = pars.length;

    for (; i < len; i++) {
        if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
        }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');

    return url;
}
removeParam('query','https://juejin.im/search?query=hello&time=2017-11-12')
// output: 
// "https://juejin.im/search?time=2017-11-12"
```

### 4.获取多个参数

```js
/**
 * [getParams 获取多个参数]
 * @param  {String} names [多个用空格分割]
 * @param  {String} url   [default:location.href] 
 * @return {[String|Boolean]}       
 */
function getParams(names, url) {
    if(typeof name !== 'string') return false;
    var names = names.split(' ');
    var result = {};
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;
    for (; i < len; i++) {
        result[names[i]] = getParam(names[i], url);
    }
    return result;
}
getParams('query time','https://juejin.im/search?query=hello&time=2017-11-12')
// output: 
// {query: "hello", time: "2017-11-12"}
```

### 5.设置多个参数

```js
/**
 * [setParams 设置多个参数]
 * @param {Object} obj 
 * @param  {String} url   [default:location.href] 
 * @return {[String|Boolean]}       
 */
function setParams(obj, url) {
    var result = url || '';
    if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
    for (var name in obj) {
        result = setParam(name, obj[name], result);
    }
    return result;
}
setParams({a:111,b:222,query:'world'},'https://juejin.im/search?query=hello&time=2017-11-12')
// output: 
// "https://juejin.im/search?query=world&time=2017-11-12&a=111&b=222"
```

### 6.移除多个参数

```js
/**
 * [removeParams 移除多个参数]
 * @param  {String} names [多个用空格分割]
 * @param  {String} url   [default:location.href] 
 * @return {[String|Boolean]}       
 */
function removeParams(names, url) {
    var result = url || '';
    var names = names.split(' ');
    var i = 0,
        len = names.length;
    if (names.length === 0) return false;

    for (; i < len; i++) {
        result = removeParam(names[i], result);
    }
    return result;
}
removeParams('query time','https://juejin.im/search?query=hello&time=2017-11-12')
// output: 
// "https://juejin.im/search"
```

### 7.url hash 操作

```js
/**
 * [getHash 方法]
 * @param  {[String]} url [default:location.href]
 * @return {[String]}     
 */
function getHash(url) {
    return decodeURIComponent(url ? url.substring(url.indexOf('#') + 1) : window.location.hash.substr(1));
}

/**
 * [setHash 方法]
 * @param {String} hash 
 */
function setHash(hash) {
    window.location.replace('#' + encodeURIComponent(hash));
}

/**
 * [removeHash 方法]
 */
function removeHash() {
    window.location.replace('#', '');
}
```

## WebAPI: URLSearchParams
### 1. 简单使用（URLSearchParams）:IE的支持不是很理想

```js
let url = '?wd=蔡徐坤&skill=篮球&year=2019';
let searchParams = new URLSearchParams(url);

for (let p of searchParams) {
  console.log(p);
}
// ["wd", "蔡徐坤"]
// ["skill", "篮球"]
// ["year", "2019"]
```


### 2. 获取单个字段

- 只想获取单个字段的值，该怎么办呢？只需要调用这个实例的get方法即可

```js
searchParams.get('wd') // "蔡徐坤"
searchParams.get('skill') // "篮球"
searchParams.get('year') // "2019"
```

- 不知道一个字段是否存在，所以想事先校验下。使用实例的has方法进行判断

```js
searchParams.has('wd') // true
searchParams.has('age') // false
```


### 3. 添加字段

- 实例提供了append方法来添加字段，这个方法接收两个参数，前者是key，后者是value，代码：

```js
searchParams.append('age', 26);
searchParams.has('age'); // true
searchParams.get('age'); // 26
```

### 4. 删除字段

- 现在不想要year字段了，直接使用delete即可，代码：

```js
searchParams.delete('year');
searchParams.has('year'); // false
```

### 5. 设置字段

- 有时候想重写一个字段，而不是添加(append)一个字段，这时候需要使用set方法，比如，我们觉得坤哥不仅会篮球，还会唱，跳，rap。代码：

```js
searchParams.set('skill', '篮球 唱 跳 rap');
```

### 6. 转为字符串

- 修改实例后，有时候需要再转为字符串，进行路由跳转等，使用toString方法:

```js
searchParams.toString(); // "wd=蔡徐坤&skill=篮球+唱+跳+rap&year=2019&age=26"
```
