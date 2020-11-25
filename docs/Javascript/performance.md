# 性能优化

## 服务器

### 1. 减少 HTTP 请求

一个完整的 HTTP 请求需要经历 DNS 查找，TCP 握手，浏览器发出 HTTP 请求，服务器接收请求，服务器处理请求并发回响应，浏览器接收响应等过程。接下来看一个具体的例子帮助理解 HTTP ：

### 2. 使用 HTTP2

HTTP2 相比 HTTP1.1 有如下几个优点：

- **解析速度快**

服务器解析 HTTP1.1 的请求时，必须不断地读入字节，直到遇到分隔符 CRLF 为止。而解析 HTTP2 的请求就不用这么麻烦，因为 HTTP2 是基于帧的协议，每个帧都有表示帧长度的字段。

- **多路复用**

HTTP1.1 如果要同时发起多个请求，就得建立多个 TCP 连接，因为一个 TCP 连接同时只能处理一个 HTTP1.1 的请求。
在 HTTP2 上，多个请求可以共用一个 TCP 连接，这称为多路复用。同一个请求和响应用一个流来表示，并有唯一的流 ID 来标识。

多个请求和响应在 TCP 连接中可以乱序发送，到达目的地后再通过流 ID 重新组建。

- **首部压缩**

HTTP2 提供了首部压缩功能。

例如有如下两个请求：

```js
:authority: unpkg.zhimg.com
:method: GET
:path: /za-js-sdk@2.16.0/dist/zap.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
```

```js
:authority: zz.bdstatic.com
:method: GET
:path: /linksubmit/push.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
```

从上面两个请求可以看出来，有很多数据都是重复的。如果可以把相同的首部存储起来，仅发送它们之间不同的部分，就可以节省不少的流量，加快请求的时间。

HTTP/2 在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键－值对，对于相同的数据，不再通过每次请求和响应发送。

下面再来看一个简化的例子，假设客户端按顺序发送如下请求首部：

```js
Header1:foo
Header2:bar
Header3:bat
```

当客户端发送请求时，它会根据首部值创建一张表：

索引 |	首部名称 |	值
|---|---|---|
62 |	Header1	 |foo
63	|Header2	| bar
64	|Header3	| bat

如果服务器收到了请求，它会照样创建一张表。 当客户端发送下一个请求的时候，如果首部相同，它可以直接发送这样的首部块：

```js
62 63 64
```

服务器会查找先前建立的表格，并把这些数字还原成索引对应的完整首部。

- **优先级**

HTTP2 可以对比较紧急的请求设置一个较高的优先级，服务器在收到这样的请求后，可以优先处理。

- **流量控制**

由于一个 TCP 连接流量带宽（根据客户端到服务器的网络带宽而定）是固定的，当有多个请求并发时，一个请求占的流量多，另一个请求占的流量就会少。流量控制可以对不同的流的流量进行精确控制。

- **服务器推送**

HTTP2 新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。换句话说，除了对最初请求的响应外，服务器还可以额外向客户端推送资源，而无需客户端明确地请求。

例如当浏览器请求一个网站时，除了返回 HTML 页面外，服务器还可以根据 HTML 页面中的资源的 URL，来提前推送资源。

现在有很多网站已经开始使用 HTTP2 了，例如知乎：

![image](../../resources/images/js/performance-1.png)

其中 h2 是指 HTTP2 协议，http/1.1 则是指 HTTP1.1 协议。

### 3. 使用服务端渲染

客户端渲染: 获取 HTML 文件，根据需要下载 JavaScript 文件，运行文件，生成 DOM，再渲染。

服务端渲染：服务端返回 HTML 文件，客户端只需解析 HTML。

- 优点：首屏渲染快，SEO 好。

- 缺点：配置麻烦，增加了服务器的计算压力。

## 代码配置

### 1. 静态资源使用 CDN

内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。我们都知道，当服务器离用户越远时，延迟越高。CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间。

#### CDN 原理

当用户访问一个网站时，如果没有 CDN，过程是这样的：

1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。

2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到网站服务器的 IP 地址。

3. 本地 DNS 将 IP 地址发回给浏览器，浏览器向网站服务器 IP 地址发出请求并得到资源。

![image](../../resources/images/js/performance-2.png)

如果用户访问的网站部署了 CDN，过程是这样的：

1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。

2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到全局负载均衡系统（GSLB）的 IP 地址。

