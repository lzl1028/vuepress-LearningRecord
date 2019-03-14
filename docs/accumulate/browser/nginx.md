# Nginx

## 1. 简介：

nginx是一个高性能的HTTP和**反向代理服务器**，也是一个通用的TCP/UDP代理服务器，最初由俄罗斯人Igor Sysoev编写。


## 2. 正向代理与反向代理

**代理** 是在服务器和客户端之间假设的一层服务器，代理将接收客户端的请求并将它转发给服务器，然后将服务端的响应转发给客户端。

![image](https://user-gold-cdn.xitu.io/2019/3/11/1696a119014d6079?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 正向代理（VPN）

- **正向代理**，意思是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。

- 正向代理是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。

- 正向代理对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。

### 反向代理

- **反向代理**（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

- 反向代理是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。

- 反向代理对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。


## 3. 基本配置

### 配置结构

- nginx配置文件的基本结构：

![image](https://user-gold-cdn.xitu.io/2019/3/11/1696a118b4910728?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


```
events { 

}

http 
{
    server
    { 
        location path
        {
            ...
        }
        location path
        {
            ...
        }
     }

    server
    {
        ...
    }

}
```

- main:nginx的全局配置，对全局生效。

- events:配置影响nginx服务器或与用户的网络连接。

- http：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。

- server：配置虚拟主机的相关参数，一个http中可以有多个server。

- location：配置请求的路由，以及各种页面的处理情况。

- upstream：配置后端服务器具体地址，负载均衡配置不可或缺的部分。


### 内置变量

下面是nginx一些配置中常用的内置全局变量，你可以在配置的任何位置使用它们。


变量名	 | 功能
---|---
$host	 | 请求信息中的Host，如果请求中没有Host行，则等于设置的服务器名
$request_method	 | 客户端请求类型，如GET、POST
$remote_addr	| 客户端的IP地址
$args	|请求中的参数
$content_length	 | 请求头中的Content-length字段
$http_user_agent	| 客户端agent信息
$http_cookie	| 客户端cookie信息
$remote_port	| 客户端的端口
$server_protocol	| 请求使用的协议，如HTTP/1.0、·HTTP/1.1`
$server_addr	| 服务器地址
$server_name	| 服务器名称
$server_port	| 服务器的端口号


## 4. 作用

### 解决跨域

例如：
- 前端server的域名为：fe.server.com

- 后端服务的域名为：dev.server.com

现在我在fe.server.com对dev.server.com发起请求一定会出现跨域。

- 我们只需要启动一个nginx服务器，将server_name设置为fe.server.com,然后设置相应的location以拦截前端需要跨域的请求，最后将请求代理回dev.server.com。

```
server {
    listen       80;
    server_name  fe.server.com;
    location / {
            proxy_pass dev.server.com;
    }
}
```

- 这样可以完美绕过浏览器的同源策略：fe.server.com访问nginx的fe.server.com属于同源访问，而nginx对服务端转发的请求不会触发浏览器的同源策略。


### 请求过滤

- 根据状态码过滤
```
error_page 500 501 502 503 504 506 /50x.html;
    location = /50x.html {
        #将跟路径改编为存放html的路径。
        root /root/static/html;
    }

```

- 根据URL名称过滤，精准匹配URL，不匹配的URL全部重定向到主页。
```
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

- 根据请求类型过滤。

```
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
    return 403;
}
```

### 配置gzip

GZIP是规定的三种标准HTTP压缩格式之一。目前绝大多数的网站都在使用GZIP传输 HTML、CSS、JavaScript 等资源文件。

对于文本文件，GZip 的效果非常明显，开启后传输所需流量大约会降至 1/4 ~ 1/3。

并不是每个浏览器都支持gzip的，如何知道客户端是否支持gzip呢，请求头中的Accept-Encoding来标识对压缩的支持。

启用gzip同时需要客户端和服务端的支持，如果客户端支持gzip的解析，那么只要服务端能够返回gzip的文件就可以启用gzip了,我们可以通过nginx的配置来让服务端支持gzip。下面的respone中content-encoding:gzip，指服务端开启了gzip的压缩方式。
![image](https://user-gold-cdn.xitu.io/2019/3/11/1696a1190112985c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
    gzip                    on;
    gzip_http_version       1.1;        
    gzip_comp_level         5;
    gzip_min_length         1000;
    gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
```

- gzip
    1. 开启或者关闭gzip模块
    2. 默认值为off
    3. 可配置为on / off

- gzip_http_version
    1. 启用 GZip 所需的HTTP 最低版本
    2. 默认值为HTTP/1.1

- gzip_comp_level
    1. 压缩级别，级别越高压缩率越大，当然压缩时间也就越长（传输快但比较消耗cpu）。
    2. 默认值为 1
    3. 压缩级别取值为1-9

- gzip_min_length
    1. 设置允许压缩的页面最小字节数，Content-Length小于该值的请求将不会被压缩
    2. 默认值:0
    3. 当设置的值较小时，压缩后的长度可能比原文件大，建议设置1000以上

- gzip_types
    1. 要采用gzip压缩的文件类型(MIME类型)
    2. 默认值:text/html(默认不压缩js/css)


### 负载均衡

- 负载均衡就是用来帮助我们将众多的客户端请求合理的分配到各个服务器，以达到服务端资源的充分利用和更少的请求时间。

![image](https://user-gold-cdn.xitu.io/2019/3/11/1696a1193b7847ee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如上面的图，前面是众多的服务窗口，下面有很多用户需要服务，我们需要一个工具或策略来帮助我们将如此多的用户分配到每个窗口，来达到资源的充分利用以及更少的排队时间。

实现方法：

- Upstream指定后端服务器地址列表

```js
// 轮询策略:
// 默认情况下采用的策略，将所有客户端请求轮询分配给服务端。这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户。
upstream balanceServer {
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}

// 最小连接数策略
// 将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。
upstream balanceServer {
    least_conn;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}

// 最快响应时间策略
// 依赖于NGINX Plus，优先分配给响应时间最短的服务器。
upstream balanceServer {
    fair;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}

// 客户端ip绑定
// 来自同一个ip的请求永远只分配一台服务器，有效解决了动态网页存在的session共享问题。
upstream balanceServer {
    ip_hash;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

- 在server中拦截响应请求，并将请求转发到Upstream中配置的服务器列表。

```js
server {
    server_name  fe.server.com;
    listen 80;
    location /api {
        proxy_pass http://balanceServer;
    }
}
```

### 静态资源服务器

- 匹配以png|gif|jpg|jpeg为结尾的请求，并将请求转发到本地路径，root中指定的路径即nginx本地路径。同时也可以进行一些缓存的设置。

```
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;  
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为10小时          
}
```




















