# 移动端总结

## 1.meta基础知识：

- H5页面窗口自动调整到设备宽度，并禁止用户缩放页面

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```

- 忽略将页面中的数字识别为电话号码
```html
<meta name="format-detection" content="telephone=no" />
```

- 忽略Android平台中对邮箱地址的识别
```html
<meta name="format-detection" content="email=no" />
```

- 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- ios7.0版本以后，safari上已看不到效果 -->
```

- 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent -->
```

- viewport模板
    -  viewport模板——通用    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <title>标题</title>
    <link rel="stylesheet" href="index.css">
    </head>
    
    <body>
    这里开始内容
    </body>
    
    </html>
    ```
    - viewport模板 – target-densitydpi=device-dpi，android 2.3.5以下版本不支持
    ```html
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi"><!-- width取值与页面定义的宽度一致 -->
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <title>标题</title>
    <link rel="stylesheet" href="index.css">
    </head>
    
    <body>
    这里开始内容
    </body>
    
    </html>
    ```

## 2.常见问题

- 移动端如何定义字体font-family
    -  中文字体使用系统默认即可，英文用Helvetica
    ```css
    /* 移动端定义字体的代码 */
    body{font-family:Helvetica;}
    ```
- 移动端字体单位font-size选择px还是rem
    
    - 对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可

    - 对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备
    
    - rem配置参考：
    ```css
    html{font-size:10px}
    @media screen and (min-width:321px) and (max-width:375px){html{font-size:11px}}
    @media screen and (min-width:376px) and (max-width:414px){html{font-size:12px}}
    @media screen and (min-width:415px) and (max-width:639px){html{font-size:15px}}
    @media screen and (min-width:640px) and (max-width:719px){html{font-size:20px}}
    @media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px}}
    @media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
    @media screen and (min-width:800px){html{font-size:25px}}
    ```
- 移动端touch事件(区分webkit 和 winphone)：
    - 当用户手指放在移动设备在屏幕上滑动会触发的touch事件
    
    - 以下支持webkit
        - touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
        - touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
        - touchend——当手指离开屏幕时触发
        - touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用
    
    - TouchEvent
        - touches：屏幕上所有手指的信息
        - targetTouches：手指在目标区域的手指信息
        - changedTouches：最近一次触发该事件的手指信息
        - touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

    - 参数信息(changedTouches[0])
        - clientX、clientY在显示区的坐标
        - target：当前元素
        
    - 移动端click屏幕产生200-300 ms的延迟响应
        - 移动设备上的web网页是有300ms延迟的，玩玩会造成按钮点击延迟甚至是点击失效。
        - 原因：2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。
        - 解决方案：
            - fastclick可以解决在手机上点击事件的300ms延迟
            - zepto的touch模块，tap事件也是为了解决在click的延迟问题
    - 触摸事件的响应顺序
        - ontouchstart
        - ontouchmove
        - ontouchend
        - onclick

- Retina 显示屏
    - retina：一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个

    - 在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍
    
    - 前端的应对方案是：设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2，其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px。

- ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉：
    - 想要禁用，可设置-webkit-tap-highlight-color的alpha值为0，也就是属性值的最后一位设置为0就可以去除半透明灰色遮罩  
    ```css
    a,button,input,textarea{-webkit-tap-highlight-color: rgba(0,0,0,0;)}
    ```
- 部分android系统中元素被点击时产生的边框怎么去掉
    - 可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果
    ```css
    a,button,input,textarea{
        -webkit-tap-highlight-color: rgba(0,0,0,0;)
        -webkit-user-modify:read-write-plaintext-only;
    }
    ```

- webkit表单元素的默认外观怎么重置
    ```css
    .css{-webkit-appearance:none;}
    ```

- webkit表单输入框placeholder的颜色值能改变么
    ```css
    input::-webkit-input-placeholder{color:#AAAAAA;}
    input:focus::-webkit-input-placeholder{color:#EEEEEE;}
    ```
    
- webkit表单输入框placeholder的文字能换行么: ios可以，android不行~,在textarea标签下都可以换行~

- ::-ms-expand 适用于表单选择控件下拉箭头的修改，有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。
```css
select::-ms-expand {
display: none;
}
```

- 禁用 radio 和 checkbox 默认样式
    - ::-ms-check 适用于表单复选框或单选按钮默认图标的修改，同样有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。
```css
input[type=radio]::-ms-check,
input[type=checkbox]::-ms-check
{
display: none;
}
```

- 禁用PC端表单输入框默认清除按钮
    - 当表单文本输入框输入内容后会显示文本清除按钮，::-ms-clear 适用于该清除按钮的修改，同样设置使它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。

```css
input[type=text]::-ms-clear,
input[type=tel]::-ms-clear,
input[type=number]::-ms-clear
{
display: none;
}
```

- 禁止ios 长按时不触发系统的菜单，禁止ios&android长按时下载图片

```css
.css{-webkit-touch-callout: none}
```

- 禁止ios和android用户选中文字
```css
.css{-webkit-user-select:none}
```

- 打电话发短信写邮件怎么实现
    - 打电话: 
    ```html
    <a href="tel:0755-10086">打电话给:0755-10086</a>
    ```
    - 发短信:
    ```html
    <a href="sms:10086">发短信给: 10086</a>
    ```
    - 写邮件:
    ```html
    <a href="mailto:peun@foxmail.com">peun@foxmail.com</a>
    ```

