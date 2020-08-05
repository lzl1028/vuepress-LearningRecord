# CSS居中

## 水平居中

### 1. 使用inline-block+text-align

- 原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。

- 用法：对子框设置display:inline-block，对父框设置text-align:center。

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.child{
    display:inline-block;
}
.parent{
    text-align:center;
}
```

### 2. 使用table+margin

- 原理：先将子框设置为块级表格来显示（类似 table），再设置子框居中以达到水平居中。

- 用法：对子框设置display:table，再设置margin:0 auto。

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.child {
    display:table;
    margin:0 auto;
}
```

### 3. 使用absolute+transform

- 原理：将子框设置为绝对定位，移动子框，使子框左侧距离相对框左侧边框的距离为相对框宽度的一半，再通过向左移动子框的一半宽度以达到水平居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。

- 用法：对父框设置position:relative，对子框设置position:absolute，left:50%，transform:translateX(-50%)。

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    position:relative;
}
.child {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}
```

### 4. 使用flex+justify-content

- 原理：通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。

- 用法：先将父框设置为display:flex，再设置justify-content:center。

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    display:flex;
    justify-content:center;
}
```

### 5. 使用flex+margin

- 原理：通过CSS3中的布局利器flex将子框转换为flex item，再设置子框居中以达到居中。

- 用法：先将父框设置为display:flex，再设置子框margin:0 auto。

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    display:flex;
}
.child {
    margin:0 auto;
}
```


## 垂直居中

### 1. 设定行高line-height

- 只适用于==单行==的==行内元素==

- 将line-heigh设置为行高一样的值

- 原理：在行内元素的上下加上行高的1/2

### 2. 采用伪元素实现垂直居中（::before, ::after）

- 适用于多行元素垂直居中

- 通过在父元素上添加一个高度 100%、vertical-align: middle的伪元素实现垂直居中

- vertical-align: 指在元素内的所有元素垂直位置互相置中，而不是相对于外部边框，所以应该利用伪元素添加一个伪div到框内，并使该div的高度为100%。

- 原理：利用content: ''; height: 100% 得到一个宽度为 0 的伪元素，即它不会显示出来；高度 100%，所以它最高，是所在行的基准元素；利用 vertical-align: middle 将父元素的基线设置为伪元素的中线，然后其他行内元素采用中线对齐时，自然就是要对齐伪元素的中线了。而伪元素的高度为 100%，所以它的中线就是整个父元素的中线，这就实现了其他行内元素的垂直居中。

```html
<div class="parent">
  <div class="child">child</div>
</div>
```

```css
.parent {
    width: 300px;
    height: 300px;
    border: 1px solid red;
    text-align: center;
}
.child {
    background: blue;
    width: 100px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
}
.parent::before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;            
}
```

### 3. 使用table-cell+vertical-align

- 原理：通过将父框转化为一个表格单元格显示（类似 td 和 th），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。

- 用法：先将父框设置为display:table-cell，再设置vertical-align:middle。

```html
<div class="parent">
    <div class="child>DEMO</div>
</div>
```

```css
.parent {
    display:table-cell;
    vertical-align:middle;
}
```

### 4. 使用absolute+transform

- 原理：类似于水平居中时的absolute+transform原理。将子框设置为绝对定位，移动子框，使子框上边距离相对框上边边框的距离为相对框高度的一半，再通过向上移动子框的一半高度以达到垂直居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。

- 用法：先将父框设置为position:relative，再设置子框position:absolute，top:50%，transform:translateY(-50%)。

```css
.parent {
    position:relative;
}
.child {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}
```

### 5. 使用flex+align-items

- 原理：通过设置CSS3中的布局利器flex中的属性align-times，使子框垂直居中。

- 用法：先将父框设置为position:flex，再设置align-items:center。

```css
.parent {
    position:flex;
    align-items:center;
}
```

### 6. calc（动态计算）

- 原理：让div的top属性与上方的距离（50%的外框高度 - 50%的div高度）

```css
div {
    position: relative;
    top: calc(50% - 20px);
}
```


## 水平垂直居中

### 1. 使用inline-block+text-align+table-cell+vertical-align

- 原理：使用inline-block+text-align水平居中，再用table-cell+vertical-align垂直居中，将二者结合起来。。

```css
.parent {
    text-align:center;
    display:table-cell;
    vertical-align:middle;
}
.child {
    display:inline-block;
}
```

### 2. 使用absolute+transform

- 原理：将水平居中时的absolute+transform和垂直居中时的absolute+transform相结合。

```css
.parent {
    position:relative;
}
.child {
    position:absolute;
    left:50%;
    top:50%;
    transform:tranplate(-50%,-50%);
}
```

### 3. 绝对定位 + margin

```css
.father {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}

// 或者

.father {
    position: relative;
}
.child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```


### 4. 绝对定位 + calc

```css
.father {
    position: relative;
}
.child {
    /*position: absolute;*/
    /*top: calc(50% - 50px);*/
    /*left: calc(50% - 50px);*/

    /*或者*/
    position: absolute;
    --widthChild: 100px;
    --heightChild: 100px;
    width: var(--widthChild);
    height: var(--heightChild);
    top: calc(50% - calc(var(--widthChild) / 2));
    left: calc(50% - calc(var(--heightChild) / 2));
}
```

### 5. 通过text-align

```css
.father {
    line-height: 300px;
    text-align: center;
    font-size: 0;
}
.child {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left;
}
```

### 6. 使用table-cell布局

```css
.father {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

### 7. 使用flex+justify-content+align-items

- 原理：通过设置CSS3布局利器flex中的justify-content和align-items，从而达到水平垂直居中。

```css
.parent {
    display:flex;
    justify-content:center;
    align-items:center;
}
```

### 8. 使用Grid

```css
.father {
    display: grid;
}
.child {
    align-self: center;
    justify-self: center;
}
```

### 9. writing-mode + text-align

```css
.father {
    writing-mode: vertical-lr;
    text-align: center;
}
.child {
    writing-mode: horizontal-tb;
    display: inline-block;
    margin: 0 calc(50% - 50px);
}
```











### 10. 伪元素 + calc 

```css
.father::before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-left: -5px; /*content宽度*/
}
.child {
    --widthChild: 100px;
    width: var(--widthChild);
    display: inline-block;
    vertical-align: middle;
    margin-left: calc(calc(50% - calc(var(--widthChild) / 2)));
}
```

