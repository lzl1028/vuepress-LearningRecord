# 前端代码规范

## 1. Naming Project

### 项目命名

- 项目名全部采用小写方式， 以中划线分隔。 比如： my-project-name


### 目录名

- 目录名参照上一条规则,有复数结构时，要采用复数命名法，比如说： scripts, styles, images, data-models


### JavaScript文件命名

- 所有js文件名，多个单词组成时，采用中划线连接方式，比如说： 账号模型文件 account-model.js


### CSS，SCSS文件命名

- 多个单词组成时，采用中划线连接方式，比如说：retina-sprites.scss


### HTML文件命名

- 多个单词组成时，采用中划线连接方式，比如说: error-report.html


## 2. HTML

### 语法

- 使用四个空格的 soft tabs — 这是保证代码在各种环境下显示一致的唯一方式。
- 嵌套的节点应该缩进（四个空格）。
- 在属性上，使用双引号，不要使用单引号。
- 不要在自动闭合标签结尾处使用斜线 - HTML5 规范 指出他们是可选的。
- 不要忽略可选的关闭标签（例如，li和 </body>）。

### HTML5 doctype

- 在每个 HTML 页面开头使用这个简单地 doctype 来启用标准模式，使其每个浏览器中尽可能一致的展现。


### 语言属性

- 强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。


### IE compatibility mode

- IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。
```
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

### 字符编码

- 通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式。同时你也应该避免使用类似于<这种字符Entities, 而使用他们的entity_code <

```
<head>
    <meta charset="UTF-8">
</head>
```

### 属性顺序

- HTML 属性应该按照特定的顺序出现以保证易读性。
    
    - class
    - id
    - name
    - data-*
    - src, for, type, href, value , max-length, 
    - max, min, pattern
    - placeholder, title, alt
    - aria-*, role
    - required, readonly, disabled

- Classes 是为高可复用组件设计的，理论上他们应处在第一位。Ids 更加具体而且应该尽量少使用（例如, 页内书签），所以他们处在第二位。 

### 1. img标签要写alt属性
- 根据W3C标准，img标签要写alt属性，如果没有就写一个空的。但是一般要写一个有内容的，根据图片想要表达的意思，因为alt是在图片无法加载时显示的文字。
- 有利于SEO
```
eg: <img src="user-head.jpg" alt="Bolynga Team">
    <img src="chime-logo.svg" alt="ABC Company">
```

### 2. 单标签不要写闭合标签
- 常见的单标签有img、link、input、hr、br

```
eg:<img src="test.jpg"><br>
   <input type="email" value="">
```

### 3. 自定义属性要以data-开头
- 自己添加的非标准的属性要以data-开头

```
eg: <div data-count="5"></div>
```

### 4. td要在tr里面，li要在ul/ol里面

### 5. ul/ol的直接子元素只能是li，不能加入span等其它标签

### 6. section里面要有标题标签
- 如果你用了section/aside/article/nav这种标签的话，需要在里面写一个h1/h2/h3之类的标题标签，因为这四个标签可以划分章节，它们都是独立的章节，需要有标题，如果UI里面根本就没有标题呢？那你可以写一个隐藏的标题标签，如果出于SEO的目的，你不能直接display: none，而要用一些特殊的处理方式，如下套一个hidden-text的类：

```
<style>.hidden-text{position: absolute; left: -9999px; right: -9999px}</style>
<section>
    <h1 class="hidden-text">Listing Detail</h1>
</section>
```

### 7. 使用section标签增强SEO

```
<body>
<h1>Listing Detail</h1>
<section>
    <h1>House Infomation</h1>
    <section>
       <h1>LOCATION</h1>
       <p></p>
    </section>
    <section>
        <h1>BUILDING</h1>
        <p></p>
    </section>
</section>
<section>
    <h1>Listing Picture</h1>
</section>
</body>

outLine:
Listing Detail

    House Infomation
        LOCATION
        BUILDING
    Listing Picture
```

### 8. 行内元素里面不可使用块级元素
- 例如a标签不能嵌套div，span标签不能嵌套div

### 9. 每个页面要写<!DOCType html>
- 忘记写了会变成怪异模式，怪异模式下很多东西渲染会有所不同，怪异模式下input/textarea的默认盒模型会变成border-box，文档高度会变成可视窗口的高度，获取window的高度时就不是期望的文档高度。还有一个区别，父容器行高在怪异模式下将不会影响子元素

### 10. 要用table布局写邮件模板
- 由于邮件客户端多种多样，你不知道用户是使用什么看的邮件，有可能是用的网页邮箱，也有可能用的gmail/outlook/网易邮箱大师等客户端。这些客户端多种多样，对html/css的支持也不一，所以我们不能使用高级的布局和排版，例如flex/float/absolute定位，使用较初级的table布局能够达到兼容性最好的效果，并且还有伸缩的效果。
- 另外邮件模板里面不能写媒体查询，不能写script，不能写外联样式，这些都会被邮件客户端过滤掉，样式都得用内联style，你可以先写成外联，然后再用一些工具帮你生成内联html。
- 写完后要实际测一下，可以用QQ邮箱发送，它支持发送html格式文本，发完后在不同的客户端打开看一下，看有没有问题，如手机的客户端，电脑的客户端，以及浏览器。
- 由于你不知道用户是用手机打开还是电脑打开，所以你不能把邮件内容的宽度写死，但是完全100%也不好，在PC大屏幕上看起来可能会太大，所以一般可以这样写：
```
<table style="border-collapse:collapse;font-family: Helvetica Neue,Helvetica,Arial;font-size:14px;width:100%;height:100%">
    <tr><td align="center" valign="top"><table style="border:1px solid #ececec;border-top:none; max-width:600px;border-collapse:collapse">
    <tr><td>内容1</td></tr>
    <tr><td>内容2</td></tr>
