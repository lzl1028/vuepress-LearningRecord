# CSS小技巧

## 1.使用:not()去除导航上不需要的边框

```css
/* 添加边框 */
.nav li {
    border-right:1px solid #666;
}
/* 然后去除最后一个元素的边框 */
.nav li:last-child {
    border-right:none;
}
/* 或 */
.nav li:not(:last-child){
    border-right:1px solid #666;
}

```
## 2.为body添加行高

```css
/* 这种方式下,文本元素可以很容易从body继承。 */
body {
     line-height: 1;
}
```

## 3.垂直居中任何元素

```css
html, body {
  height: 100%;
  margin: 0;
}

body {
  -webkit-align-items: center;  
  -ms-flex-align: center;  
  align-items: center;
  display: -webkit-flex;
  display: flex;
}
```

## 4.逗号分离的列表

```css
ul > li:not(:last-child)::after {
  content: ",";
}
```

## 5.使用负 nth-child 选择元素

```css
li {
   display: none;
}

/* 选择1到3的元素并显示 */

li:nth-child(-n+3) { 
   display: block;
}
```
## 6.文本显示优化

```css
html {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```
## 7.在纯CSS实现的内容滑块上使用max-height

```css
.slider ul {
  max-height: 0;
  overlow: hidden;
}

.slider:hover ul {
  max-height: 1000px;
  transition: .3s ease; /* animate to max-height */
}
```

## 8.继承box-sizing

```css
html {
  box-sizing: border-box;
}

, :before, *:after {
  box-sizing: inherit;
}
```
## 9.表格单元格等宽:

```css
.calendar {
  table-layout: fixed;
}
```
## 10.使用属性选择器选择空链接

```css
a[href^="http"]:empty::before {
  content: attr(href);
}
```

## 11.覆盖样式：

```html
<div class="foo">
    <div class="bar"></div>
</div>
```

```css
.foo .bar{
  background: red;
}
.bar{
  background: green;
}
/* 生效的是第一条样式。如果要让第二条生效，可以这么写: */
.bar.bar{
  background: green;
}
```


## 12.css变量 :root{}
- 设置页面基本css样式数值：

```css
:root {
   --base-font-size:30px; 
   --columns:200px 200px;
   --base-margin:30px;
}

/* 设置页面样式 */
#nav {
    margin : var(--base-margin) 0;
    font-size: var(--base-font-size);
}

/* 媒体查询中修改这些变量值:即可修改页面样式 */
@media all and (max-width: 450px){
    :root {
       --base-font-size:20px; 
       --columns:200px 100px;
       --base-margin:20px;
    }
}
```

## 一段css让全站变灰

- filter: grayscale 使用可以调整元素的灰度值

```css
.gray-filter {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1);
}
```

- 问题一：加入把这段css加到了body上
> 对于指定了 filter 样式且值不为 none 时，被应用该样式的元素其子元素中如果有 position 为 absolute 或 fixed 的元素，会为这些元素创建一个新的容器，使得这些绝对或固定定位的元素其定位的基准相对于这个新创建的容器。

- 解决方案1：影响全站的方法我们可以将该样式应用到根元素html上，即使创建了新的定位基准元素，也不会对子孙元素产生不符合预期的影响。

```css
html {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1);
}
```

- 解决方案2: 非全站变灰我们可以将需要使用filter的元素单独加上

```html

<html>
    <body>
        <div class="gray-filter"></div>
    </body>
</html>

<style>
.fixed {
    position: fixed;
    top: 100px;
    left: 100px;
    height: 100px;
    width: 100px;
    background-color: #f00;
}
.gray-filter {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1);
}
</style>
```



