# css布局

## 定宽+自适应

### 1. 使用float+margin

- 原理：通过将左框脱离文本流，加上右框向右移动一定的距离，以达到视觉上的多列布局。

- 用法：先将左框设置为float:left、margin-left:px，再设置右框margin-left:px。

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
.left {
    float:left;
    width:100px;
}
.right {
    margin-left:120px;
}
```

### 2. 使用float+margin（改良版）

- 原理：在1）的基础之上，通过向右框添加一个父框，再加上设置左、右父框属性使之产生BFC以去除bug。

- 用法：先将左框设置为float:left、margin-left:px、position:relative，再设置右父框float:right、width:100%、margin-left:px，最后设置实际的右框margin-left:*px。

```
.left {
    float:left;
    width:100px;
    position:relative;
}
.right-fix {
    float:right;
    width:100%;
    margin-left:-100px;
}
.right {
    margin-left:120px;
}
```

### 3. 使用float+overflow

- 原理：通过将左边框脱离文本流，设置右边规定当内容溢出元素框时发生的事情以达到多列布局。

- 用法：先将左框设置为float:left、width:px、margin-left:p，再设置实际的右框overflow:hidden。

```
.left {
    float:left;
    width:100px;
    margin-right:20px;
}
.right {
    overflow:hidden;
}
```

### 4. 使用table

- 原理：通过将父框设置为表格，将左右边框转化为类似于同一行的td，从而达到多列布局。

- 用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框display:table-cell，最后设置左框width:px、padding-right:px。

```
.parent {
    display:table;
    width:100%;
    table-layout:fixed;
}
.left {
    width:100px;
    padding-right:20px;
}
.right,.left {
    display:table-cell;    
}
```


### 5. 使用flex

- 原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局。

- 用法：先将父框设置为display:flex，再设置左框flex:1，最后设置左框width:px、margin-right:px。

```
.parent {
    display:flex;
}
.left {
    width:100px;
    margin-right:20px;
}
.right {
    flex:1;
}
```

## 两列定宽+一列自适应

### 1. 使用float + margin

- 原理：这种情况与两列定宽查不多。

- 用法：先将左、中框设置为float:left、width:px、margin-right:px，再设置右框overflow:hidden。

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="center">
        <p>center</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
.left,.center {
    float:left;
    width:100px;
    margin-right:20px;
}
.right {
    overflow:hidden;
}
```

## 不定宽+自适应

### 1. 使用float+overflow

- 原理：这种情况与两列定宽查不多。

- 用法：先将左框设置为float:left、margin-right:px，再设置右框overflow: hidden，最后设置左框中的内容width: px。

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
.left{
        float: left;
        margin-right: 20px;
    }
.right{
    overflow: hidden;
}
.left p{
    width: 200px;
}
```

### 2. 使用table

- 原理：通过将父框改变为表格，将左右框转换为类似于同一行的td以达到多列布局，设置父框宽度100%，给左框子元素一个固定宽度从而达到自适应。

- 用法：先将父框设置为display: table、width: 100%，再设置左、右框display: table-cell，最后设置左框width: 0.1%、padding-right: px以及左框中的内容width: px。

```
.parent{
    display: table; width: 100%;
    }
.left,.right{
    display: table-cell;
}
.left{
    width: 0.1%;
    padding-right: 20px;
}
.left p{
    width:200px;
}
```

### 3. 使用flex

- 原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局，加上给左框中的内容定宽、给右框设置flex达到不定款+自适应。

- 用法：先将父框设置为display:flex，再设置右框flex:1，最后设置左框margin-right:20px、左框中的内容width: *px。

```
.parent {
    display:flex;
}
.left {
    margin-right:20px;
}
.right {
    flex:1;
}
.left p{
    width: 200px;
}
```

## 两列不定宽+一列自适应

### 1. float + margin + overflow

- 原理：这个情况与一列不定宽+一列自适应查不多。

- 用法：先将左、中框设置为float:left、margin-right:px，再设置右框overflow:hidden，最后给左中框中的内容设置width: *px。

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="center">
        <p>center</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
.left,.center{
    float: left;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}
.left p,.center p{
    width: 100px;
}
```

## 等分布局