</table></td></tr></table>
```

### 11. html要保持简洁，不要套太多层

### 12. 特殊情况下才在html里面写script和style

### 13. 样式要写在head标签里

### 14. html要加上lang的属性
- 如果是英文的网页，应该这么写：
```
<html lang="en">
<html lang="en-US">
第一种表示它是英文的网页，第二种表示它是美国英语的网页
```
- 如果是中文
```
<html lang="zh-CN">
```

### 15. 要在head标签靠前位置写上charset的meta标签
- 避免网页显示unicode符号时乱码

### 16. 特殊符号使用html实体
- 不要直接把Unicode的特殊符号直接拷到html文档里面，要使用它对应的实体Entity:
```
eg : 
© == <div>&copy;</div>
```

### 17. img空src的问题
- 如果你写了一个空的src，会导致浏览器认为src就是当前页面链接，然后会再一次请求当前页面，就跟你写一个a标签的href为空类似。如果是background-image也会有类似的问题。

```
第一种是把src写成about:blank
<img src="about:blank" alt>
这样它会去加载一个空白页面，这个没有兼容问题，不会加载当前页面，也不会报错。

第二种办法是写一个1px的透明像素的base64
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
第二种可能比较符合规范，但是第一种比较简单，并且没有兼容性问题。
```


### 18. 关于行内元素空格和换行的影响
- 有时候换行可能会引入空格
- 块级元素后面的空白文本结点将不会参与渲染

### 19. 类的命名使用小写字母加中划线连接

```
<div class="hello-world"></div>
```


### 20. 不推荐使用自定义标签

### 21. 重复杂id和重复属性
- 只取第一个

### 22. 不推荐使用属性设置样式

### 23. 使用适合的标签
- （1）如果内容是表格就使用table，table有自适应的优点；如果是一个列表就使用ol/ul标签，扩展性比较好
- （2）如果是输入框就使用input，而不是写一个p标签，然后设置contenteditable=true，因为这个在IOS Safari上光标定位容易出现问题。如果需要做特殊效果除外
- （3）如果是粗体就使用b/strong，而不是自己设置font-weight
- （4）如果是表单就使用form标签，注意form里面不能套form
- （5）如果是跳链就使用a标签，而不是自己写onclick跳转。a标签里面不能套a标签
- （6）使用html5语义化标签，如导航使用nav，侧边栏使用aside，顶部和尾部使用header/footer，页面比较独立的部分可以使用article，如用户的评论。
- （7）如果是按钮就应该写一个button或者<input type=”button”>，而不是写一个a标签设置样式，因为使用button可以设置disabled，然后使用CSS的:disabled，还有:active等伪类使用，例如在:active的时候设置按钮被按下去的感觉
- （8）如果是标题就应该使用标题标签h1/h2/h3，而不是自己写一个<p class=”title”></p>，相反如果内容不是标题就不要使用标题标签了
- （9）在手机上使用select标签，会有原生的下拉控件，手机上原生select的下拉效果体验往往比较好，不管是IOS还是android，而使用<input type=”tel”>在手机上会弹一个电话号码的键盘，<input type=”number”> <input type=”email”>都会弹相应的键盘
- （10）如果是分隔线就使用hr标签，而不是自己写一个border-bottom的样式，使用hr容易进行检查
- （11）如果是换行文本就应该使用p标签，而不是写br，因为p标签可以用margin设置行间距，但是如果是长文本的话使用div，因为p标签里面不能有p标签，特别是当数据是后端给的，可能会带有p标签，所以这时容器不能使用p标签。

### 24. 不要在https的链接里写http的图片
- 只要https的网页请求了一张http的图片，就会导致浏览器地址栏左边的小锁没有了，一般不要写死，写成根据当前域名的协议去加载，用//开头：

```
<img src=”//static.chimeroi.com/hello-world.jpg”>
```

## 3. CSS

### 语法

- 使用四个空格的 soft tabs — 这是保证代码在各种环境下显示一致的唯一方式。
- 使用组合选择器时，保持每个独立的选择器占用一行。
- 为了代码的易读性，在每个声明的左括号前增加一个空格。
- 声明块的右括号应该另起一行。

- 每条声明 : 后应该插入一个空格。
- 每条声明应该只占用一行来保证错误报告更加准确。
- 所有声明应该以分号结尾。虽然最后一条声明后的分号是可选的，但是如果没有他，你的代码会更容易出错。
- 逗号分隔的取值，都应该在逗号之后增加一个空格。比如说box-shadow
- 不要在颜色值 rgb() rgba() hsl() hsla()和 rect() 中增加空格，并且不要带有取值前面不必要的 0 (比如，使用 .5 替代 0.5)。This helps differentiate multiple color values (comma, no space) from multiple property values (comma with space).
- 所有的十六进制值都应该使用小写字母，例如 #fff。因为小写字母有更多样的外形，在浏览文档时，他们能够更轻松的被区分开来。
- 尽可能使用短的十六进制数值，例如使用 #fff 替代 #ffffff。
- 为选择器中的属性取值添加引号，例如 input[type="text"]。 他们只在某些情况下可有可无，所以都使用引号可以增加一致性。
- 不要为 0 指明单位，比如使用 margin: 0; 而不是 margin: 0px;。

```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
    padding: 15px;
    margin: 0px 0px 15px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 2px #CCC, inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
    padding: 15px;
    margin-bottom: 15px;
    background-color: rgba(0,0,0,.5);
    box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

