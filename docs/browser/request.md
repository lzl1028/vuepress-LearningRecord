# 服务端发送请求方式

在开发过程中,我们向服务端发送请求,一般会使用三种方式,

- XMLHttpRequest(XHR)

- Fetch 

- jQuery实现的AJAX。

其中, XMLHttpRequest(XHR)和Fetch是浏览器的原生API，jquery的ajax其实是封装了XHR。

## 1. XMLHttpRequest

```js
var xhr; 
if (window.XMLHttpRequest) {　 
// Mozilla, Safari... 　
    xhr = new XMLHttpRequest(); 
} else if (window.ActiveXObject) {
// IE 　
    try { 　
    xhr = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        try { 　 
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {}
    } 
} 
if (xhr) {
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open('POST', '/api', true);
    // 设置 Content-Type 为 application/x-www-form-urlencoded 　 
    // 以表单的形式传递数据 　
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('username=admin&password=root');
} 
// onreadystatechange 方法 
function onReadyStateChange() {
    // 该函数会被调用四次 　
    console.log(xhr.readyState);
    if (xhr.readyState === 4) {
        // everything is good, the response is received 　　
        if (xhr.status === 200) { 　　console.log(xhr.responseText); 　　
            
        } else { 
            console.log('There was a problem with the request.'); 
        } 　
        
    } else { 
    // still not ready 
    console.log('still not ready...'); 
    } 
}

```

- XMLHttpRequest 是一个非常粗糙的API，不符合关注分离(Separation of Concerns)的原则，配置和调用方式非常混乱，前端程序员们不仅要做各个浏览器的兼容性，还饱受回调地狱的折磨，这显然不是一个好的选择。


## 2. jQuery实现AJAX

```js
$.ajax({ 
    method: 'POST', 
    url: '/api', 
    data: { 
        username: 'admin', 
        password: 'root'
    } 
}) 
    .done(function(msg) { 
        alert( 'Data Saved: ' + msg );
    });

```

- jQuery作为一个使用人数最多的库，其AJAX很好的封装了原生AJAX的代码，在兼容性和易用性方面都做了很大的提高，而且jQuery还把jsonp装在了AJAX里面，这样我们就可以开心的跨域了！！！！对比原生AJAX的实现，使用jQuery实现的AJAX就异常简单了．

- 但是，笔锋一转，我们仍然逃脱不了一个问题，回调地狱。。。。


## 3. Fetch

```js
fetch(...).then(fun2)
          .then(fun3) //各依赖有序执行
          .....
          .catch(fun)
```