![image](https://user-gold-cdn.xitu.io/2018/3/8/16203aef3ea179b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 公式转化:c = w n + g (n-1) -> c = w n + g n - g -> c + g = （w + g） * n

- 我们需要解决两个问题：
    1. 如何让总宽度增加g(即：c+g)
    2. 如何让每个宽包含g（即：w+g）

### 1. 使用float

```
<div class="parent">
    <div class="column"><p>1</p></div>
    <div class="column"><p>2</p></div>
    <div class="column"><p>3</p></div>
    <div class="column"><p>4</p></div>
</div>
```

```
.parent{
    margin-left: -20px;//c增加g
}
.column{
    float: left;
    width: 25%;
    padding-left: 20px;
    box-sizing: border-box;//包含padding区域 w+g
}
```

### 2. 使用table

```
<div class="parent-fix">
    <div class="parent">
        <div class="column"><p>1</p></div>
        <div class="column"><p>2</p></div>
        <div class="column"><p>3</p></div>
        <div class="column"><p>4</p></div>
    </div>
</div>
```

```
.parent-fix{
    margin-left: -20px;//c+g
}
.parent{
    display: table;
    width:100%;
    table-layout: fixed;
}
.column{
    display: table-cell;
    padding-left: 20px;//w+g
}
```

### 3. 使用flex

```
<div class="parent">
    <div class="column"><p>1</p></div>
    <div class="column"><p>2</p></div>
    <div class="column"><p>3</p></div>
    <div class="column"><p>4</p></div>
</div>
```

```
.parent{
    display: flex;
}
.column{
    flex: 1;
}
.column+.column{
    margin-left:20px;
}
```

## 定宽+自适应+两块高度一样高

### 1. 使用table

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
.parent {
    display:table;
    width:100%;
    table-layout:fixed;
}
.left {
    width:100px;
    padding-right:20px;
}
.right,.left {
    display:table-cell;
}
```

### 2. 使用flex

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
.parent {
    display:flex;
}
.left {
    width:100px;
    margin-right:20px;
}
.right {
    flex:1;
}
```

### 3. 使用float

```
<div class="parent">
    <div class="left">
        <p>left</p>
    </div>
    <div class="right">
        <p>right</p>
        <p>right</p>
    </div>
</div>
```

```
p{
    background: none!important;
}
.left,.right{
    background: #444;
}
.parent{
    overflow: hidden;
}
.left,.right{
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
.left{
    float: left; width: 100px;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}
```


## 全屏布局

### 全屏布局的特点

- 浏览器变大时，撑满窗口

- 滚动条不是全局滚动条，而是出现在内容区域里，往往是主内容区域

![image](https://user-gold-cdn.xitu.io/2018/3/8/16203aef54cf11d4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 1. 使用position

```html
<div class="parent">
    <div class="top">top</div>
    <div class="left">left</div>
    <div class="right">
        <div class="inner">right</div>
    </div>
    <div class="bottom">bottom</div>
</div>
```

```css
html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color:white;
}
.top{
    position:absolute;
    top:0;
    left:0;
    right:0;
    height:100px;
    background:blue;
}
.left{
    position:absolute;
    left:0;
    top:100px;
    bottom:50px;
    width:200px;
    background:red;
}
.right{
    position:absolute;
    left:200px;
    top:100px;
    bottom:50px;
    right:0;
    background:pink;
    overflow: auto;
}
.right .inner{
    min-height: 1000px;
}
.bottom{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    height:50px;
    background: black;
}
```

### 2. 使用flex

```html
<div class="parent">
    <div class="top">top</div>
    <div class="middle">
        <div class="left">left</div>
        <div class="right">
            <div class="inner">right</div>
        </div>
    </div>
    <div class="bottom">bottom</div>
</div>
```

```css
html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color: white;
} 
.parent{
    display: flex;
    flex-direction: column;
}
.top{
    height:100px;
    background: blue;
}
.bottom{
    height:50px;
    background: black;
}
.middle{
    flex:1;
    display:flex;
}
.left{
    width:200px;
    background: red;
}
.right{
    flex: 1;
    overflow: auto;
    background:pink;
}
.right .inner{
    min-height: 1000px;
}
```

![image](https://user-gold-cdn.xitu.io/2018/3/8/16203aef3f0e8782?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 1. 使用flex

```html
<div class="parent">
    <div class="top">top</div>
    <div class="middle">
        <div class="left">left</div>
        <div class="right">
            <div class="inner">right</div>
        </div>
    </div>
    <div class="bottom">bottom</div>
</div>
```

```css
html,body,.parent{
    margin:0;
    height:100%;
    overflow:hidden;
}
body{
    color:white;
} 
.parent{
    display:flex;
    flex-direction:column;
}
.top{
    background:blue;
}
.bottom{
    background:black;
}
.middle{
    flex:1;
    display:flex;
}
.left{
    background: red;
}
.right{
    flex:1;
    overflow:auto;
    background: pink;
}
.right .inner{
    min-height:1000px;
}
```

### 全屏布局的小结

方案 | 兼容性 | 性能 | 自适应
--- | --- | --- | ---
Position | 好 | 好 | 部分自适应
Flex|	较差|	差|	可自适应
Grid|	差|	较好|	可自适应

## 多列布局

### 多列布局（multi-column）相关属性：
- 列数和列宽：column-count、column-width、columns
- 列的间距和分列样式：column-gap、column-rule-color、column-rule-style、column-rule-width、column-rule
- 跨越列：column-span
- 填充列：column-fill
- 分栏符：column-break-before、column-break-after、column-break-inside

![image](https://dn-mhke0kuv.qbox.me/3b8a45dbf1b7f3e177ea.jpg?imageView2/0/w/1280/h/960/ignore-error/1)

### 1. 列数和列宽
- 列数（column-count）：用来指定一个多列元素的列数。语法：
```css
<!--auto是column-count的默认值，当设置为auto时，元素分栏由其他属性决定，比如后面要讲的column-width；
它还可以是任何正整数数字，不能带单位，用来表示多列布局的列数。-->

column-count: auto || number
<!--兼容写法-->
-moz-column-count: auto || number;
-webkit-column-count: auto || number;
column-count: auto || number;

```
- 列宽（column-width）：用来设置多列布局的列宽。
```css
column-width: auto || length;

<!--默认值为auto，如果设置为auto或没有显式的设置此值时，列宽由其他属性来决定，比如：由column-count来决定；
此值还可以用固定值来设置列宽，单位可以是px或em，但不能是负值。-->

```

- columns是复合属性:

### 2. 列的间距和分列样式
- 列的间距（column-gap）:用来设置列与列之间的距离.
```css
column-gap: normal || length;
<!--默认值为normal，W3C建议1em值。此值还可以是任何非负整数值，单位可以是px、em、vw等。-->
```
- 分列样式（column-rule）：用来设置列与列之间的边框宽度、样式和颜色。
```css
column-rule:  ||   ||  ;
<!--参数说明-->
<!--column-rule-width：用来设置column-rule的样式，默认值为“none”，类似于border-width属性。-->
<!--column-rule-style：用来设置column-rule的样式，默认为none，此属性的样式和border-style的样式一样：-->
column-rule-style: none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset;
<!--column-rule-color：用来设置column-rule的颜色，类似border-color属性，如果不想显示颜色，可设置为transparent（透明色）。-->
```

### 3. 跨越列（column-span）：指定某个元素跨越多少列。
```css
column-span: none || all;
<!--默认值为none，表示不跨越任何列；all表示元素跨越所有列。-->
```
```
.columns{   
    border:1px solid #000;   
    padding:10px;   
    width:350px;   
    columns:auto 3;   
}   
h2{   
    -webkit-column-span:all;   
    column-span:all;   
}
```
![image](https://user-gold-cdn.xitu.io/2016/11/29/c15a2de98da5ed16d1632dc29bc5ab99?imageView2/0/w/1280/h/960/ignore-error/1)

### 4. 填充列（column-fill）：用来设置元素所有列的高度是否统一。  
```css
column-fill: auto || balance;
<!--默认值为auto，表示列高度自适应内容；此值设为balance时，所有列的高度以其中最高的一列统一。-->
```
### 5. 分栏符（column-break-before、column-break-after、column-break-inside） 三个属性都是用来设置对象何时断行。   
```css
column-break-before：设置或检索对象之前是否断行。
column-break-after：设置或检索对象之后是否断行。
column-break-inside：设置或检索对象内部是否断行。
```