### 声明顺序

- 相关的属性声明应该以下面的顺序分组处理：
    1. Positioning
    2. Box model 盒模型
    3. Typographic 排版
    4. Visual 外观

```css
.declaration-order {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    /* Box-model */
    display: block;
    float: right;
    width: 100px;
    height: 100px;

    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;

    /* Misc */
    opacity: 1;
}
```

```js
// 为了方便查阅， 我把Recess的order贴了一份过来, 引入时间2014-05-05

// css property order
var order = [
    'position'
    , 'top'
    , 'right'
    , 'bottom'
    , 'left'
    , 'z-index'
    , 'display'
    , 'float'
    , 'width'
    , 'height'
    , 'max-width'
    , 'max-height'
    , 'min-width'
    , 'min-height'
    , 'padding'
    , 'padding-top'
    , 'padding-right'
    , 'padding-bottom'
    , 'padding-left'
    , 'margin'
    , 'margin-top'
    , 'margin-right'
    , 'margin-bottom'
    , 'margin-left'
    , 'margin-collapse'
    , 'margin-top-collapse'
    , 'margin-right-collapse'
    , 'margin-bottom-collapse'
    , 'margin-left-collapse'
    , 'overflow'
    , 'overflow-x'
    , 'overflow-y'
    , 'clip'
    , 'clear'
    , 'font'
    , 'font-family'
    , 'font-size'
    , 'font-smoothing'
    , 'osx-font-smoothing'
    , 'font-style'
    , 'font-weight'
    , 'hyphens'
    , 'src'
    , 'line-height'
    , 'letter-spacing'
    , 'word-spacing'
    , 'color'
    , 'text-align'
    , 'text-decoration'
    , 'text-indent'
    , 'text-overflow'
    , 'text-rendering'
    , 'text-size-adjust'
    , 'text-shadow'
    , 'text-transform'
    , 'word-break'
    , 'word-wrap'
    , 'white-space'
    , 'vertical-align'
    , 'list-style'
    , 'list-style-type'
    , 'list-style-position'
    , 'list-style-image'
    , 'pointer-events'
    , 'cursor'
    , 'background'
    , 'background-attachment'
    , 'background-color'
    , 'background-image'
    , 'background-position'
    , 'background-repeat'
    , 'background-size'
    , 'border'
    , 'border-collapse'
    , 'border-top'
    , 'border-right'
    , 'border-bottom'
    , 'border-left'
    , 'border-color'
    , 'border-image'
    , 'border-top-color'
    , 'border-right-color'
    , 'border-bottom-color'
    , 'border-left-color'
    , 'border-spacing'
    , 'border-style'
    , 'border-top-style'
    , 'border-right-style'
    , 'border-bottom-style'
    , 'border-left-style'
    , 'border-width'
    , 'border-top-width'
    , 'border-right-width'
    , 'border-bottom-width'
    , 'border-left-width'
    , 'border-radius'
    , 'border-top-right-radius'
    , 'border-bottom-right-radius'
    , 'border-bottom-left-radius'
    , 'border-top-left-radius'
    , 'border-radius-topright'
    , 'border-radius-bottomright'
    , 'border-radius-bottomleft'
    , 'border-radius-topleft'
    , 'content'
    , 'quotes'
    , 'outline'
    , 'outline-offset'
    , 'opacity'
    , 'filter'
    , 'visibility'
    , 'size'
    , 'zoom'
    , 'transform'
    , 'box-align'
    , 'box-flex'
    , 'box-orient'
    , 'box-pack'
    , 'box-shadow'
    , 'box-sizing'
    , 'table-layout'
    , 'animation'
    , 'animation-delay'
    , 'animation-duration'
    , 'animation-iteration-count'
    , 'animation-name'
    , 'animation-play-state'
    , 'animation-timing-function'
    , 'animation-fill-mode'
    , 'transition'
    , 'transition-delay'
    , 'transition-duration'
    , 'transition-property'
    , 'transition-timing-function'
    , 'background-clip'
    , 'backface-visibility'
    , 'resize'
    , 'appearance'
    , 'user-select'
    , 'interpolation-mode'
    , 'direction'
    , 'marks'
    , 'page'
    , 'set-link-source'
    , 'unicode-bidi'
    , 'speak'
]
```

### 空行

- 方法之间加
- 单行或多行注释前加
- 逻辑块之间加空行增加可读性


### 变量命名

- 标准变量采用驼峰标识
- 使用的ID的地方一定全大写
- 使用的URL的地方一定全大写, 比如说 reportURL
- 涉及Android的，一律大写第一个字母
- 涉及iOS的，一律小写第一个，大写后两个字母
- 常量采用大写字母，下划线连接的方式
- 构造函数，大写第一个字母


```js
var thisIsMyName;

var goodID;

var AndroidVersion;

var iOSVersion;

var MAX_COUNT = 10;

function Person(name) {
    this.name = name
}
```

### 1. 文件名规范
- 文件名建议用小写字母加中横线的方式。因为这样可读性比较强，看起来比较清爽，像链接也是用这样的方式.

