# CSS

## 1. 介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型（怪异盒模型）有什么不同的？

- 标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin

- 低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin

---

## 2. box-sizing属性？

- 用来控制元素的盒子模型的解析模式，默认为content-box

- context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽

- border-box：IE传统盒子模型（怪异盒模型）。设置元素的height/width属性指的是border + padding + content部分的高/宽

---

## 3. CSS选择器有哪些？哪些属性可以继承？

- CSS选择符：id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel=”external”]）、伪类选择器（a:hover, li:nth-child）

- 可继承的属性：font-size, font-family, color

- 不可继承的样式：border, padding, margin, width, height

- 优先级（就近原则）：!important > [ id > class > tag ]（!important 比内联优先级高）；当一个标签有多个className时，看该className在样式表中出现的位置,后者覆盖前者。

---
## 4. CSS3新增伪类有那些?
- p:first-of-type 选择属于其父元素的首个元素

- p:last-of-type 选择属于其父元素的最后元素

- p:only-of-type 选择属于其父元素唯一的元素
- p:only-child 选择属于其父元素的唯一子元素
- p:nth-child(2) 选择属于其父元素的第二个子元素
- :enabled :disabled 表单控件的禁用状态。
- :checked 单选框或复选框被选中。

---

## 5. display有哪些值？说明他们的作用?

- inline（默认）–内联

- none–隐藏
- block–块显示
- table–表格显示
- list-item–项目列表
- inline-block

---

## 6. position的值？
- static（默认）：按照正常文档流进行排列；

- relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
- absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
- fixed(固定定位)：所固定的参照对像是可视窗口。

---

## 7. CSS3有哪些新特性？

- RGBA和透明度

- background-image background-origin(content-box/padding-box/border-box) background-size background-repeat

- word-wrap（对长的不可分割单词换行）word-wrap：break-word

- 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）

- font-face属性：定义自己的字体

- 圆角（边框半径）：border-radius 属性用于创建圆角

- 边框图片：border-image: url(border.png) 30 30 round

- 盒阴影：box-shadow: 10px 10px 5px #888888

- 媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性

---

## 8. 常见的兼容性问题？

- 不同浏览器的标签默认的margin和padding不一样。*{margin:0;padding:0;}

- IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。hack：display:inline;将其转化为行内属性。

- 渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```css
{
background-color:#f1ee18;/*所有识别*/
.background-color:#00deff\9; /*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}
```

- 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。

- IE下，可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

- 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是改变CSS属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

---

## 9. absolute的containing block计算方式跟正常流有什么不同？
- 无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
    
    1. 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
    
    2. 否则,则由这个祖先元素的 padding box 构成。

- 如果都找不到，则为 initial containing block。

- 补充：

    1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
    
    2. absolute: 向上找最近的定位为absolute/relative的元素
    
    3. fixed: 它的containing block一律为根元素(html/body)

---

## 10. CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？

- 当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。

    1. chrome中，使用collapse值和使用hidden没有区别。
    
    2. firefox，opera和IE，使用collapse值和使用display：none没有什么区别。

---
## 11. 元素隐藏的几种方式的区别？
- display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）（不占据空间，无法点击，后面的元素会跟进）

- visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）（占据空间，无法点击，位置保留）

- 
position | area | result
---|--- | ---
absolute | top: -999em | 不占据空间
relative | top: -999em | 占据空间

- height: 0;overflow: hidden;

- opacity: 0; 或 rgba(0)
    1. opacity(0 ~ 1) : 0为完全透明（内部文字及元素都会透明）
    2. rgba : 其中alpha表示不透明度（内部文字和元素未发生变化），即只针对当前元素

---

## 12. position跟display、overflow、float这些特性相互叠加后会怎么样？
- display属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性是一种布局方式，定义元素在哪个方向浮动。

- 类似于优先级机制：position：absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float 或者absolute定位的元素，只能是块元素或表格。

---

## 13. 对BFC规范(块级格式化上下文：block formatting context)的理解？

### BFC规定了内部的Block Box如何布局。定位方案：

1. 内部的Box会在垂直方向上一个接一个放置。

2. Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。

3. 每个元素的margin box 的左边，与包含块border box的左边相接触。

4. BFC的区域不会与float box重叠。

5. BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

6. 计算BFC的高度时，浮动元素也会参与计算。

### 满足下列条件之一就可触发BFC

1. 根元素(html)

2. 浮动元素（元素的 float 不是 none）

3. 绝对定位元素（元素的 position 为 absolute 或 fixed）

4. 行内块元素（元素的 display 为 inline-block）

5. 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）

6. 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）

7. 匿名表格单元格元素（元素的 display为 table、table-row、table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）

8. overflow 值不为 visible 的块元素

9. display 值为 flow-root 的元素

10. contain 值为 layout、content或 paint 的元素

11. 弹性元素（display为 flex 或 inline-flex元素的直接子元素）

12. 网格元素（display为 grid 或 inline-grid 元素的直接子元素）

13. 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）

14. column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）

### BFC能解决的问题：

1. 父元素塌陷

2. 外边距重叠

3. 清除浮动


---

## 14. 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。

### 浮动带来的问题：

1. 父元素的高度无法被撑开，影响与父元素同级的元素

2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后

3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

### 清除浮动的方式：

1. 父级div定义height

2. 最后一个浮动元素后加空div标签 并添加样式clear:both。
```html
<div class="container">
    <div class="inner"></div>
    <div class="clear"></div>
</div>
.container{
    background: blue;
}
.inner {
    width: 100px;
    height: 100px;
    background: red;
    float: left;
}
.clear{
    clear:both;
}
```

