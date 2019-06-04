# 前端的网络请求方式

## 一、前端进行网络请求的关注点

- 传入基本参数（url，请求方式）

- 请求参数、请求参数类型

- 设置请求头

- 获取响应的方式

- 获取响应头、响应状态、响应结果

- 异常处理

- 携带cookie设置

- 跨域请求

## 二、前端进行网络请求的方式

- form表单、ifream、刷新页面

- Ajax - 异步网络请求的开山鼻祖

- jQuery - 一个时代

- fetch - Ajax的替代者

- axios、request等众多开源库


## 三、原生Ajax的用法

- 由于之前任何服务器的交互都需要刷新页面，用户体验差。

- 而Ajax全称Asynchronous JavaScript + XML（异步JavaScript和XML），使用Ajax，网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。

- Ajax本身不是一种新技术，而是用来描述一种使用现有技术集合实现的一个技术方案，浏览器的XMLHttpRequest是实现Ajax最重要的对象（IE6以下使用ActiveXObject）。

- 尽管X在Ajax中代表XML, 但由于JSON的许多优势，比如更加轻量以及作为Javascript的一部分，目前JSON的使用比XML更加普遍。


- XMLHttpRequest对象：

```js
var xhr = new XMLHttpRequest();
xhr.open('post','www.xxx.com',true)
// 接收返回值
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 ){
        if(xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            console.log(xhr.responseText);
        }
    }
}
// 处理请求参数
postData = {"name1":"value1","name2":"value2"};
postData = (function(value){
var dataString = "";
for(var key in value){
     dataString += key+"="+value[key]+"&";
};
  return dataString;
}(postData));
// 设置请求头
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 异常处理
xhr.onerror = function() {
   console.log('Network request failed')
}
// 跨域携带cookie
xhr.withCredentials = true;
// 发出请求
xhr.send(postData);

```

![image](https://user-gold-cdn.xitu.io/2019/3/27/169bc95733923d9c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 函数

1. open
    
    - 用于初始化一个请求，用法：
    ```js
    xhr.open(method, url, async);
    /*
    method：请求方式，如get、post
    url：请求的url
    async：是否为异步请求
    */
    ```

2. send
    
    - 用于发送HTTP请求，即调用该方法后HTTP请求才会被真正发出，用法：
    
    ```
    xhr.send(param)
    /*
    param：http请求的参数，可以为string、Blob等类型。
    */
    ```

3. abort
    
    - 用于终止一个ajax请求，调用此方法后readyState将被设置为0，用法：
    
    ```
    xhr.abort()
    ```

4. setRequestHeader

    - 用于设置HTTP请求头，此方法必须在open()方法和send()之间调用，用法：
    ```
    xhr.setRequestHeader(header, value);
    ```

5. getResponseHeader

    - 用于获取http返回头，如果在返回头中有多个一样的名称，那么返回的值就会是用逗号和空格将值分隔的字符串，用法：

    ```
    var header = xhr.getResponseHeader(name);
    ```

### 属性

#### 1. readyState

用来标识当前XMLHttpRequest对象所处的状态，XMLHttpRequest对象总是位于下列状态中的一个：

值 | 状态 | 描述
--- | --- | ---
0|UNSENT|代理被创建，但尚未调用 open() 方法。
1|OPENED|open() 方法已经被调用。
2|HEADERS_RECEIVED|send()方法已经被调用，并且头部和状态已经可获得。
3|LOADING|下载中； responseText 属性已经包含部分数据。
4|DONE|下载操作已完成。

#### 2. status

表示http请求的状态, 初始值为0。如果服务器没有显式地指定状态码, 那么status将被设置为默认值, 即200。


#### 3. responseType

表示响应的数据类型，并允许我们手动设置，如果为空，默认为text类型，可以有下面的取值：

值 | 描述
---|---
"" |将 responseType设为空字符串与设置为"text"相同， 是默认类型 （实际上是 DOMString）。
"arraybuffer"|response 是一个包含二进制数据的JavaScript ArrayBuffer 。
"blob"|response是一个包含二进制数据的 Blob 对象 。
"document"|response 是一个HTML Document或XML XMLDocument，这取决于接收到的数据的 MIME 类型。
"json"|response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为JSON解析得到的。
"text"|response是包含在DOMString对象中的文本。


#### 4. response

返回响应的正文，返回的类型由上面的responseType决定。

### 事件回调

#### onreadystatechange

```js
 xhr.onreadystatechange = callback;
 // 当readyState属性发生变化时，callback会被触发。
```

#### onloadstart

```js
 xhr.onloadstart = callback;
// 在ajax请求发送之前（readyState==1后, readyState==2前），callback会被触发。
```

#### onprogress

```js
xhr.onprogress = function(event){
  console.log(event.loaded / event.total);
}
// 回调函数可以获取资源总大小total，已经加载的资源大小loaded，用这两个值可以计算加载进度。
```

#### onload

```js
 xhr.onload = callback;
// 当一个资源及其依赖资源已完成加载时，将触发callback，通常我们会在onload事件中处理返回值。
```

## 四、jQuery对Ajax的封装

```js
$.ajax({
    dataType: 'json', // 设置返回值类型
    contentType: 'application/json', // 设置参数类型
    headers: {'Content-Type','application/json'},// 设置请求头
    xhrFields: { withCredentials: true }, // 跨域携带cookie
    data: JSON.stringify({a: [{b:1, a:1}]}), // 传递参数
    error:function(xhr,status){  // 错误处理
       console.log(xhr,status);
    },
    success: function (data,status) {  // 获取结果
       console.log(data,status);
    }
})
```
![image](https://user-gold-cdn.xitu.io/2019/3/27/169bc957333ae9b0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


- url：当前页地址。发送请求的地址。

- type(类型)：String 请求方式 ("POST" 或"GET")， 默认为 "GET"。注意：其它HTTP请求方法，如PUT和 DELETE也可以使用，但仅部分浏览器支持。

- timeout：Number设置请求超时时间（毫秒）。此设置将覆盖全局设置。

- jsonp：在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分。

- dataType：
```
"xml": 返回 XML 文档，可用 jQuery 处理。
"html": 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
"script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 "cache" 参数。注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
"json": 返回 JSON 数据 。
"jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
"text": 返回纯文本字符串
```

- async：Boolean 默认值:true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。

- contentType：类型：String默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。


## 五、jQuery的替代者：fetch

1. 一个基本的fetch请求：

```js
const options = {
    method: "POST", // 请求参数
    headers: { "Content-Type": "application/json"}, // 设置请求头
    body: JSON.stringify({name:'123'}), // 请求参数
    credentials: "same-origin", // cookie设置
    mode: "cors", // 跨域
}
fetch('http://www.xxx.com',options)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson); // 响应数据
  })
  .catch(function(err){
    console.log(err); // 异常处理
  })
```
![image](https://user-gold-cdn.xitu.io/2019/3/27/169bc95734434502?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)










