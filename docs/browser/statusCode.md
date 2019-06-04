# 具有代表性的HTTP状态码

## 一. 2XX(Success 成功状态码):
- 2XX 响应的结果标明请求被正常处理了
1. 200 OK:表示从客户端发来的请求在服务器端被正常处理了![image](https://user-gold-cdn.xitu.io/2017/12/6/16029efa6af2ea6c?imageView2/0/w/1280/h/960/ignore-error/1)
2. 204 No Content:该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。
![image](https://user-gold-cdn.xitu.io/2017/12/6/16029efa697ec682?imageView2/0/w/1280/h/960/ignore-error/1)
    - 比如，当从浏览器发出请求 处理后，返回 204响应，那么浏览器显示的页面不发生更新。
    - 一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用
3. 206 Partial Content:        该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求
响应报文中包含由 Content-Range 指定范围的实体内容![image](https://user-gold-cdn.xitu.io/2017/12/6/16029efb76d2b65f?imageView2/0/w/1280/h/960/ignore-error/1)


## 二. 3XX(Redirection 重定向状态码):
- 3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求
1. 301 Moved Permanently：永久性重定向![image](https://user-gold-cdn.xitu.io/2017/12/6/16029efa6a4ba749?imageView2/0/w/1280/h/960/ignore-error/1)
    - 该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存
2. 302 Found：临时性重定向![image](https://user-gold-cdn.xitu.io/2017/12/6/16029efba78b2b7e?imageView2/0/w/1280/h/960/ignore-error/1)
    - 该状态码表示请求的资源已被分配了新的 URI，希望用户(本次)能使用新的 URI 访问。和 301 Moved Permanently 状态码相似，但302状态码代表的资源不是被永久移动，只是临时性质的。换句话说，已移动的资源对应的URI将来还有可能发生改变。比如，用户把 URI 保存成书签，但不会像301状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。

状态码 | 意义
---|---
200 | 请求成功
400 | 参数错误
403 | 拒绝或者禁止访问（无权限访问）
404 | 地址不存在
405 | 客户端请求中的方法被禁止（一般是请求方式错误）
500 | 服务器报错
502 | 请求超时，无效网关
503 | 服务器超载或者维护，无法响应
