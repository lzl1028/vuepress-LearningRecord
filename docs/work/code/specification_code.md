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





















