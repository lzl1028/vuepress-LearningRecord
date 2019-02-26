# 服务端发送请求方式
- 在开发过程中,我们向服务端发送请求,一般会使用三种方式, XMLHttpRequest(XHR)，Fetch ，jQuery实现的AJAX。

- 其中, XMLHttpRequest(XHR)和Fetch是浏览器的原生API，jquery的ajax其实是封装了XHR。


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
    