### 2. 属性书写顺序
- 属性的书写顺序对于浏览器来说没有区别，除了优先级覆盖之外。

```css
	.container {
    		/*
    		 * dispaly/float/position 这些直接影响盒模型和位置应该放在最前面
    		*/
		    display: block;
		    position: relative; 
		    
		    /*
		     * 排第二的应当是盒模型的属性
		     */
		    width: 200px;
		    height: 300px;
		    padding: 10px;
		    border: 1px solid #ccc;
		    background: #dcdcdc;
		   
		    /*
		     * 其次为文本属性
		     */
		    line-height: 150%;
		    font-size: 15px;
		    color: #282828;
		    
		    z-index: 2;
		    
		    /*
		     * CSS3的一些属性应放在最后
		     */
		    transition: opacity 3s linear;
		}
```


### 3. 不要使用样式特点命名
- 当UI需要修改样式的时候，那么根据样式特点命名的类名就失去作用了

- 类的命名应当使用它所表示的逻辑意义，如signup-success-toast、request-demo、agent-portrait、 company-logo等等。

- 如果有些样式你觉得真的特别通用，那可以把它当作一个类，如clearfix，或者有些动画效果，有几个地方都要用到，我觉得这种较为复杂并且通用的可以单独作为一个类。但是还是趋向于使用意义命名。

### 4. 不要使用hack

### 5. 选择器的性能
- 选择器一般不要写超过3个：一般只要写两三个比较重要的选择器就好了，不用每个容器都写进去，重要的目标元素套上class或者id。

- 最后一个选择器的标签的应该少用，因为如果你写个.container div{}的话，那么页面上所有的div第一次都匹配中，因为它是从右往左匹配的，这样的写的好处是html不用套很多的类，但是扩展性不好，所以不要轻易这样用，如果要用需要仔细考虑，如果合适才使用，最起码不能滥用。


### 6. 避免选择器误选
- 一方面不要写*全局匹配选择器，不管从性能还是影响范围来说都太大了
- 还有一种情况是滥用了:first-child、:nth-of-type这种选择器，使用这种选择器的后果是扩展性不好，只要html改了，就会导致样式不管用了，或者影响到了其它无关元素。
- 但是不管怎么样，不能滥用，合适的时候才使用，而不是仅仅为了少写类名。

### 7. 减少覆盖
- 覆盖是一种常用的策略，也是一种不太优雅的方式
```Css
.house{
    margin-top: 20px;
}
.house:first-child{
    margin-top: 0;
}
/*其实可以改为：只有前面有.house的.house才能命中这个选择器，由于第一个.house前面没有，所以命不中，这样看起来代码就简洁多了。*/
.house + .house{
    margin-top: 20px;
}


```
- 还有一种情况

```
.request-demo input{
    border: 1px solid #282828;
}
.request-demo input[type=submit]{
    border: none;
}
/*其实可以借助一个:not选择器:*/

.request-demo input:not([type=sbumit]){
    border: 1px solid #282828;
}

```

- 有一种覆盖是值得的，那就是响应式里面小屏的样式覆盖大屏

### 8. 使用CSS3的选择器完成一些高级的功能

### 9. 少用!important

### 10. 多写注释
- （1）文件顶部的注释
```
/*
 * @description整个列表页样式入口文件
 * @author yincheng.li
 */

```
- （2）模块的注释
```
/*详情页贷款计算器*/
```
- （3）简单注释
```
/*为了去除输入框和表单点击时的灰色背景*/
input, 
form{
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
}
```
- （4）TODO的注释

```
/* TODO(littledan): Computed properties don't work yet in nosnap.
   Rephrase when they do.
*/
表示这些代码还有待完善，或者有些缺陷需要以后修复。而这种TODO的注释一般编辑器会把TODO高亮。
```

### 11. 排版规范
- 不管是JS/CSS，缩进都调成4个空格
- 多个选择器共用一个样式集，每个选择器要各占一行
```
.landing-pop,
.samll-pop-outer,
.signup-success{   
    display: none;
}
```
- 每个属性名字冒号后面要带个空格，~、>、+选择器的前后也要带一个空格：
```
.listings > li{
    float: left;
}
```


### 12. 属性值规范
- （1）如果值是0，通常都不用带单位;
    - 但是有个特例，就是和时间有关的时间单位都要带上秒s

- （2）色值用十六进制，少用rgb
    - 如果色值的六个数字一样，那么写3个就好：
- （3）注意border none和0的区别:所以用0和none都可以去掉边框。
    - border: 0; == border-width: 0;
    - border: none; == border-style: none;

### 13. font-family的设置
- 注意使用系统字体的对应的font-family名称，如SFUIText Font这个字体，在Safari是-apple-system，而在Chrome是BlinkMacSystemFont，所以font-family可以这么写：
```
font-family{
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
/*微软雅黑*/
font-family{
    font-family: Microsoft YaHei;
}

```
- 另外font-family不能在代码任意设置，如果使用了自定义字体。因为如果你在代码里面写了好多个font-family，到时候要整体替换网页的字体就很麻烦了，
```
/*正确的做法是*/
h1,
strong,
b{
    font-family: Lato Bold;
    font-weight: normal;
}

/*如果需要加粗就用标题标签，或者b/strong标签，并且要把font-weight调回来，
因为那个字体本身就有加粗效果了，如果font-weight再是粗体的话浏览器会用自己
的算法继续加粗。
如果是细体怎么办，一方面一般细体用得比较少，另一方面没有细体的标签，可以通过套类的方式。
*/
```


