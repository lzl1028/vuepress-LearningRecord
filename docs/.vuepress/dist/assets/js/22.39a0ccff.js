(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{176:function(t,a,e){"use strict";e.r(a);var _=e(0),v=Object(_.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"浏览器工作原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器工作原理","aria-hidden":"true"}},[t._v("#")]),t._v(" 浏览器工作原理")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/2/20/1690aee1a258241b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),t._v(" "),e("ul",[e("li",[t._v("浏览器工作流程\n"),e("ol",[e("li",[t._v("浏览器接受url开启一个网络请求线程")]),t._v(" "),e("li",[t._v("浏览器发出一个完整的http请求")]),t._v(" "),e("li",[t._v("服务器接收请求到后台接收请求")]),t._v(" "),e("li",[t._v("使用http请求请求页面")]),t._v(" "),e("li",[t._v("把请求回来的html代码解析成DOM树")]),t._v(" "),e("li",[t._v("CSS的可视化格式模型解析")]),t._v(" "),e("li",[t._v("根据CSS属性对元素进行渲染，得到内存中的位图")]),t._v(" "),e("li",[t._v("对位图的合成")]),t._v(" "),e("li",[t._v("绘制页面")])])])]),t._v(" "),e("h2",{attrs:{id:"_1-浏览器接受url开启网络请求线程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-浏览器接受url开启网络请求线程","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 浏览器接受url开启网络请求线程")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("第一点主要涉及的是浏览器的进程、线程模型以及JS的运行机制：")])]),t._v(" "),e("li",[e("p",[t._v("大多数浏览器是多进程的，有一个主控进程，以及每一个tab页面都会新开一个进程（某些情况下多个tab会合并进程）")])]),t._v(" "),e("li",[e("p",[t._v("进程可能包括主控进程，插件进程，GPU，tab页（浏览器内核）等等。")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("Browser进程：浏览器的主进程（负责协调、主控），只有一个")])]),t._v(" "),e("li",[e("p",[t._v("第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建")])]),t._v(" "),e("li",[e("p",[t._v("GPU进程：最多一个，用于3D绘制")])]),t._v(" "),e("li",[e("p",[t._v("浏览器渲染进程（内核）：默认每个Tab页面一个进程，互不影响，控制页面渲染，脚本执行，事件处理等（有时候会优化，如多个空白tab会合并成一个进程）")])])])])]),t._v(" "),e("h2",{attrs:{id:"_2-开启网络线程发出一个完整的http请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-开启网络线程发出一个完整的http请求","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 开启网络线程发出一个完整的http请求")]),t._v(" "),e("ul",[e("li",[t._v("该部分主要包括：dns查询、tcp/ip请求构建、五层因特网等内容")])]),t._v(" "),e("h3",{attrs:{id:"dns查询"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dns查询","aria-hidden":"true"}},[t._v("#")]),t._v(" DNS查询")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("如果输入的是域名，需要进行dns解析成IP，大致流程：")]),t._v(" "),e("ol",[e("li",[t._v("如果浏览器有缓存，直接使用浏览器缓存，否则使用本机缓存，再没有的话就是用host")]),t._v(" "),e("li",[t._v("如果本地没有，就向dns域名服务器查询（当然，中间可能还会经过路由，也有缓存等），查询到对应的IP。")])])]),t._v(" "),e("li",[e("p",[t._v("DNS预解析：")])])]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('\x3c!--在head标签中，越早越好--\x3e\n<link rel="dns-prefetch" href="//example.com">\n')])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])]),e("h3",{attrs:{id:"tcp-ip请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tcp-ip请求","aria-hidden":"true"}},[t._v("#")]),t._v(" tcp/ip请求")]),t._v(" "),e("ul",[e("li",[t._v("TCP三次握手四次挥手\n"),e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/12/31/168020016083b3d4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})])]),t._v(" "),e("h4",{attrs:{id:"第一次握手：建立连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第一次握手：建立连接","aria-hidden":"true"}},[t._v("#")]),t._v(" 第一次握手：建立连接")]),t._v(" "),e("ul",[e("li",[t._v("客户端发送连接请求报文段，将SYN值设为1，Sequence Number为x。客户端进入SYN_SEND状态，等待服务器的确认。")])]),t._v(" "),e("h4",{attrs:{id:"第二次握手：服务器收到syn报文段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第二次握手：服务器收到syn报文段","aria-hidden":"true"}},[t._v("#")]),t._v(" 第二次握手：服务器收到SYN报文段")]),t._v(" "),e("ul",[e("li",[t._v("服务器收到客户端SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)。同时，自己自己还要发送SYN请求信息，将SYN值设为1，Sequence Number设为y。服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，服务器进入SYN_RECV状态。")])]),t._v(" "),e("h4",{attrs:{id:"第三次握手：客户端收到syn-ack报文段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第三次握手：客户端收到syn-ack报文段","aria-hidden":"true"}},[t._v("#")]),t._v(" 第三次握手：客户端收到SYN+ACK报文段")]),t._v(" "),e("ul",[e("li",[t._v("客户端收到服务器的SYN+ACK报文段后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。")])]),t._v(" "),e("hr"),t._v(" "),e("ul",[e("li",[e("p",[t._v("完成三次握手，客户端与服务器开始传送数据，在上述过程中，还有一些重要的概念：")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("未连接队列：在三次握手协议中，服务器维护一个未连接队列，该队列为每个客户端的SYN包（syn=j）开设一个条目，该条目表明服务器已收到SYN包，并向客户发出确认，正在等待客户的确认包。这些条目所标识的连接在服务器处于Syn_RECV状态，当服务器收到客户的确认包时，删除该条目，服务器进入ESTABLISHED状态。")])]),t._v(" "),e("li",[e("p",[t._v("Backlog参数：表示未连接队列的最大容纳数目。")])]),t._v(" "),e("li",[e("p",[t._v("SYN-ACK 重传次数：服务器发送完SYN－ACK包，如果未收到客户确认包，服务器进行首次重传，等待一段时间仍未收到客户确认包，进行第二次重传，如果重传次数超过系统规定的最大重传次数，系统将该连接信息从未连接队列中删除。注意，每次重传等待的时间不一定相同。")])]),t._v(" "),e("li",[e("p",[t._v("未连接存活时间：是指未连接队列的条目存活的最长时间，也即服务从收到SYN包到确认这个报文无效的最长时间，该时间值是所有重传请求包的最长等待时间总和。有时我们也称未连接存活时间为Timeout时间、SYN_RECV存活时间。")])])])])]),t._v(" "),e("h3",{attrs:{id:"四次挥手"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#四次挥手","aria-hidden":"true"}},[t._v("#")]),t._v(" 四次挥手")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("当主机1 发出FIN报文时，只是告诉主机2，我已经没有数据需要发送了， 但是还是可以接收主机2的数据(==第一次==)")])]),t._v(" "),e("li",[e("p",[t._v("当主机2发出报文时，只是告诉主机1，我已经接收到信号，知道你没有数据再要发送了， 但是主机2还是可以继续发送数据给主机1(==第二==次)")])]),t._v(" "),e("li",[e("p",[t._v("当主机2也真的没有数据要发送给主机1时，就会发送报文给主机1， 告诉主机1我也没有数据需要发送了(==第三次==)")])]),t._v(" "),e("li",[e("p",[t._v("主机1收到报文后，再次发送报文给主机2，说明可以关闭连接了(==第四次==)")])])]),t._v(" "),e("h3",{attrs:{id:"五层因特网协议"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#五层因特网协议","aria-hidden":"true"}},[t._v("#")]),t._v(" 五层因特网协议")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("从客户端发出http请求到服务器接收，中间会经过一系列的流程。")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("从应用层的发送http请求")])]),t._v(" "),e("li",[e("p",[t._v("到传输层通过三次握手建立tcp/ip连接")])]),t._v(" "),e("li",[e("p",[t._v("再到网络层的ip寻址")])]),t._v(" "),e("li",[e("p",[t._v("再到数据链路层的封装成帧")])]),t._v(" "),e("li",[e("p",[t._v("最后到物理层的利用物理介质传输。")])])])]),t._v(" "),e("li",[e("p",[t._v("五层因特尔协议栈：")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("应用层(dns,http)")])]),t._v(" "),e("li",[e("p",[t._v("传输层(tcp,udp) 建立tcp连接（三次握手）")])]),t._v(" "),e("li",[e("p",[t._v("网络层(IP,ARP) IP寻址")])]),t._v(" "),e("li",[e("p",[t._v("数据链路层(PPP)")])]),t._v(" "),e("li",[e("p",[t._v("物理层")])])])])]),t._v(" "),e("h2",{attrs:{id:"_3-网络通讯http协议"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-网络通讯http协议","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 网络通讯HTTP协议")]),t._v(" "),e("ul",[e("li",[t._v("HTTP协议是基于TCP协议出现的，在TCP的基础上规定了Request-Response的模型，决定了通讯必须由浏览器端发起的，首先来了解下HTTP协议的格式：")])]),t._v(" "),e("h3",{attrs:{id:"http协议格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http协议格式","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP协议格式")]),t._v(" "),e("p",[t._v("HTTP协议大致可以分成以下部分：其中path是请求路径、version是固定的字符串，依次介绍下面的每个部分：\n"),e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/2/20/1690aee1a2673661?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),t._v(" "),e("h3",{attrs:{id:"http-method-请求方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-method-请求方法","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP Method 请求方法")]),t._v(" "),e("p",[t._v("在requestline里面的方法部分，表示HTTP的操作类型，常见的几种请求方法如下：")]),t._v(" "),e("ul",[e("li",[t._v("GET：浏览器通过地址访问页面均属于get请求")]),t._v(" "),e("li",[t._v("POST：常见的表单提交")]),t._v(" "),e("li",[t._v("HEAD ：跟get类似，区别在于只返回请求头")]),t._v(" "),e("li",[t._v("PUT：表示添加资源")]),t._v(" "),e("li",[t._v("DELETE：表示删除资源")]),t._v(" "),e("li",[t._v("CONNECT： 多用于HTTPS和WebSocket")]),t._v(" "),e("li",[t._v("OPTIONS")]),t._v(" "),e("li",[t._v("TRACE")])]),t._v(" "),e("h3",{attrs:{id:"http-status-code状态码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-status-code状态码","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP Status code状态码")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("常见的状态码有以下几种：")]),t._v(" "),e("ol",[e("li",[t._v("1xx：临时回应")]),t._v(" "),e("li",[t._v("2xx：请求成功，如200")]),t._v(" "),e("li",[t._v("3xx：请求目标有变化，如301和302表示临时和永久重定向，304表示客户端没有更新内容")]),t._v(" "),e("li",[t._v("4xx;请求错误，如403无权限，404访问的资源不存在")]),t._v(" "),e("li",[t._v("5xx：服务端错误，如500服务端错误，503服务端暂时错误等")])])]),t._v(" "),e("li",[e("p",[t._v("在前端开发中，最熟悉的系列无非是大家都喜欢的200请求成功的标志，在面试中，问得较多的是304缓存问题和301、302重定向的问题。")])])]),t._v(" "),e("h3",{attrs:{id:"http-head（http头）"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-head（http头）","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP HEAD（HTTP头）")]),t._v(" "),e("p",[t._v("HTTP头可以看做是一个键值对，在HTTP标准中，")]),t._v(" "),e("ul",[e("li",[t._v("Request Header如下图：")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/2/20/1690aee1a27d4803?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),t._v(" "),e("ul",[e("li",[t._v("Response Header如下图：")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/2/20/1690aee1a29607f3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),t._v(" "),e("h2",{attrs:{id:"浏览器的工作流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的工作流程","aria-hidden":"true"}},[t._v("#")]),t._v(" 浏览器的工作流程")]),t._v(" "),e("ul",[e("li",[t._v("构建DOM树-构建CSSOM-构建渲染树-布局-绘制")])])])}],!1,null,null,null);a.default=v.exports}}]);