3. 本地 DNS 再向 GSLB 发出请求，GSLB 的主要功能是根据本地 DNS 的 IP 地址判断用户的位置，筛选出距离用户较近的本地负载均衡系统（SLB），并将该 SLB 的 IP 地址作为结果返回给本地 DNS。

4. 本地 DNS 将 SLB 的 IP 地址发回给浏览器，浏览器向 SLB 发出请求。

5. SLB 根据浏览器请求的资源和地址，选出最优的缓存服务器发回给浏览器。

6. 浏览器再根据 SLB 发回的地址重定向到缓存服务器。

7. 如果缓存服务器有浏览器需要的资源，就将资源发回给浏览器。如果没有，就向源服务器请求资源，再发给浏览器并缓存在本地。

![image](../../resources/images/js/performance-3.png)

### 2. 将 CSS 放在文件头部，JavaScript 文件放在底部

所有放在 head 标签里的 CSS 和 JS 文件都会堵塞渲染。如果这些 CSS 和 JS 需要加载和解析很久的话，那么页面就空白了。所以 JS 文件要放在底部，等 HTML 解析完了再加载 JS 文件。

那为什么 CSS 文件还要放在头部呢？

因为先加载 HTML 再加载 CSS，会让用户第一时间看到的页面是没有样式的、“丑陋”的，为了避免这种情况发生，就要将 CSS 文件放在头部了。

另外，JS 文件也不是不可以放在头部，只要给 script 标签加上 defer 属性就可以了，异步下载，延迟执行。

### 3. 使用字体图标 iconfont 代替图片图标

字体图标就是将图标制作成一个字体，使用时就跟字体一样，可以设置属性，例如 font-size、color 等等，非常方便。并且字体图标是矢量图，不会失真。还有一个优点是生成的文件特别小。

### 4. 善用缓存，不重复加载相同的资源

### 5. 减少重绘重排

#### 浏览器渲染过程

1. 解析HTML生成DOM树。

2. 解析CSS生成CSSOM规则树。

3. 将DOM树与CSSOM规则树合并在一起生成渲染树。

4. 遍历渲染树开始布局，计算每个节点的位置大小信息。

5. 将渲染树每个节点绘制到屏幕。

#### 重排

当改变 DOM 元素位置或大小时，会导致浏览器重新生成渲染树，这个过程叫重排。

#### 重绘

当重新生成渲染树后，就要将渲染树每个节点绘制到屏幕，这个过程叫重绘。不是所有的动作都会导致重排，例如改变字体颜色，只会导致重绘。记住，重排会导致重绘，重绘不会导致重排 。

重排和重绘这两个操作都是非常昂贵的，因为 JavaScript 引擎线程与 GUI 渲染线程是互斥，它们同时只能一个在工作。

#### 什么操作会导致重排？

- 添加或删除可见的 DOM 元素

- 元素位置改变

- 元素尺寸改变

- 内容改变

- 浏览器窗口尺寸改变

#### 如何减少重排重绘？

- 用 JavaScript 修改样式时，最好不要直接写样式，而是替换 class 来改变样式。

- 如果要对 DOM 元素执行一系列操作，可以将 DOM 元素脱离文档流，修改完成后，再将它带回文档。推荐使用隐藏元素（display:none）或文档碎片（DocumentFragement），都能很好的实现这个方案。

### 6. 使用事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。所有用到按钮的事件（多数鼠标事件和键盘事件）都适合采用事件委托技术， 使用事件委托可以节省内存。

```js
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>凤梨</li>
</ul>

// good
document.querySelector('ul').onclick = (event) => {
  const target = event.target
  if (target.nodeName === 'LI') {
    console.log(target.innerHTML)
  }
}

// bad
document.querySelectorAll('li').forEach((e) => {
  e.onclick = function() {
    console.log(this.innerHTML)
  }
}) 
```
## 打包发版

### 1.  压缩文件

压缩文件可以减少文件下载时间，让用户体验性更好。

得益于 webpack 和 node 的发展，现在压缩文件已经非常方便了。

在 webpack 可以使用如下插件进行压缩：

- JavaScript：UglifyPlugin

- CSS ：MiniCssExtractPlugin

- HTML：HtmlWebpackPlugin

其实，我们还可以做得更好。那就是使用 gzip 压缩。可以通过向 HTTP 请求头中的 Accept-Encoding 头添加 gzip 标识来开启这一功能。当然，服务器也得支持这一功能。

gzip 是目前最流行和最有效的压缩方法。举个例子，我用 Vue 开发的项目构建后生成的 app.js 文件大小为 1.4MB，使用 gzip 压缩后只有 573KB，体积减少了将近 60%。

