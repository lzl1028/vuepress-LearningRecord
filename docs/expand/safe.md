# 前端安全

## 一、XSS攻击与防御
1. **反射型XSS**

    - 发请求时，XSS代码出现在URL中，提交给服务端。服务端返回的内容，也带上了这段XSS代码。最后浏览器执行XSS代码。
    
    - 通常情况是攻击者找到有XSS漏洞的网站，然后构造一个连接，就像这种带有攻击效果的链接
    ```
    http://www.hasxss.com?x=<script>alert(document.cookie)</script>
    ```
    
    - 然后诱导你点击，通常他们会把链接短链一下迷惑你，就好比
    ```
    http://dwz.cn/woshiduanwangzhi
2. **存储型XSS**

    - 存储型和反射型的区别就是，提交的XSS代码会存储在服务器端。这种XSS也是最危险的。
    
    - 举个例子，我们的网站允许用户设置一段个性签名，会显示在个人主页。
    
    - 然后用户签名设置为数据库存储这段代码，然后页面显示出来。
    ```
    <script>alert(document.cookie)<script>。
    ```
    
    - 如果这个过程中没有经过任何转义，那么这段html就直接执行了。这样，所有访问你个人主页的用户，就都中招了。

3. **DOM XSS**

    - 这种和上面说的两种的区别就在于，DOM XSS不需要服务端参与，可以认为是前端代码漏洞导致。
    
    - 举个例子，有这样一段代码
    ```
    <script>

        eval(location.hash.substr(1));

    </script>


    // 而这个时候，如果用户在网址后面加上恶意代码

    http://www.xss.com#alert(document.cookie)
    ```
    这样就完成了攻击了。
    
    - 这也是我们常说eval不安全的原因，传入eval的字符串，天知道会是什么东西，但无论是什么，它都会去执行。

4. **防御手段**
    1. 过滤转义输入输出

        - 用户输入的情况，通常来讲也是HTTP请求。GET请求的url参数。POST请求的body数据。
        
        - 比如我们接收的数据是用户年龄，那么在后端，需要判断一下数据是否是Number，这样才能让恶意攻击者没有可乘之机。
        
        - 对于一些特殊符号，我们需要对其进行转义
        ```
        & --> &amp;
    
        < --> &lt;
    
        > --> &gt;
    
        " --> &quot;
    
        ' --> &#x27;
    
        / --> &#x2F;
        ```
        
        - 这个一方面是后端接收这些代码时候的转义存储，一方面是前端在显示的时候，需要把它们转成html实体。
        
    2. 避免使用eval，new Function等执行字符串的方法，除非确定字符串和用户输入无关。
    
    3. 使用innerHTML，document.write的时候，如果数据是用户输入的，那么需要对关键字符都进行过滤与转义。
    
    4. 对于非客户端cookie，比如保存用户凭证的session，务必标识为http only，这样js就获取不到这个cookie值了，安全性得到提高。
    
    5. 还有一种方式是主动防御。也就是当发现页面有XSS攻击时候，主动上报。至于如何检测到，目前的方式大多是对事件和脚本拦截。判断是否有恶意代码。



## 二、CSRF攻击

- CSRF全称是跨站请求伪造。

- 假设 新浪微博关注某个人的请求是GET www.weibo.com/attention?userid=123 。
所以，当用户处于登录状态下，并且访问如上链接，便会关注userid为123的用户。那么我们可以做出如下攻击。

- 编写一个恶意页面 www.csrf.com。然后在页面上加上一句
```
<img src=“www.weibo.com/attention?userid=123” />
```
- 这时，用户只要访问了这个页面，便发起了关注的请求。并且该请求还是带上了登录cookie的，因为cookie是跟随着请求域名一起的。

- 上面这个例子是一个太理想的情况，又例如实际关注的请求，是一个POST请求，那应该怎么办呢？

- 其实这也很简单，虽然发送post请求会有跨域限制，但是我们可以使用js动态生成一个form表单。然后把地址指向上述url,最后再加上自动提交即可。

```
function createForm() {

  var form = document.createElement('form');

  document.body.appendChild(form);

  form.method = 'post';

  return form;

}

function createInput() {

  // 省略一些代码，创建一些input，让form使用appendChild放进去

}

var f = createForm();

// 插入一些数据

f.action = 'http://www.csrf.com';