### 14. 不要设置太大的z-index
- 通常自己页面的业务逻辑的z-index应该保持在个位数就好了。

### 15. 合并属性
- 一般的说法是说为了提高性能，属性要合并，但其实Chrome每个属性都是单独的，就算你合在一起，它也会帮你拆出来，如把margin拆成left/right/top/bottom，但是我们还是推荐写成合的，因为它可以让代码看起来更简洁，代码量更少

### 16. 注意float/absolute/fixed定位会强制设置成block
- 如果你浮动了，目标元素就会具有块级盒模型的特性，即使你display: table-cell或者inline也不管用。如果你是display: flex，那么float将会被忽略。

- 同样地，absolute定位和fixed定位也有同样的效果，会把行内元素变成块级的。

### 17. 清除浮动
- 清除浮动有多种方法，一般用clearfix大法，虽然这个方法有缺陷，但是它比较简单且能够适用绝大多数的场景，一个兼容IE8及以上的clearfix的写法：
```
.clearfix:after{
    content: "";
    display: table;
    clear: both;
}
```

### 18. 引号的使用
- （1）font-family:
    - 一般来说font-family不需要添加引号，即使字体名称带有空格也没关系，但是有一种情况是一定要加上引号的，就是字体名称刚好是关键词，如下字体都需要加关键词：
        ```
        font-family: "inherit", "serif", "sans-serif", "monospace", "fantasy", and "cursive"
        ```
- （2）background的url:
    - 你不加也可以，但是有一种一定要加，那就是url里面带有特殊字符没有转义，如下：
        ```
        background-url: url(//cdn.test.me/hello world.jpg)
        /*上面浏览器会去加载//cdn.test.me/hello，然后报404。
        这种情况通常是图片是用户上传的，图片的名字带有空格，
        后端给的url没有对特殊字符做处理，就会有问题，
        所以当url是可变的时候，最好还是带上引号：*/
        background-url: url('//cdn.test.me/hello world.jpg');
        ```
- （3）单引号还是双引号
    - 这两个都是合法的，只是统一一下比较好，不能一下子单引号，一下子双引号的，比较普遍的推荐是html使用双引号，css使用单引号。


### 19. CSS动画规范
- （1）不要使用all属性做动画: 使用transition做动画的时候不要使用all所有属性，在有一些浏览器上面可能会有一些问题
- （2）使用transform替代position做动画: 如果能用transform做动画的，就不会使用left/top/margin等，因为transform不会造成重绘，性能要比position那些高很多，特别是在移动端的时候效果比较明显。基本上位移的动画都能用transform完成，不需要使用CSS2的属性，如一个框从右到左弹出。
- （3）偏向于使用CSS动画替代JS动画

### 20. 不要断词
- 英文的单词或者数字如果当前行排不下会自动切到下一行，这样就导致每行长短不一，有时候可能不太美观，但是不能使用word-break: break-all把一个单词拆成两行，还有一种是使用：
```
hyphens: auto;
```
- 它会把单词拆成用-连接的形式，看起来好像挺合理，但是由于它断词断得不够彻底，有些单词断不了，长短不一的现象看起来也比较明显，有些单词还被拆成了两行，所以还不如不加。因此，不要使用断词。

### 21. 不要设置图标字体font-family
- 正确的做法是给.icon-up的元素再套一个.icon的类，font-family等对图标字体的相关设置都统一在这个类里面：因为我们可能会添加其它一些设置，有个.icon的类统一处理比较好。就不要手动一个个去设置font-family了。

### 22. 设置常见样式reset
- 由于每个浏览器都有自己的UA样式，并且这些样式还不太统一，所以需要做样式reset，常见的reset有以下：
```css
/* IE浏览器对输入控件有自己的font-family，需要统一 */
input,
textarea,
button{
    font-family: inherit;
}

/* Chrome浏览器会在输入控制聚集的时候添加一个蓝色的outline*/
input:focus,
textarea:focus,
select:focus{
    outline: none;
}

/* 去掉textarea的可拉大小功能*/
textarea{
    resize: none;
}

/* IOS Safari在横屏的时候会放大字体，第二个属性让滑动更流畅 */
html{
    -webkit-text-size-adjust: 100%;
    -webkit-overflow-scrolling : touch;
}

/* 统一标签的margin值和p标签的line-height*/
body, p, h1, h2, ul, ol, figure, li{
    padding: 0;
    margin: 0;
}

h1, h2, p{
    line-height: 150%;
}

/* 去掉select的默认样式 */
select{
    -webkit-appearance: none;
}
/* 如果有输入内容IE会给输入框右边加一个大大的X */
input::-ms-clear{
    display: none;
    width: 0;
    height: 0;
}

/* 去掉number输入框右边点击上下的小三角 */
input::-webkit-inner-spin-button{
    -webkit-appearance: none;
}

input::-webki-outer-spin-button{
    -webki-appearance: none;
}
```


### 23. 图片压缩
- 如果是色彩比较丰富的图片要使用jpg格式，不能使用png格式，png会大得多，如果是logo那种矢量图片，直接使用svg格式即可。一般来说要把图片控制在300k以内，特别是banner头图，图片的大小也要控制住。

### 24. 正确使用background和img
- 显示一张图片有两种方式，可以通过设置CSS的background-image，或者是使用img标签，究竟什么时候用哪种呢？

