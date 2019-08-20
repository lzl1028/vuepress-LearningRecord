#  JavaScript 最常见的错误

## 1、Uncaught TypeError: Cannot read property

- 当你读取一个未定义的对象的属性或调用其方法时，这个错误会在 Chrome 中出现。

- 发生这种情况的原因很多，但常见的一种是在渲染 UI 组件时对于状态的初始化操作不当。

- 最简单的方法：在构造函数中初始化变量


## 2、 TypeError: ‘undefined’ is not an object

- 这是在 Safari 中读取属性或调用未定义对象上的方法时发生的错误。这与第一点中提到的 Chrome 的错误基本相同，但 Safari 使用了不同的错误消息提示语。


## 3、 TypeError: null is not an object

- 这是在 Safari 中读取属性或调用空对象上的方法时发生的错误。

- 在 JavaScript 中，null 和 undefined 是并不同，这就是为什么我们看到的是两个不同的错误信息。

- undefined 通常是一个尚未分配的变量，而 null 表示该值为空。 要验证它们不相等，请尝试使用严格的相等运算符 ===

- 这种错误可能发生的一种场景是：如果在加载元素之前尝试在 JavaScript 中使用元素。 因为 DOM API 对于空白的对象引用返回值为 null。

- 任何执行和处理 DOM 元素的 JS 代码都应该在创建 DOM 元素之后执行。：所以，如果 DOM 元素之前有一个标签，脚本标签内的 JS 代码将在浏览器解析 HTML 页面时执行。 如果在加载脚本之前尚未创建 DOM 元素，则会出现此错误。

- 解决方案：通过添加一个事件监听器来解决这个问题，这个监听器会在页面准备好的时候通知我们。 一旦 addEventListener 被触发，init() 方法就可以使用 DOM 元素。
```js
<script>
  function init() {
    var myButton = document.getElementById("myButton");
    var myTextfield = document.getElementById("myTextfield");
    myButton.onclick = function() {
      var userName = myTextfield.value;
    }
  } 
  /* readystatechange:
  document有readyState属性来描述document的loading状态，
  readyState的改变会触发readystatechange事件.
    1. loading: 文档仍然在加载
    2. interactive: 文档仍然在加载, 但是像图片，样式，frame之类的子资源仍在加载
    3. complete: 文档和子资源已经结束加载，该状态表明将要触发load事件。
  */  

  document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
      init();
    }
  });
</script>
<form>
  <input type="text" id="myTextfield" placeholder="Type your name" />
  <input type="button" id="myButton" value="Go" />
</form>
```

## 4、 (unknown): Script error

- 当未捕获的 JavaScript 错误（通过 window.onerror 处理程序引发的错误，而不是捕获在 try-catch 中）被浏览器的跨域策略限制时，会产生这类的脚本错误。 例如，如果您将您的 JavaScript 代码托管在 CDN 上，则任何未被捕获的错误将被报告为“脚本错误” 而不是包含有用的堆栈信息。这是一种浏览器安全措施，旨在防止跨域传递数据，否则将不允许进行通信。

- 要获得真正的错误消息，请执行以下操作：

    1. 设置 ‘Access-Control-Allow-Origin’ 头部：将 Access-Control-Allow-Origin 标头设置为 * 表示可以从任何域正确访问资源。
    在 Nginx 中设置如下：将 add_header 指令添加到提供 JavaScript 文件的位置块中：
    ```js
    location ~ ^/assets/ {
        add_header Access-Control-Allow-Origin *;
    }
    ```
    2. 在 script 中设置 crossorigin="anonymous":在您的 HTML 代码中，对于您设置了 Access-Control-Allow-Origin 的每个脚本，在 script 标签上设置 crossorigin =“anonymous”。在脚本标记中添加 crossorigin 属性之前，请确保验证上述 header 正确发送。


## 5、 TypeError: Object doesn’t support property

- 这是您在调用未定义的方法时发生在 IE 中的错误。 您可以在 IE 开发者控制台中进行测试。

- 相当于 Chrome 中的 “TypeError：”undefined“ is not a function” 错误。

- 使用 JS 命名空间时最安全的选择是始终以实际名称空间作为前缀。

## 6、 TypeError: ‘undefined’ is not a function

- 当您调用未定义的函数时，这是 Chrome 中产生的错误。 

- 原因：执行上下文不理解导致的指向错误（this）


## 7、 Uncaught RangeError

- 当你调用一个不终止的递归函数就会发生这种错误。您可以在 Chrome 开发者控制台中进行测试。

- 此外，如果您将值传递给超出范围的函数，也可能会发生这种情况。
    
    - 许多函数只接受其输入值的特定范围的数字。 例如：
    
    1. toExponential(digits) 和 toFixed(digits) 接受 0 到 100
    
    2. toPrecision(digits) 接受 1 到 100
    ```js
    var num = 2.555555;
    console.log(num.toExponential(4));  //OK
    console.log(num.toExponential(-2)); //range error!
    
    console.log(num.toFixed(2));   //OK
    console.log(num.toFixed(105));  //range error!
    
    console.log(num.toPrecision(1));   //OK
    console.log(num.toPrecision(0));  //range error!
    ```


## 8、 TypeError: Cannot read property ‘length’

- 这是 Chrome 中发生的错误，因为读取未定义变量的长度属性。 您可以在 Chrome 开发者控制台中进行测试。

- 您通常会在数组中找到定义的长度，但是如果数组未初始化或者变量在另一个上下文中，则可能会遇到此错误。
```js
var testArray = ["Test"];
function testFunction(testArray) {
    for (var i = 0; i < testArray.length; i++) {
        console.log(testArray[i]);
    }
}
testFunction(); // Cannot read property 'length' of undefined
```

- 解决：
```js
var testArray = ["Test"];
/* Precondition: defined testArray outside of a function */
function testFunction(/* No params */) {
    for (var i = 0; i < testArray.length; i++) {
      console.log(testArray[i]);
    }
}
testFunction();
```
或

```js
var testArray = ["Test"];
function testFunction(testArray) {
   for (var i = 0; i < testArray.length; i++) {
      console.log(testArray[i]);
    }
}
testFunction(testArray);
```

## 9、 Uncaught TypeError: Cannot set property

- 当我们尝试访问一个未定义的变量时，它总是返回 undefined，我们不能获取或设置任何未定义的属性。

## 10. ReferenceError: event is not defined

- 当您尝试访问未定义的变量或超出当前作用域的变量时，会引发此错误。 您可以在 Chrome 浏览器中测试。

- 如果在使用 event 时遇到此错误，请确保使用传入的事件对象作为参数。像 IE 这样的旧浏览器提供了一个全局变量事件，但并不是所有浏览器都支持。
```js
document.addEventListener("mousemove", function (event) {
  console.log(event);
})
```






