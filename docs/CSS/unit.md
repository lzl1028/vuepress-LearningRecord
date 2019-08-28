# CSS计量单位

## 1.rem 和 em
-  em:em 被定义为相对于当前对象内文本的字体大小。炒个栗子，如果你给body小哥设置了font-size字体大小，那么body小哥的任何子元素的1em就是等于body设置的font-size。

```html
<body>
    <div class="test">Test</div>
</body>
```

```css
body {
    font-size: 14px;
}
div {
    font-size: 1.2em; // calculated at 14px * 1.2, or 16.8px
}
```

- rem:rem被定义为相对于根元素的字体大小，根元素一般为html标签


## 2.vh 和vw
- 1vh 等于1/100的视口高度。栗子：浏览器高度900px, 1 vh = 900px/100 = 9 px。同理，如果视口宽度未750， 1vw = 750px/100 = 7.5 px。

- 假设你要来一个和屏幕同宽的标题，你只要设置这个标题的font-size的单位为vm，那标题的字体大小就会自动根据浏览器的宽度进行缩放，以达到字体和viewport大小同步的效果

## 3.vmin 和 vmax
- vmin 和 vmax则关于视口高度和宽度两者的最小或者最大值：比如，浏览器的宽度设置为1100px，高度设置为700px， 1vmin = 7px， 1vmax = 11px。如果宽度设置为800px,高度设置为1080px, 1vmin就等于8px, 1vmax则为10.8px。

## 4.ex 和 ch
- ex 和 ch 单位，类似于 em 和 rem, 依赖于当前的字体和字体大小。 但是，不同的是，这两货是基于字体的度量单位，依赖于设定的字体。
- ch 单位通常被定义为数字0的宽度。
- ex 定义为当前字体的小写x字母的高度或者 1/2 的 1em。