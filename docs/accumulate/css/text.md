# css文本

## CSS 实现多行文字截断

![image](https://user-gold-cdn.xitu.io/2018/3/9/16208a36f41b9ce3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 1. 单行文本截断 text-overflow

- 文本溢出我们经常用到的应该就是 text-overflow: ellipsis 了，相信大家也很熟悉，只需轻松几行代码就可以实现单行文本截断。

```css
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 2. -webkit-line-clamp 实现

- 它需要和 display、-webkit-box-orient 和 overflow 结合使用：

    - display: -webkit-box; 必须结合的属性，将对象作为弹性伸缩盒子模型显示。
    
    - -webkit-box-orient; 必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式
    - text-overflow: ellipsis; 可选属性，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。

```css
div {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

- 因为 -webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。

- 使用场景：多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核，除了兼容性不好，实现截断的效果不错。


### 3. 定位元素实现多行文本截断

- 通过伪元素绝对定位到行尾并遮住文字，再通过 overflow: hidden 隐藏多余文字。

```css
p {
    position: relative;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
}
p::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
    
    /* 为了展示效果更好 */
    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
    background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```

- 它无法识别文字的长短，即文本超出范围才显示省略号，否则不显示省略号。还有因为是我们人为地在文字末尾添加一个省略号效果，就会导致它跟文字其实没有贴合的很紧密，遇到这种情况可以通过添加 word-break: break-all; 使一个单词能够在换行时进行拆分。

- 适合场景：文字内容较多，确定文字内容一定会超过容器的，那么选择这种方式不错。

### 4. float 特性实现多行文本截断

```html
<div class="wrap">
  <div class="text">Lorem ipsum dolor sit amet,
  consectetur adipisicing elit.
  Dignissimos labore sit vel 
  itaque delectus atque quos magnam assumenda 
  quod architecto perspiciatis animi.</div>
</div>
```

```css
.wrap {
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}
.wrap .text {
  float: right;
  margin-left: -5px;
  width: 100%;
  word-break: break-all;
}
.wrap::before {
  float: left;
  width: 5px;
  content: '';
  height: 40px;
}
.wrap::after {
  float: right;
  content: "...";
  height: 20px;
  line-height: 20px;
  /* 为三个省略号的宽度 */
  width: 3em;
  /* 使盒子不占位置 */
  margin-left: -3em;
  /* 移动省略号位置 */
  position: relative;
  left: 100%;
  top: -20px;
  padding-right: 5px;
}
```

- 因为我们是模拟省略号，所以显示位置有时候没办法刚刚好，所以可以考虑：

    1. 加一个渐变效果，贴合文字，就像上述 demo 效果一样
    
    2. 添加 word-break: break-all; 使一个单词能够在换行时进行拆分，这样文字和省略号贴合效果更佳。
