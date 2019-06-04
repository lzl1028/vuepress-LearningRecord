# 前端跨域问题

## 1. 跨域的概念

- 跨域是指去向一个为非本origin(协议、域名、端口任意一个不同)的目标地址发送请求的过程，这样之所以会产生问题是因为浏览器的同源策略限制。

- 跨域只存在于浏览器端，不存在于安卓/ios/Node.js/python/ java等其它环境

- 跨域请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。之所以会跨域，是因为受到了同源策略的限制，同源策略要求源相同才能正常进行通信，即协议、域名、端口号都完全一致。

- 目的：同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

- 域名、协议和端口号不一致

![image](https://user-gold-cdn.xitu.io/2018/1/20/16113382cc94c517?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- eg: 正常网站免登的请求流程
    1. 我们进入一个网站，发送登陆请求给后端
    2. 后端接受登陆请求，判断登陆信息是否准确
    3. 判断信息准确后后端后会发送response给浏览器并在response header中加入set-cookie字段
    4. 浏览器接受response返给用户，并将header中的cookie进行保存
    5. 用户关闭当前网站窗口后再次打开后，浏览器会自动将cookie加入request header实现免登

- 若用户在登录了一个网站A后，所在浏览器就记录了该网站的回馈的cookie，这时如果用户点击了网站B的链接后有可能网站B就能通过浏览器设置的cookie向网站A发起请求，这就导致了安全隐患。


## 2. 跨域的解决方案

### 1. jsonp

- 最早的解决方案之一就是jsonp,实现方式是通过script标签传递数据，因为script请求不会被同源策略禁止，所以通过script标签去请求跨域数据，并且在script的cb对应func中实现对数据的获取是可行的,当然这种方式需要后端进行配合，后端在前端进行对应请求的时候返回对应的jsonp格式的数据
php案例如下:

```js
<?php
header('Content-type: application/json');
//获取回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
//json数据
$json_data = '["customername1","customername2"]';
//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")";
?>
```

- 客户端用法如下:

```html
 <script type="text/javascript">
		function callbackFunction(result, methodName)
        {
            ///result 指向对应数据
        }
</script>
<script type="text/javascript" src="http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>

```

### 2. CORS

- 跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。
- CORS又分为简单请求和预检请求

1. 简单请求：mdn定义的简单请求就是某些不会触发cors预检的请求。
    - 设置不会触发预检的Methods : GET、HEAD、POST。 GET和POST大家都很熟悉,不再赘述，解释下HEAD请求，HEAD就是只发送请求不会收到响应的一种请求方式，日常用的比较少
    - 简单请求只可以设置如下header如下Accept、Accept-Language、Content-Language、Content-Type
    - Content-Type标头允许的值只能是：
    application/x-www-form-urlencoded、
    multipart/form-data、
    text/plain
    - 后端适配方案: 在respones header中添加Access-Control-Allow-Origin：Access-Control-Allow-Origin代表允许发送请求的源，参数可以是固定的白名单ip或者通配符,可以用通配符"*",代表接受所有请求。不过有种特殊情况是不能使用通配符的，就是前端请求header中含有withCredentials，withCredentials:true是跨域请求想要携带cookie必须加入的headers配置
     
2. 预检请求：预检请求就是在跨域的时候设置了对应的需要预检的内容,结果上会在普通跨域请求前添加了个options请求，用来检查前端headers的修改是否在后端允许范围内。 
    - 首先methods设置 PUT、DELETE、CONNECT、OPTIONS、TRACE会导致预检请求
    - 设置了Accept、Accept-Language、Content-Language、Content-Type 之外的headers中任一的配置，比如常见的token:authorization,缓存机制cache-contorl
    - Content-Type设置了简单请求不允许的值，如常用的application/json
    - 预检请求就需要后端设置更多的respones headers：
        ```
        Access-Control-Allow-Origin: http://foo.example
        Access-Control-Allow-Methods: POST, GET
        Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
        Access-Control-Max-Age: 86400
        <!--Access-Control-Allow-Methods代表可接受methods-->
        <!--Access-Control-Allow-Headers代表可接受的headers修改-->
        <!--Access-Control-Max-Age代表预检的残留时间，代表预检之后可以免预检的时间-->
        ```

- 实现CORS的几种方式

    1. 本地代理：在dva中的实现方式是在.webpackrc中添加如下代码
        ```js
        "proxy": {
            "/api": {
            "target": "http://127.0.0.1:8988/",
            "changeOrigin": true,
            "pathRewrite": { "^/api" : "" }
            }
        }
        /api代表代理的路径名，
        target代表代理的地址，
        changeOrigin代表更改发出源地址为target，
        pathRewrite代表路径重写，
        别的脚手架直接加载webpack配置文件即可
        ```
    2. nodejs中间件
        1. 用express脚手架生成express模具
            
        ```js
        npm install express-generator -g
        express --view=pug myapp
        ```
        2. 设置一个全局路由拦截
        
        ```js
        app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.method == 'OPTIONS') {
        res.send(200);
        } else {
        next();
        }
        })
        ```
        3. 再设置对应的代理逻辑
        
        ```js
        var options = {
        target: 'https://xxxx.xxx.xxx/abc/req',
        changeOrigin: true,
        pathRewrite: (path,req)=>{
            return path.replace('/api','/')
        }
        }
        app.use('/api', proxy(options));

        ```
        4. 进入bin/www中设置对应的端口，或者在process.env.PORT设置port启动值
        
        ```js
        var port = normalizePort(process.env.PORT || '7002');
        ```
        5. 启动脚手架

        ```js
        DEBUG=myapp:* npm start
        ```
    
    3. Nginx跨域代理
        - nginx-http常见配置项如下:
        
        ```
        http {
            #导入类型配置文件
            include       mime.types;
            #设定默认类型为二进制流
            default_type  application/octet-stream;
            #启用sendfile()函数
            sendfile        on;
            #客户端与服务器连接的超时时间为65秒，超过65秒，服务器关闭连接
            keepalive_timeout  65;
            #是否开启gzip，默认关闭
            #gzip  on;
            #一个server块
            server {
                #服务器监听的端口为80
                listen       80;
                #服务器名称为localhost，我们可以通过localhost来访问这个server块的服务
                server_name  localhost;
                #location块，它存放在server块当中，location会尝试根据用户请求中的URI来匹配上面的/uri表达式，如果可以匹配，就选择location {}块中的配置来处理用户请求。
                location / {
                    #以root方式设置资源路径，它与alias的不同请见下面的 http模块中文件路径定义
                    root   html;
                    #默认访问的页面，从左依次找到右，直到找到这个文件，然后返回结束请求
                    index  index.html index.htm;
                    #设置错误页面，对应的错误码是404，错误页面是/Users/user/Sites/404.html
                    error_page 404  /404.html;
                }
            }
            include servers/*;
        }

        ```
        
        - 实现反向代理的方式:
        ```js
        server {
                listen       80;
            server_name  localhost;
            location / {
                    root   /Users/abc/dist/;
                    index  index.html index.htm;
                }
        
                location /api/ {
                        proxy_pass  https://xxx.xxx.xxx/req/;
                }
        }
        location中的后的内容会尝试根据用户请求中的URI来匹配上面的/uri表达式，如果可以匹配，就选择location {}块中的配置来处理用户请求
        
        本项目中第一个location用于指向静态资源位置 root:目录,index:入口文件,第二个location用于进行api的跨域指向
        ```
        - 拓展话题 nginx还可以用于实现多入口
        
        ```js
        server {
                listen       80;
            server_name  www.aaa.com;
                location /api/ {
                        proxy_pass  http://localhost:7001;
                }
        }
        server {
                listen       80;
            server_name  www.bbb.com;
                location /api/ {
                        proxy_pass  http://localhost:7002;
                }
        }
        ```

### 3.解决方案的对比
1. json只支持get请求，无法支持复杂的请求
2. jsonp出现错误的时候，很难去进行错误识别与处理，cors可以正常错误捕捉

3. jsonp的兼容性比较高，而cors在旧版ie中需要寻找对应的替代方案