f.submit();
```

- CSRF的防御方式

    1. 检测http referer是否是同域名，通常来讲，用户提交的请求，referer应该是来来自站内地址，所以如果发现referer中地址异常，那么很可能是遭到了CSRF攻击。
    
    2. 避免登录的session长时间存储在客户端中。
    
    3. 关键请求使用验证码或者token机制。在一些十分关键的操作，比如交易付款环节。这种请求中，加入验证码，可以防止被恶意用户攻击。token机制也有一定的防御作用。具体来说就是服务器每次返回客户端页面的时候，在页面中埋上一个token字段，例如 
    ```
    <input type=“hidden” name=“csrftoken” value=“abcd">
    ```
    之后，客户端请求的时候带上这个token，使用这个机制后，攻击者也就很难发起CSRF攻击了。





## 三、HTTP劫持与对策

- HTTP劫持严格上来说不能完全算前端安全的范畴。因为导致这种情况的主要是运营商。

- 先简单解释下HTTP劫持吧，当我们访问页面的时候，运营商在页面的HTML代码中，插入弹窗、广告等HTML代码，来获取相应的利益。

- 针对这种情况，最好的解决方式也就是使用HTTPS，加密过后，他们就没法插入广告代码了。

- 那么对于还没有升级的情况，我们可以努力让影响降到最低。
    1. 情况一：页面被iframe嵌套了
        - 这种情况还是比较简单的。对于跨域iframe，我们是可以改变父页面地址的。
        - ![image](http://mmbiz.qpic.cn/mmbiz_png/T81bAV0NNNicG4WhJdDiaF85leYuZpTOUnHrYOsTR943vNnQb7H5zULcibTwceux1ep7wCKicJ5ACgOtnjYPbnzJrg/640?wx_fmt=png&wxfrom=5&wx_lazy=1)
        - 所以，我们在代码中加上
        ```
        if (self != top) {
    
         top.location = location.href;
    
        }
        ```
    2. 情况二：页面多出了广告的html代码或者插入广告的脚本
    
        - 这种情况下，我们能做的有限。
        
        - 一方面我们可以检测是否有新增的html。监控检测判断，发现是广告就移除掉。
        
        - 另一方面，对于使用document.write方法写入的广告，我们可以通过重写document.write方法来达到删除广告的目的

## 四、界面操作劫持

- 界面操作劫持是一种基于视觉欺骗的劫持攻击。通过在页面上覆盖一个iframe + opacity:0的页面，让用户误点击。

- 这么解释很苍白，我们来看一下具体案例：假设我开发的页面是百度

![image](http://mmbiz.qpic.cn/mmbiz_png/T81bAV0NNNicG4WhJdDiaF85leYuZpTOUnf7xGrCIic1rgxePGyb1tlqY2bworCTN9ETJticdNMtxXNY0j5vKav25g/640?wx_fmt=png&wxfrom=5&wx_lazy=1)

- 我希望诱导别人关注我的新浪微博。

![image](http://mmbiz.qpic.cn/mmbiz_png/T81bAV0NNNicG4WhJdDiaF85leYuZpTOUnOzicHXFicq3B4DINt8Ecu2ULMzPCokrqanRQb0v9AoyV13FVnXrg8TaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1)


- 这时，我可以选择在我的页面中使用iframe嵌入微博页面

![image](http://mmbiz.qpic.cn/mmbiz_png/T81bAV0NNNicG4WhJdDiaF85leYuZpTOUnict2efsMjWqbOa1lLztsEjJO8c2CXX6skA3jOkXl7JKXUuvFIv9IkSg/640?wx_fmt=png&wxfrom=5&wx_lazy=1)

- 这里我没有把opacity设置为0。如果设置为0的话。那么就完成了一次界面操作劫持了。你以为点击了百度一下，实际点击的是关注。 

## 五、防御手段
- 上面列举的例子都不具备实际攻击作用，因为浏览器厂商，W3C等已经做了很多安全工作，让我们的页面可以安稳的运行起来。但是道高一尺魔高一丈，我们要合理运用防护手段，才能让页面不被攻击。

1. HTTP响应头，在响应可以通过这些字段来提高安全性

    - X-Frame-Options 禁止页面被加载进iframe中
    
    - X-XSS-Protection 对于反射型XSS进行一些防御
    
    - X-Content-Security-Policy 这个就比较复杂了，可选项很多，用来设置允许的的资源来源以及对脚本执行环境的控制等。

2. 使用HTTPS、使用HTTP ONLY的cookie。cookie的secure字段设置为true

3. GET请求与POST请求，要严格遵守规范，不要混用，不要将一些危险的提交使用JSONP完成。