- 如果是头图等直接展示的图片还是要img标签，如果是做为背景图就使用background，因为使用img可以写个alt属性增强SEO，而背景图那种本身不需要SEO。虽然background有一个一个background-position: center center很好，但是头图那种还是使用img吧，自己去居中吧，不然做不了SEO。

### 25. 响应式的规范
- 响应式开发最不好不要杂合使用rem，文字字号要么全部使用rem，要么不要用，也不要使用transform: scale去缩小，因为被缩小的字号看起来会有点奇怪，别人都是14px，而你变成了13.231px，小了一点。响应式的原则一般是保持中间或者两边间距不变，然后缩小主体内容的宽度。

### 26. 适当使用:before/:after
- :before和:after可以用来画页面的一些视觉上的辅助性元素，如三角形、短的分隔线、短竖线等，可以减少页面上没有用的标签。但是页面上正常的文本等元素还是不要用before/after画了。

### 27. 少用absolute定位
- 首先absolute定位的元素渲染性能会比较高，因为它独立出来了，计算量会少，用得好还是可以的。

- 但是如果你页面的主要布局是使用absolute的那肯定是不可取的，因为absolute定位的可扩展性很差，你把每个元素的位置都定死了就变不了了，可以多用float，虽然float的性能相对较差，但是不管是实用性还是兼容性都是挺好的。

### 28. 少用inline-block布局

### 29. 图片的居中和宽高设定
- 一般来说，UI给的图片展示宽高是固定的，但是实际的图片长宽是不固定，大部分图片是长是比宽大，小部分图片是宽比长大。所以需要居中裁剪展示，如下图所示：
- 中间黑色的框是展示区域，图片的短边和窗器的边一样大，另一边按图片的原始比例拉伸，然后居中显示。这个得借助JS，因为图片未加载好之前，不知道是长边比较大还是宽比较大。如下代码：

```
<div class="img-container">
    <img src="test.jpg" alt onload="resizeImg(this, '400px', '300px'">
</div>
```

- 借助一个resizeImg函数，在onload函数里面做处理。然后居中用CSS：
```
.img-container{
    position: relative;
    width: 400px;
    height: 300px;
}
.img-container img{
    position: absolute;
    left: -9999px;
    right: -9999px;
    top: -9999px;
    bottom: -9999px;
    margin: auto;
}
```

### 30. 移动端提高可点区域范围
- 移动端的的一些图标如X，可能会设计得比较小，所以点起来会不太好点，因此要提高可点区域范围，可通过增加padding，如下代码：

```
.icon-close{
    position: abosulte;
    right: 0;
    top: 0;
    padding: 20px;
}
```

### 31. 不要设置input的line-height
- 如果设置input的line-height，如下代码，你可能要做垂直居中：

```
.request-demo input{
    height: 40px;
    line-height: 40px;
}
```

- 设置了line-height为一个很高的值，这样会导致Safari浏览器的输入光标|变得巨大，所以如果你要居中的话，使用padding吧。

### 32. 移动端弹框要禁止body滑动
- 第一种是把body fixed住，
- 第二种设置body overflow: hidden，
- 相对来说第二种比较简单一点。IOS10完全不会闪，IOS9以下还是会闪。

### 33. 对于渐变的处理

### 34. 行内元素可以直接设置margin-left/margin-right



## 四、JS编码规范

### 1. 变量命名
- （1）变量名不应以短巧为荣

    不好的变量名|好的变量名
    ---|---
    inp|input, priceInput
    day1, day2, param1|today, tomorrow
    id|userId, orderId
    obj|orderData, houseInfos
    tId|removeMsgTimerId
    handler|submitHandler, searchHandler

    - 左边的变量名都不太清楚，代码的扩展性不好，一旦代码需要加功能的话，就容易出现obj1、obj2、obj3这种很抽象的命名方式。所以一开始就要把变量的名字起得真实有意义，不要搞一些很短很通用的名字。

- （2）变量名不要使用计算机术语
- （3）变量名的对仗要明确
    - 如up/down、begin/end、opened/closed、visible/invisible、scource/target，对仗明确可以让人很清楚地知道两个变量的意义和用途。
- （4）警惕临时变量
    - 应该尽量少用temp类的变量
- （5）bool变量
    - 布尔变量不用以is/do之类的开头
    - 另外变量名不要使用否定的名词，如notOk，notReady
- （6）变量名使用正确的语法 
    - 不要使用中文拼音，如shijianchuo应改成timestamp，如果是复数的话加s，或者加上List，如orderList、menuItems，而过去式的加上ed，如updated/found等，如果正在进行的加上ing，如calling.

### 2. 声明变量时要赋值

### 3. 函数的返回值类型要确定

### 4. 不要给变量赋值undefined

### 5. 排版规范
- 一个比较流行的空格和缩进排版如下代码所示：//逗号后面带个空格，) {中间带个空格

```js
function getSeatDiscount(seatCount, currentPrice) {
    //双目运算符左右两边都带个空格
    var originPrice = editOrder.getSeatsPrice(seatCount);
    return Math.round((originPrice - currentPrice) / originPrice * 100);
}
```

- 一行太长要换行，如V8的源码里面一行最长是70个字符，超过就换行：

