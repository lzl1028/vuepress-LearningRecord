# 浏览器内多个标签页之间的通讯

> Redux vuex 这个是单页面应用里跨页面状态管理

实现多页通讯主要有利用

- 浏览器数据存储方式：浏览器数据存储的方式主要用本地存储方式解决，即调用localStorage、Cookie等本地存储方式。

- 服务器方式：主要使用websocket技术使多页签都监听服务器推送事件来获得其他页签发送的数据

## 浏览器存储：

### 第一种：localStorage：

在一个标签页里面使用localStorage.setItem(key,value)添加(修改、删除)内容;在另一个标签页里面监听storage事件。即可得到localstorge存储的值，实现不同标签页之间的通信。

```js
// 添加
localStorage.setItem(key,value) 

// 删除
localStorage.removeItem(key,value) 

// 添加监听 storage 的变化
window.onload = function () {    
    window.addEventListener('storage', function (event) {      
        // event 事件对象包含 domain newValue oldValue key        
        console.log(event.key + '=' + event.newValue);    
    })
}
```

### 第二种：cookie+setInterval：

将要传递的信息存储在cookie中，每隔一定时间读取cookie信息， 即可随时获取要传递的信息。

在A页面将需要传递的消息存储在cookie当中

在B页面设置setInterval,以一定的时间间隔去读取cookie的值。(不停地问cookie)

```js
// 设置 cookie
document.cookie = "name=" + name;

// 获取 cookie
function getCookie(key) {  
    const _string = '{"';  
    _string += document.cookie.replace(/;\s+/gim, '","').replace(/=/gim, '":"');  
    _string += '"}'[key];  return JSON.parse(_string);
}
```

## 监听服务器事件

### 第一种：websocket通讯

WebSocket 是全双工（full-duplex）通信自然可以实现多个标签页之间的通信（服务器可以主动发数据给浏览器；浏览器也可以主动发数据给服务器）。

WebSocket 是HTML 5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

为什么传统的HTTP协议不能做到WebSocket实现的功能?这是因为HTTP协议是一一个请求-响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。

也有人说，HTTP协议其实也能实现啊，比如用轮询或者Comet。这个机制的缺点一是实时性不够, 二是频繁的请求会给服务器带来极大的压力。Comet本质上也是轮询，但是在没有消息的情况下，服务器先拖一段时间， 等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。另外，一个HTTP连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个连接,而网关是我们不可控的，这就要求Comet连接必须定期发一些ping数据表示连接正常工作”。

WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。

**为什么WebSocket连接可以实现全双工通信而HTTP连接不行呢?**

实际上通讯协议是建立在TCP协议之上的, TCP协议本身就实现了全双工通信，但是HTTP协议的请求-应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下:接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧。安全的WebSocket连接机制和HTTPS类似。首先，浏览器用wss://xx创建WebSocket连接时， 会先通过HTTPS创建安全的连接，然后，该HTTPS连接升级为WebSocket连接，底层通信走的仍然是安全的SSL/TLS协议。

**WebSocket连接必须由浏览器发起，特点**:

(1)建立在 TCP 协议之上，服务器端的实现比较容易。

(2)与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

(3)数据格式比较轻量,性能开销小，通信高效。

(4)可以发送文本，也可以发送二进制数据。

(5)没有同源限制，客户端可以与任意服务器通信。

(6)协议标识符是ws (如果加密,则为wss)，服务器网址就是URL。

```js
// Create WebSocket connection.
const socket = new Websocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", function (event) {  
    socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message ", function (event) {  
    console.log("Message from server ", event.data);
});
```

### 第二种：html5浏览器的新特性SharedWorker大

普通的 webworker 直接使用 new Worker() 即可创建，这种 webworker 是当前页面专有的。然后还有种共享 worker(SharedWorker)，这种是可以多个标签页、iframe共同使用的。SharedWorker 可以被多个 window 共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

首先新建一个is文件worker.js, 具体代码如下: .

```js
// shareWorker 所要用到的js文件，不必打包到项目中，直接放到服务器即可
let data = " ";
let onconnect = function (event) {  
    let port = event.ports[0];  
    port.onmessage = function (e) {    
        if (e.data === "get") {      
            port.postMessage(data);    
        } else {      
            data = e.data;
        }  
    };
};
```

示例：

```js
try {  
    var worker = new SharedWorker("worker.js");  
    var getBtn = document.getElementById("get");  
    var setBtn = document.getElementById("set");  
    var txt = document.getElementById("txt");  
    var log = document.getElementById("log");  
    worker.port.addEventListener("message", function (e) {    
        log.innerHTML = e.data;    
        console.log(" --- 获取到数据 e.data --- ", e.data);  
    });  
    worker.port.start();  
    setBtn.addEventListener(    
        "click",    
        function (e) {      
            worker.port.postMessage(txt.value);    
        },    
        false  
    );  
    getBtn.addEventListener(    
        "click",    
        function (e) {      
            worker.port.postMessage("get");    
        },    
        false  
    );} 
    catch (error) {  
        console.log(" --- error --- ", error);
    }
```