## 3. 功能模块
- 模拟按钮hover效果
    -  移动端触摸按钮的效果，可明示用户有些事情正要发生，是一个比较好体验，但是移动设备中并没有鼠标指针，使用css的hover并不能满足我们的需求，还好国外有个激活css的active效果，代码如下，
    -  要做到全兼容的办法，可通过绑定ontouchstart和ontouchend来控制按钮的类名

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
.btn-blue-on{background-color: #357AE8;}
</style>
</head>
<body>

<div class="btn-blue">按钮</div>

<script type="text/javascript">
var btnBlue = document.querySelector(".btn-blue");
btnBlue.ontouchstart = function(){
this.className = "btn-blue btn-blue-on"
}
btnBlue.ontouchend = function(){
this.className = "btn-blue"
}
</script>
</body>
</html>
```

- 屏幕旋转的事件和样式
    - 事件： window.orientation，取值：正负90表示横屏模式、0和180表现为竖屏模式；
    
    ```js
    window.onorientationchange = function(){
    switch(window.orientation){
    case -90:
    case 90:
    alert("横屏:" + window.orientation);
    case 0:
    case 180:
    alert("竖屏:" + window.orientation);
    break;
    }
    }
    ```
    - 样式
    ```css
    //竖屏时使用的样式
    @media all and (orientation:portrait) {
    .css{}
    }
    
    //横屏时使用的样式
    @media all and (orientation:landscape) {
    .css{}
    }
    ```
    
- audio元素和video元素在ios和andriod中无法自动播放， 应对方案：触屏即播

```js
$('html').one('touchstart',function(){
audio.play()
})
```

- 摇一摇功能： HTML5 deviceMotion：封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。
- 手机拍照和上传图片： <input type=”file”>的accept 属性
```html
<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">
```

- 浏览器检测    
    
```js
;(function($){
  function detect(ua, platform){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      osx = !!ua.match(/\(Macintosh\; Intel /),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      win = /Win\d{2}|Windows/.test(platform),
      wp = ua.match(/Windows Phone ([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
      ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (wp) os.wp = true, os.version = wp[1]
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (osx || os.ios || win)) {
      browser.safari = true
      if (!os.ios) browser.version = safari[1]
    }
    if (webview) browser.webview = true

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
  }

  detect.call($, navigator.userAgent, navigator.platform)
  // make available to unit tests
  $.__detect = detect

})(Zepto)
```


## 4. 布局
- flex布局

```css
/* ============================================================
flex：定义布局为盒模型
flex-v：盒模型垂直布局
flex-1：子元素占据剩余的空间
flex-align-center：子元素垂直居中
flex-pack-center：子元素水平居中
flex-pack-justify：子元素两端对齐
兼容性：ios 4+、android 2.3+、winphone8+
============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}
```


## 5. 移动端H5页面制作规范
- 计量单位的使用:

    - css的计量单位有三种选择：
    
        1. px: 固定的相素值
        2. em: 相对父级元素的font-size设置来作为当前元素1em所代表的像素值，如父节点的font-size:10px，当前节点的font-size:1.2em,则当前节点的font-size实为12px;
        3. rem：相对根节点html的font-size设置来作为当前元素1rem所代表的像素值，与em的区别就是rem的基本度量单位与父节点无关，只与根节点font-size的设置有关，如设置html{font-size:10px;}后当前dom所有节点的1rem都表示10px;
    
    - 移动端开发中我们使用rem作为基本计量单位，同时将根节点默认字号大小设为font-size:62.5%,因移动端浏览器默认字号大小为16px;16*62.5%刚好为10px; 具体设置方法及使用示例
    ```css
    html{font-size:62.5%;/*刚好为10px;*/}
    #example{font-size:1.2rem}/*设置#example的字体大小为12px;*/
    #example div{font-size:1.4rem;width:10rem;height:10rem}/*设置#example子节点div的字体大小为14px;宽度为100px;高度100px*/
    ```
    - 安卓下textarea标签的内容字体大小不支持rem设置，如有需要使用响应式及px单位设置其字体大小

- viewport设置:
    - 在移动端开发中，我们使用如下viewport设置
    
    ```html
    <!--viewport的设置-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    ```
    - 注：device-width实际上并不等于设备宽度，而是css宽度，它是根据设备屏幕宽度和屏幕像素密度换算得出的用于网页显示的css宽度

- 移动端开发细节和优化

    - 在移动端使用新的css3样式代替原来在PC上的开发习惯
    
        1. 新的布局实现方式:使用display:box、box-flex代替floatdisplay：inline-block; 实现更强大、更完美的流体布局，尤其在宽度为100%的布局中，实现横向并排元素宽度的自动伸缩以及水平垂直居中平均分布、首尾分布排列等。

        2. 垂直居中的实现方式：使用display:-webkit-box;-webkit-box-align: center;实现垂直居中。

        3. 尽量使用border-radius，box-shadow,text-shadow等css3样式实现诸如圆角、渐变色、盒子投影、字体投影,减少使用图片。

        4. 对于单色的icon图标，我们将会整理出一套常用图标，并制作成字体，利用css3的@font-face使用自定义字体导入，这样的话，可以像修改字体一样随意地修改图标的颜色、大小、背景色、特殊效果（如投影）等，而不再需要每一种颜色就需要切一份图片。

        5. 利用-webkit-transform:rotate(90deg)来获取旋转了不同角度的icon，避免每个角度需要切一张图片

        6. 在动画中，利用css3动画属性如-webkit-transform:translate(10px,12px)来改变元素的偏移位置，减少使用left和top来做位移动画





