```js
function ArrayUnshift(arg1) {  // length == 1
//if判断里面进行了换行，并且if (中间带个空格
  if (len > 0 && UseSparseVariant(array, len, IS_ARRAY(array), len) &&
      !%object_is_sealed(array)) {
    SparseMove(array, 0, 0, len, num_arguments);
  } else {
    SimpleMove(array, 0, 0, len, num_arguments);
  }
}
```

### 6. 使用=== 代替 ==

### 7. 减少魔数
- 对一些比较重要的常量起一个名字

### 8. 不要让代码暴露在全局作用域下运行

### 9. let/var/const的使用
- 使用let有一些好处，如：
    1. （1）避免变量重复定义

        ```
        let me = "go";
        // Uncaught SyntaxError: Identifier 'me' has already been declared
        let me = "go";
        ```
    2. （2）for循环的变量作用域是独立的
    
        ```
        for(let i = 0; i <= 4; i++) {
                tasks.push(function(){
                    console.log("i is " + i);
                });
            }
        ```
- 而const适合于给常量起个名字，或者是定义其它一些不需要修改的变量，防止不小心被其它代码修改了。

### 10. 简洁代码
- （1）使用三目运算代替简单的if-else
- （2）使用箭头函数取代简单的函数

### 11. 注意避免执行过长时间的JS代码
- 对于一般的页面的数据量来说，加减乘除等计算不足以造成性能瓶颈。容易造成瓶颈的是DOM操作，特别是大批量的DOM操作，只要一次有几百上千的级别就容易造成页面卡顿。特别是不要在一个for循环里不断地修改DOM

### 12. 多写注释
- （1）文件顶部的注释，包括描述、作者、更新

```js
/*
 * @file listing-detail.js
 * @description 房源详情页的JS主文件，处理轮播、房贷计算器、约看房等逻辑
 * @author yincheng.li
 * @update (yincheng.li 2017/8/19)
 */
```

- （2）函数的注释

```js
/*
 * 和搜索界面展示有关的处理逻辑
 * @namespace
 */

var searchWinHandler = {
    /*
     * 初始化驱动函数
     * 
     * @param {bool} realTimeSearch 是否需要进行实时搜索
     * @param {HTMLFormElement} form 搜索表单DOM元素
     *
     */
    init(realTimeSearch, HTMLFormElement){

    }

    /*
     * 搜索条件展示点击X按钮的处理函数
     *
     * @param {object} jquery的点击事件event
     * @trigger 会触发search按钮的点击事件，以触发搜索
     * @returns 无返回
     *
     * TODO 这里临时使用了一个全局变量的flag，这种实现方式不太好
     * 虽然比较方便
     */              
    closeFilterSpan(event){

    }

};

 //上面的@auhor @return都是注释标签，其它常用的注释标签还有：

/*
@class 表示一个类
@constructor 构造函数
@deprecated 被弃用
@global 全局的变量
@namespace 具有命名空间作用的object，如$.fn.remove，$.fn.append，$和fn就是一个namespace，而fn是$的子命名空间
@this 这里的this指向哪里
@throws 在这个函数里面可能会抛出什么异常
@version 当前版本
*/

```
- （3）变量定义和代码的注释
    
    - 对一些比较重要的变量加注释，标明它是什么用途，以及对一些核心代码逻辑加上注释，或者比较复杂的业务逻辑，写了5个case，每个case分别代表什么；为了改某个bug而加入的代码，说明下为了解决什么问题；还有某些易混的判断，为什么if判断条件写了四个，为什么代码到这个if判断不通过就直接return了；一些常量的注释，为什么会突然冒出来100这个数字；改动了别人的代码，为什么要改动；

    ```js
    var requestData = {
            listingId: listingData.listingId,
            page: 1,
            //把200改成5，点击More的时候是重新刷新页面的，也没有其他地方用到，
            //没必要请求那么多，严重影响性能
            pageSize: 5//200    
    };
    ```

### 13. 代码不要嵌套太深
- 有些人的代码经常会套个七八层，以jq代码为例，如下：

```js
var orderHandler = {
    bindEvent: function(){
        $(".update-order").on("click", function(){
            if(orderStatus === "active"){
                ajax({
                    url: "/update-order",
                    success: function(data){
                        for(let i = 0; i < data.orders.length; i++){
                            dom.append();
                        }
                    }
                });
            } else {
                ajax({
                    url: "/create-order",
                    success: function(data){
                
                    }
                });
            }
        });
    }
};
```

- 上面的代码最深的一层缩进了八层，你可能会觉得这样逻辑挺清晰的啊，但是这种写法同时也有点面条式。以上代码如果让我写，我会这么组织：

```js
var orderHandler = {
    sendUpdateOrderReq: function(requestUrl, successCallback){
        ajax({
            url: requestUrl,
            success: successCallback;
        });
    },
    updateOrder: function(event){
        let requestUrl = orderStatus === "active" ? "/update-order" 
                                : "create-order";
        //更新订单回调函数
        let activeUpdateCallback = function(data){ 
            for(var i = 0; i < data.orders.length; i++){
                console.log(data.orders[i].id);
            }       
        };
        //创建订单回调函数
        let inactiveUpdateCallback = function(data){
        
        };      
        
        let successCallback = {
            active: activeUpdateCallback,
            inactive: inactiveUpdateCallback
        };
        //发请求处理订单
        searchHandler.sendUpdateOrderReq(requestUrl, 
                                                    successCallback[orderStatus]);
    },      
    bindEvent: function(){
        $(".update-order").on("click", searchHandler.updateOrder);
    }                                               
                                                    
};
```

