# JS编码注意事项

## 1.不要使用隐式类型转换

- 大多数运算符+ - * / ==(不包括 ===)在处理不同类型的操作数时会进行隐式转换。

- 语句if（condition）{...}，while（condition）{...}隐式地将条件转换为布尔值。

- eg:实现一个获取对象属性的函数。如果属性不存在，函数返回一个默认值

```js
function getProp(object, propertyName, defaultValue) {
  if (!object[propertyName]) {
    return defaultValue;
  }
  return object[propertyName];
}

const hero = {
  name: 'Batman',
  isVillian: false
};

console.log(getProp(hero, 'name', 'Unknown'));     // => 'Batman'
// 试图访问isVillian属性:
console.log(getProp(hero, 'isVillian', true)); // => true
// 因为属性存在的验证依赖于if（！object [propertyName]）{...}隐式转换的布尔值

// 所以要明确验证值的类型
function getPropFixed(object, propertyName, defaultValue) {
   if (object[propertyName] === undefined) {
     return defaultValue;
   }
   return object[propertyName];
}

const hero = {
  name: 'Batman',
  isVillian: false
};

console.log(getPropFixed(hero, 'isVillian', true)); // => false
// object[propertyName] === undefined确切地验证属性是否为undefined。

// 优化：
function getPropFixedBetter(object, propertyName, defaultValue) {
  if (!(propertyName in object)) {
    return defaultValue;
  }
  return object[propertyName]
}
```

- 实践
    1. 始终使用严格的相等运算符===进行比较

    2. 不要使用松散等式运算符==
    
    3. 加法运算符 operand1 + operand2：两个操作数应该是数字或字符串
    
    4. 算术运算符 - * /％**：两个操作数都应该是数字
    
    5. if（condition）{...}，while（condition）{...}等语句：condition 必须是一个布尔类型值


## 2. 不要使用早期的JavaScript技巧

1. ES6 中可以使用 array.includes(item) 来代替 array.indexOf(item) !== -1


早期的Javascript | 现在的Javascript
---|---
array.indexOf(item) !== -1 |  array.includes(item)


## 3. 不要污染函数作用域

- 在ES6之前，我们可能会养成了将所有变量声明在函数作用域里面

```js
function someFunc(array) {
  var index, item, length = array.length;
  /*
   * Lots of code
   */
  for (index = 0; index < length; index++) {
    item = array[index];
    // Use `item`
  }
  return someResult;
}

/* 
变量index、item和length 在函数作用域内。
但是这些变量会影响函数作用域，因为它们只在for()块作用域内才被需要。
*/

// 通过引入具有块作用域 let和const，应该尽可能地限制变量的生命周期。

function someFunc(array) {
  /*
   * Lots of code
   */
  const length = array.length;
  for (let index = 0; index < length; index++) {
    const item = array[index];
    // Use `item`
  }
  return someResult;
}
```

- 在使用的块作用域定义变量

```js
// if 块作用域
// 不好
let message;
// ...
if (notFound) {
  message = 'Item not found';
  // Use `message`
}

// 好
if (notFound) {
  const message = 'Item not found';
  // Use `message`
}
```

```js
// for 块作用域
// 不好
let item;
for (item of array) {
  // Use `item`
}

// 好
for (const item of array) {
  // Use `item`
}
```

## 4.尽量避免 undefined 和 null

- 未赋值的变量默认被赋值为undefined

```js
let count;
console.log(count); // => undefined

const hero = {
  name: 'Batman'
};
console.log(hero.city); // => undefined
```

- 判断属性是否存在

```js
// 不好
const object = {
  prop: 'value'
};
if (object.nonExistingProp === undefined) {
  // ...
}

// 好
const object = {
  prop: 'value'
};
if ('nonExistingProp' in object) {
  // ...
}
```

- 对象的默认属性

```js
// 不好
function foo(options) {
  if (object.optionalProp1 === undefined) {
    object.optionalProp1 = 'Default value 1';
  }
  // ...
}

// 好
function foo(options) {
  const defaultProps = {
    optionalProp1: 'Default value 1'
  };
  options = {
    ...defaultProps,
    ...options
  }
}
```

- 默认函数参数

```js
// 不好
function foo(param1, param2) {
  if (param2 === undefined) {
    param2 = 'Some default value';
  }
  // ...
}
// 好
function foo(param1, param2 = 'Some default value') {
  // ...
}
```

- null是一个缺失对象的指示符。应该尽量避免从函数返回 null，特别是使用null作为参数调用函数。

```js
// 一旦null出现在调用堆栈中，就必须在每个可能访问null的函数中检查它的存在，这很容易出错。
function bar(something) {
  if (something) {
    return foo({ value: 'Some value' });
  } else {
    return foo(null);
  }
}

function foo(options) {
  let value = null;
  if (options !== null) {
    value = options.value;
    // ...
  }
  return value;
}
```

- 尝试编写不涉及null的代码。 可替代方法是try /catch机制，默认对象的使用。

