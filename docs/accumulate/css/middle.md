# CSS居中

## 1. 水平居中


## 2. 垂直居中

### 采用伪元素实现垂直居中

- 通过在父元素上添加一个高度 100%、vertical-align: middle的伪元素实现垂直居中

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