附上 webpack 和 node 配置 gzip 的使用方法。

#### 下载插件

```shell
npm install compression-webpack-plugin --save-dev
npm install compression
```

#### webpack 配置

```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [new CompressionPlugin()],
}
```

#### node 配置

```js
const compression = require('compression')
// 在其他中间件前使用
app.use(compression())
```

### 图片优化

#### (1). 图片延迟加载

在页面中，先不给图片设置路径，只有当图片出现在浏览器的可视区域时，才去加载真正的图片，这就是延迟加载。对于图片很多的网站来说，一次性加载全部图片，会对用户体验造成很大的影响，所以需要使用图片延迟加载。

首先可以将图片这样设置，在页面不可见时图片不会加载：

```html
<img data-src="https://avatars0.githubusercontent.com/u/22117876?s=460&u=7bd8f32788df6988833da6bd155c3cfbebc68006&v=4">
```

等页面可见时，使用 JS 加载图片：

```js
const img = document.querySelector('img')
img.src = img.dataset.src
```

#### (2). 响应式图片

响应式图片的优点是浏览器能够根据屏幕大小自动加载合适的图片。

- 通过 picture 实现

```html
<picture>
	<source srcset="banner_w1000.jpg" media="(min-width: 801px)">
	<source srcset="banner_w800.jpg" media="(max-width: 800px)">
	<img src="banner_w800.jpg" alt="">
</picture>
```

- 通过 @media 实现

```css
@media (min-width: 769px) {
	.bg {
		background-image: url(bg1080.jpg);
	}
}
@media (max-width: 768px) {
	.bg {
		background-image: url(bg768.jpg);
	}
}
```

#### (3). 降低图片质量

例如 JPG 格式的图片，100% 的质量和 90% 质量的通常看不出来区别，尤其是用来当背景图的时候。我经常用 PS 切背景图时， 将图片切成 JPG 格式，并且将它压缩到 60% 的质量，基本上看不出来区别。

压缩方法有两种:

1. 一是通过 webpack 插件 image-webpack-loader

2. 二是通过在线网站进行压缩。

以下附上 webpack 插件 image-webpack-loader 的用法。

```shell
npm i -D image-webpack-loader
```

webpack 配置

```js
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use:[
    {
    loader: 'url-loader',
    options: {
      limit: 10000, /* 图片大小小于1000字节限制时会自动转成 base64 码引用*/
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    /*对图片进行压缩*/
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      }
    }
  ]
}
```


#### (4). 使用 webp 格式的图片

WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。

## 函数

### 一、节流函数

1. 使用场景

- DOM.onclick()事件，我们给一个DOM节点绑定了点击事件，当点击该元素时触发事件函数的执行，但是当我们频繁点击该元素时，就会不断触发该点击事件，如果该点击事件触发的事件函数是DOM元素的，就会造成很高的性能消耗，可能会造成页面的卡顿。

- 所以此时我们应该限制该事件的触发频率，减少页面的开销。


2. 原理

- 连续触发事件，但是事件函数只在在规定的周期之内只执行一次。


3. 代码实现

```js
function throttle(fn, wait = 500) {
    let lastTime = 0 // 初始化上一次调用的事件
    return function () {
    	let args = [].slice.call(arguments) // 将类数组转化为数组
        let nowTime = new Date().getTime() // 获取当前时间
        if(nowTime - lastTime > wait) { 
            fn.apply(this, args)
            lastTime = nowTime // 把上一次调用时间重新赋值
        }
    }
}

// 使用
let btn = document.getElementById('btn')
let fn = function () {
    console.log(1)
}
btn.onclick = throttle(fn, 1000)
```

- 在给按钮加上点击事件后，即使一直不停的点击按钮，也只会每隔1000ms执行一次事件处理函数。



### 二、防抖函数

1. 使用场景

- 例如我们在百度搜索的输入框输入我们想要搜索的内容，在我们停止输入后一小段时间(delay)后就会得你输入框得内容然后进行搜索，如果你在输入后暂停的时间小于规定的时间(delay)，就会重新计算该时间。


2. 原理

- 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。


3. 代码实现

```js
function debounce(fn, delay) {
    let timer = null
    return function () {
        let _self = this
        let args = [].slice.call(arguments)
        clearTimout(timer)
        timer = setTimout(function () {
            fn.apply(_self, args)
        }, delay)
    }
} 

// 使用
let inp = document.getElementById('inp')
function handler() {
    console.log(this.value)
}
inp.oninput = debounce(handler, 500)
```















