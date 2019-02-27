(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{171:function(e,o,a){"use strict";a.r(o);var s=a(0),i=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,o=e.$createElement,a=e._self._c||o;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"前端本地存储"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端本地存储","aria-hidden":"true"}},[e._v("#")]),e._v(" 前端本地存储")]),e._v(" "),a("h2",{attrs:{id:"_1-cookie"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-cookie","aria-hidden":"true"}},[e._v("#")]),e._v(" 1. cookie")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("作用：")]),e._v(" "),a("ul",[a("li",[e._v("cookie是纯文本，没有可执行代码。存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来向访问者电脑上存储数据，或者某些网站为了辨别用户身份、进行session跟踪而储存在用户本地终端上的数据（通常经过加密）")])])]),e._v(" "),a("li",[a("p",[e._v("工作原理：")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("当网页要发http请求时，浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中。这些是浏览器自动帮我们做的，而且每一次http请求浏览器都会自动帮我们做。这个特点很重要，因为这关系到“什么样的数据适合存储在cookie中”。")])]),e._v(" "),a("li",[a("p",[e._v("存储在cookie中的数据，每次都会被浏览器自动放在http请求中，如果这些数据并不是每个请求都需要发给服务端的数据，浏览器这设置自动处理无疑增加了网络开销；但如果这些数据是每个请求都需要发给服务端的数据（比如身份认证信息），浏览器这设置自动处理就大大免去了重复添加操作。所以对于那种设置“每次请求都要携带的信息（最典型的就是身份认证信息）”就特别适合放在cookie中，其他类型的数据就不适合了。")])])])]),e._v(" "),a("li",[a("p",[e._v("特征")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("不同的浏览器存放的cookie位置不一样，也是不能通用的。")])]),e._v(" "),a("li",[a("p",[e._v("cookie的存储是以域名形式进行区分的，不同的域下存储的cookie是独立的。")])]),e._v(" "),a("li",[a("p",[e._v("我们可以设置cookie生效的域（当前设置cookie所在域的子域），也就是说，我们能够操作的cookie是当前域以及当前域下的所有子域")])]),e._v(" "),a("li",[a("p",[e._v("一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样,一般为20个。")])]),e._v(" "),a("li",[a("p",[e._v("每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样，一般为4KB。")])]),e._v(" "),a("li",[a("p",[e._v("cookie也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁")])])])]),e._v(" "),a("li",[a("p",[e._v("cookie值设置")]),e._v(" "),a("ul",[a("li",[e._v("客户端设置")])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("document.cookie = '名字=值';\ndocument.cookie = 'username=cfangxu;domain=baike.baidu.com'    并且设置了生效域\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("ul",[a("li",[e._v("注意：客户端可以设置cookie 的下列选项：expires、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功），但无法设置HttpOnly选项。")]),e._v(" "),a("li",[e._v("服务器端设置：\n不管你是请求一个资源文件（如 html/js/css/图片），还是发送一个ajax请求，服务端都会返回response。而response header中有一项叫set-cookie，是服务端专门用来设置cookie的。")])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Set-Cookie 消息头是一个字符串，其格式如下（中括号中的部分是可选的）：\nSet-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("ul",[a("li",[e._v("注意： 一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。")]),e._v(" "),a("li",[e._v("服务端可以设置cookie 的所有选项：expires、domain、path、secure、HttpOnly\n通过 Set-Cookie 指定的这些可选项只会在浏览器端使用，而不会被发送至服务器端。")])])])]),e._v(" "),a("h2",{attrs:{id:"_2-localstorage（本地存储）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-localstorage（本地存储）","aria-hidden":"true"}},[e._v("#")]),e._v(" 2. localStorage（本地存储）")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("特点")]),e._v(" "),a("ul",[a("li",[e._v("生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。")]),e._v(" "),a("li",[e._v("存储的信息在同一域中是共享的。")]),e._v(" "),a("li",[e._v("当本页操作（新增、修改、删除）了localStorage的时候，本页面不会触发storage事件,但是别的页面会触发storage事件。")]),e._v(" "),a("li",[e._v("大小：据说是5M（跟浏览器厂商有关系）\n在非IE下的浏览中可以本地打开。IE浏览器要在服务器中打开。")]),e._v(" "),a("li",[e._v("localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡\nlocalStorage受同源策略的限制")])])]),e._v(" "),a("li",[a("p",[e._v("设置\nlocalStorage.setItem('username','cfangxu');")])]),e._v(" "),a("li",[a("p",[e._v("获取\nlocalStorage.getItem('username')\n也可以获取键名\nlocalStorage.key(0) #获取第一个键名")])]),e._v(" "),a("li",[a("p",[e._v("删除\nlocalStorage.remove('username')\n也可以一次性清除所有存储\nlocalStorage.clear()")])])]),e._v(" "),a("h2",{attrs:{id:"_3-sessionstorage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-sessionstorage","aria-hidden":"true"}},[e._v("#")]),e._v(" 3. sessionStorage")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("其实跟localStorage差不多，也是本地存储，会话本地存储")])]),e._v(" "),a("li",[a("p",[e._v("特点：\n用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁，或者在新窗口打开同源的另一个页面，sessionStorage也是没有的。")])])]),e._v(" "),a("h2",{attrs:{id:"cookie、localstorage、sessionstorage区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie、localstorage、sessionstorage区别","aria-hidden":"true"}},[e._v("#")]),e._v(" cookie、localStorage、sessionStorage区别")]),e._v(" "),a("ul",[a("li",[e._v("相同：在本地（浏览器端）存储数据")]),e._v(" "),a("li",[e._v("不同：\n"),a("ul",[a("li",[a("p",[e._v("localStorage、sessionStorage")])]),e._v(" "),a("li",[a("p",[e._v("localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。")])]),e._v(" "),a("li",[a("p",[e._v("sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。")])]),e._v(" "),a("li",[a("p",[e._v("localStorage是永久存储，除非手动删除。")])]),e._v(" "),a("li",[a("p",[e._v("sessionStorage当会话结束（当前页面关闭的时候，自动销毁）")])]),e._v(" "),a("li",[a("p",[e._v("cookie的数据会在每一次发送http请求的时候，同时发送给服务器而localStorage、sessionStorage不会。")])])])])])])}],!1,null,null,null);o.default=i.exports}}]);