3. 触发父盒子BFC，包含浮动元素的父标签添加样式overflow为hidden或auto。
```html
<div class="outer">
    <div class="inner">inner</div>
</div>
.outer{
    background: blue;
    overflow: hidden;
}
.inner {
    width: 100px;
    height: 100px;
    background: red;
    float: left;
}
```

4. 父级div定义zoom

5. clearfix
```html
<div class="outer clearfix">
    <div class="inner">inner</div>
</div>
.outer{
    background: blue;
}
.inner{
    width: 100px;
    height: 100px;
    background: red;
    float: left;
}
.clearfix:after{
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
```
---

## 15. 上下margin重合的问题
在重合元素外包裹一层容器，并触发该容器生成一个BFC。

```html
<div class="aside"></div>
<div class="text">
    <div class="main"></div>
</div>
<!--下面是css代码-->
    .aside {
        margin-bottom: 100px;  
        width: 100px;
        height: 150px;
        background: #f66;
    }
    .main {
        margin-top: 100px;
        height: 200px;
        background: #fcc;
    }
     .text{
        /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
        overflow: hidden;  //此时已经触发了BFC属性。
    }
```

---
## 16. 设置元素浮动后，该元素的display值是多少？
- 自动变成display:block

---
## 17. 移动端的布局用过媒体查询吗？

- 通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示。
```
<head>里边<link rel=”stylesheet” type=”text/css” href=”xxx.css” media=”only screen and (max-device-width:480px)”>

CSS : @media only screen and (max-device-width:480px) {/css样式/}
```

---
## 18. CSS优化、提高性能的方法有哪些？

- 避免过度约束

- 避免后代选择符

- 避免链式选择符

- 使用紧凑的语法

- 避免不必要的命名空间

- 避免不必要的重复

- 最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么

- 避免！important，可以选择其他选择器

- 尽可能的精简规则，你可以合并不同类里的重复规则

---
## 19.在网页中的应该使用奇数还是偶数的字体？为什么呢？

- 使用偶数字体。偶数字号相对更容易和 web 设计的其他部分构成比例关系。Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，而 13、15、17 px时用的是小一号的点。（即每个字占的空间大了 1 px，但点阵没变），于是略显稀疏。

---
## 20.::before 和 :after中双冒号和单冒号有什么区别？
- 解释一下这2个伪元素的作用

    1. 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。

    2. ::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。

- :before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after

---

## 21. 怎么让Chrome支持小于12px 的文字？
```css
p{font-size:10px;-webkit-transform:scale(0.8);} 
/* 0.8是缩放比例 */
```

---
## 22. 让页面里的字体变清晰，变细用CSS怎么做？
```
-webkit-font-smoothing在window系统下没有起作用，但是在IOS设备上起作用-webkit-font-smoothing：antialiased是最佳的，灰度平滑。
```
---
## 23. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？
- 多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。

---
## 24. li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

- 行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

- 解决方法：

    1. 可以将<li>代码全部写在一排
    
    2. 浮动li中float：left
    
    3. 在ul中用font-size：0（谷歌不支持）；可以使用letter-space：-3px

---
## 25. display:inline-block 什么时候会显示间隙？

- 有空格时候会有间隙 解决：移除空格

- margin正值的时候 解决：margin使用负值

- 使用font-size时候 解决：font-size:0、letter-spacing、word-spacing

---
## 26. png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？

1. png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。

2. jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。

3. gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.

4. webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

---
## 27.CSS属性overflow属性定义溢出元素内容区的内容会如何处理?

- 参数是scroll时候，必会出现滚动条。

- 参数是auto时候，子元素内容大于父元素时出现滚动条。
- 参数是visible时候，溢出的内容出现在父元素之外。
- 参数是hidden时候，溢出隐藏。

---

## 28.CSS3伪类和伪元素的特性和区别
- 1.伪类：
    
    - 获取不存在与DOM树中的信息。比如 a 标签的:link、visited等，这些信息不存在与DOM树结构中，只能通过CSS选择器来获取；
    - 获取不能被常规CSS选择器获取的信息。比如伪类:target，它的作用是匹配文档(页面)的URI中某个标志符的目标元素，例如我们可以通过如下代码来实现页面内的区域跳转：

- 2.伪元素 - Pseudo-elements
    - 伪元素在DOM树中创建了一些抽象元素，这些抽象元素是不存在于文档语言里的（可以理解为html源码）。比如：documen接口不提供访问元素内容的第一个字或者第一行的机制，而伪元素可以使开发者可以提取到这些信息。并且，一些伪元素可以使开发者获取到不存在于源文档中的内容（比如常见的::before,::after）。
    
    - 使用两个冒号::是为了区别伪类和伪元素（CSS2中并没有区别）。当然，考虑到兼容性，CSS2中已存的伪元素仍然可以使用一个冒号:的语法，但是CSS3中新增的伪元素必须使用两个冒号::。
    
    - 一个选择器只能使用一个伪元素，并且伪元素必须处于选择器语句的最后。
    
- 总结一下伪类与伪元素的特性及其区别：
    1. 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
    
    2. 伪元素本质上是创建了一个有内容的虚拟容器；
    3. CSS3中伪类和伪元素的语法不同；
    4. 可以同时使用多个伪类，而只能同时使用一个伪元素；
    
    
## CSS选择器( 三大特性 )

## BFC机制

## 盒模型

## CSS模块化开发(封装); SCSS和LESS的使用

## 屏幕适配 以及 页面自适应

## CSS3中新增的选择器

## CSS3中新增的属性, transform trasition animation等…