- 首先把绑定的匿名函数改成有名的函数，这样有个好处，当你想要off掉的时候随时可off掉，然后可以减少一层缩进，接着把根据orderStatus不同的回调先用变量判断好，而不是同时积压到后面再一起处理。再把发送请求的函数再单独抽出来做为一个函数，这样可以减少两层缩进。上面最深的缩进为4层，减少了一半。并且你会发现这样写代码逻辑会更加清晰，我在bindEvent里面扫一眼就可以知道哪些DOM绑了哪些事件，然后我对如对哪个DOM的事件感兴趣再跳到相应的回调函数去看，而不用拉了一两页才在bindEvent里面找到目标DOM。并且把updateOrder单独做为一个独立的函数，其它地方如果需要也可以使用，例如可能还有一个组合功能的操作可能会用到。另外把ajax再做一层抽象主要是这个东西实在是太常用，让人一眼就知道要干嘛，把它分离到另外一个地方可以让具体的业务代码更加简单，例如上面发请求，我把回调函数准备好之后，只要执行一行代码就好了。你缩进太多层，一行就被空格占掉了三、四十个字符，感观上就不是很好，还会出现上面提到的，最后面要写好多个右括号收尾的情况，并且一个函数动不动就两、三百行。


### 14. jQuery编码规范
- （1）使用closest代替parent:
     1. 直接定位和目标元素的最近共同祖先节点，然后find一下目标元素就好了，这样就不会出现上面的问题，只要容器的类没有变。
- （2）选择器的性能问题
    1. 先做一个全局查找，后续的查DOM都缩小到$page的范围，$page的节点只有几十个，在几个里面找就比在document几百几千个节点里面查找要快多了。jQuery的查DOM也是用的querySelectorAll，这个函数除了用在document之外，可用在其它DOM结点。
- （3）on事件之前需要的时候才off
- （4）对DOM节点较少的不要使用委托
- （5）有时候使用原生更简单

### 15. 对于常用的属性进行缓存
eg: var location = window.location

### 16. 尽量不要在JS里面写CSS

### 17. 在必要的地方添加非空判断
- 添加非空判断可以提高代码的稳健性

### 18. 不要用for in循环数组
- 数组遍历应该使用length属性或者数组的forEach/map方法。

### 19. 分号规范

### 20. 使用location跳转需要先转义
- 对于那些根据用户输入内容做跳转，需要先把用户内容做转义，如下有问题的代码：

```js
let searchContent = form.search.value.trim();
window.location.href = `/search?key=${searchContent}`;
```

- 如果用户输入了一个#号如门牌号，将会导致#后面的内容当作锚点了，或者用户可能会输入一个空格。所以如果不确定内容的东西需要先encode一下，如下代码：

```js
let searchContent = encodeURIComponent(form.search.value.trim());
window.location.href = `/search?key=${searchContent}`;
```

这样跳转就没有问题了。

### 21. 点击跳转尽量不要使用onclick跳转: 应尽量使用a 标签

### 22. 不要直接使用localStorage
- 为了兼容Safari，不能直接使用localStorage，要做个兼容：

```js
Data.hasLocalStorage = true;
try{
    window.localStorage.trySetData = 1;
}catch(e){
    Data.hasLocalStorage = false;
}
setLocalData: function(key, value){ 
    if(Data.hasLocalStorage){
        window.localStorage[key] = value;
    }
    else{   
        util.setCookie("_LOCAL_DATA_" + key, value, 1000);
    }
},
getLocalData: function(key){
    if(Data.hasLocalStorage){
        return window.localStorage[key];
    }
    else{
        return util.getCookie("_LOCAL_DATA_" + key);
    }
}
```

- 上面代码做了个兼容，如果不支持localStorage就使用cookie。要注意cookie一个域名最多只能有4kB，50个key，而本地存储限制为5Mb.


### 23. 使用简便的转换
- （1）把字符串转整型可以使用+号
   
    ```
    let maxPrice = +form.maxPrice.value;
    +号相当于Number：
    let maxPrice = Number(form.maxPrice.value);
    ```

    1. parseInt和Number有一个很大的区别是parseInt(“10px”)结果为10，而Number(“10px”)是NaN，parseInt会更加自然，其它编程语言也有类似的转换。但是Number还是能适用很多的场景。

- （2）把小数去掉尾数转成整型，可以使用 >> 0
- （3）转成boolean值用!!

### 24. 注意返回false的变量
- 有几个值在if判断里面都返回false：0、false、””、undefined、null、NaN都是false

### 25. 使用Object.assgin简化数据赋值
- 如下代码，在发请求之前，经常需要获取表单的值，然后去修改和添加老数据提交：

```js
var orderData = {
    id: 123,
    price: 500
}

orderData.price = 600;
orderData.discount = 15;
orderData.manageFee = 100;
```

- 其实有一种更优雅的方式那就是使用Object.assign：

```js
var setOrderData = {
    price: 600,
    discount: 15,
    manageFee: 100
}

Object.assgin(orderData, setOrderData);
```

- 使用这个的好处是可以弄一个setOrderData的Object，写成大括号的形式，而不用一个个去赋值，写起来和看起来都比较累。最后再assign一下赋值给原先的Object就可以了。

### 26. 调试完去掉无关的console

### 27. 注意this的指向

### 28. 使用正则表达式做字符串处理

### 29. 保持复用模块的观念

### 30. 注意label事件会触发两次