- 说明：
    1. fetch api返回的是一个promise对象
    2. Options:
        
        - method(String): HTTP请求方法，默认为GET
        - body(String): HTTP的请求参数
        - headers(Object): HTTP的请求头，默认为{}
        - credentials(String): 默认为omit,忽略的意思，也就是不带cookie;
        - 还有两个参数，same-origin，意思就是同源请求带cookie；include,表示无论跨域还是同源请求都会带cookie
    3. 第一个then函数里面处理的是response的格式，这里的response具体如下：![image](https://upload-images.jianshu.io/upload_images/6522842-08395937b2f4d695.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000)
    
        - status(number): HTTP返回的状态码，范围在100-599之间
        - statusText(String): 服务器返回的状态文字描述，例如Unauthorized,上图中返回的是Ok
        - ok(Boolean): 如果状态码是以2开头的，则为true
        - headers: HTTP请求返回头
        - body: 返回体，这里有处理返回体的一些方法。
            1. text(): 将返回体处理成字符串类型
            2. json()： 返回结果和 JSON.parse(responseText)一样
            3. blob()： 返回一个Blob，Blob对象是一个不可更改的类文件的二进制数据
            4. arrayBuffer()
            5. formData()

- Fetch常见坑

    1. 兼容性: 如caniuse所示，IE浏览器完全不支持fetch，移动端的很多浏览器也不支持,所以，如果要在这些浏览器上使用Fetch，就必须使用fetch polyfill
    
    2. cookie传递
        - 必须在header参数里面加上credentials: 'include'，才会如xhr一样将当前cookies带到请求中去
    3. fetch和xhr的不同
        - fetch虽然底层，但是还是缺少一些常用xhr有的方法，比如能够取消请求（abort）方法
        - fetch在服务器返回4xx、5xx时是不会抛出错误的，这里需要手动通过，通过response中的ok字段和status字段来判断

## 4. options请求

> HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为"*"）使用该方法。

简单来说，就是可以用 options 请求去嗅探某个请求在对应的服务器中都支持哪种请求方法。

因为在跨域的情况下，在浏览器发起"复杂请求"时主动发起的。跨域共享标准规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。

### 简单请求与复杂请求

某些请求不会触发 CORS 预检请求，这样的请求一般称为"简单请求",而会触发预检的请求则成为"复杂请求"。

#### 简单请求

- 请求方法为<font color=FF0000>GET、HEAD、POST</font>时发的请求

- 人为设置了规范集合之内的首部字段，如<font color=FF0000>Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width</font>

- <font color=FF0000>Content-Type</font> 的值仅限于下列三者之一,即<font color=FF0000>application/x-www-form-urlencoded、multipart/form-data、text/plain</font>

- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；

- 请求中没有使用 ReadableStream 对象。

#### 复杂请求

- 使用了下面任一 HTTP 方法，PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH

- 人为设置了以下集合之外首部字段，即简单请求外的字段

- Content-Type 的值不属于下列之一，即application/x-www-form-urlencoded、multipart/form-data、text/plain

### options 关键的请求头字段

关键字段	| 作用
---|---
Access-Control-Request-Method	|告知服务器，实际请求将使用 POST 方法
Access-Control-Request-Headers	|告知服务器，实际请求将携带的自定义请求首部字段

```js
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

### response header 的关键字段

关键字段 | 作用
---|---
Access-Control-Allow-Methods | 表明服务器允许客户端使用什么方法发起请求
Access-Control-Allow-Origin | 允许跨域请求的域名，如果要允许所有域名则设置为 *
Access-Control-Request-Headers | 将实际请求所携带的首部字段告诉服务器
Access-Control-Max-Age | 指定了预检请求的结果能够被缓存多久

### Options 请求优化

当我们发起跨域请求时，如果是简单请求，那么我们只会发出一次请求，但是如果是复杂请求则先发出 options 请求，用于确认目标资源是否支持跨域，然后浏览器会根据服务端响应的 header 自动处理剩余的请求，如果响应支持跨域，则继续发出正常请求，如果不支持，则在控制台显示错误。

由此可见，当触发预检时，跨域请求便会发送 2 次请求，既增加了请求数，也延迟了请求真正发起的时间，严重影响性能。

优化 Options 请求，主要有 2 种方法:

- 转为简单请求，如用 JSONP 做跨域请求

- 对 options 请求进行缓存，服务器端设置 <font color=FF0000>Access-Control-Max-Age</font> 字段，那么当第一次请求该 URL 时会发出 OPTIONS 请求，浏览器会根据返回的 Access-Control-Max-Age 字段缓存该请求的 OPTIONS 预检请求的响应结果（具体缓存时间还取决于浏览器的支持的默认最大值，取两者最小值，一般为 10 分钟）。在缓存有效期内，该资源的请求（URL 和 header 字段都相同的情况下）不会再触发预检。（chrome 打开控制台可以看到，当服务器响应 Access-Control-Max-Age 时只有第一次请求会有预检，后面不会了。注意要开启缓存，去掉 disable cache 勾选。）

> options 请求就是预检请求，可用于检测服务器允许的 http 方法。当发起跨域请求时，由于安全原因，触发一定条件时浏览器会在正式请求之前自动先发起 OPTIONS 请求，即 CORS 预检请求，服务器若接受该跨域请求，浏览器才继续发起正式请求。

