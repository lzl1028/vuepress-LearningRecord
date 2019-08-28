# CSS3属性与变量

## 1.border-radius
- 语法：border-radius: [左上] [右上] [右下] [左下]
- 语法：border-radius:x半径/y半径


## 2. ::after
- eg:放大镜

```css
div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #333;
    position: relative;
}
div::after {
    content: '';
    display: block;    
    width: 8px;    
    height: 60px;    
    border-radius: 5px;    
    background: #333;    
    position: absolute;    
    right: -22px;    
    top: 38px;    
    transform: rotate(-45deg);
}
```

## 3.attr和content:

- css3提供的attr：能够在css中获取到元素的某个属性值，然后插入到伪元素的content中去。

- html代码：

```html
<div data-title=“Hello World!”>hello</div>
```

- 我们来看看实现这个插件的css代码：
```css
div {
    position: relative;
}
div:hover::after {
    content: attr(data-title);    //取到data-title属性的值
    display: inline-block;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: absolute;
    top: -50px;
    left: -30px;
}
```

- 当hover的时候，在元素尾部添加一个内容为data-title属性值的元素，所以就实现了hover显示的效果，如下图所示：

## 4.box-sizing
- 在标准盒子模型中，元素的总宽＝content + padding + border + margin。
box-sizing属性就是用来重定义这个计算方式的，它有三个取值，分别是：content-box（默认）、border-box、padding-box
一般来说，假如我们需要有一个占宽200px、padding10px、border5px的div，经过计算，要这么定义样式。

```css
div {
    width: 170px;   //这里的宽度要使用200-10*2-5*2 = 170得到。
    height: 50px;
    padding: 10px;
    border: 5px solid red;
}
```

- 然后我们来使用一下box-sizing属性。

```css
div {
    box-sizing: border-box;
    width: 200px;  //这里的宽度就是元素所占总宽度，不需要计算  
    height: 50px;
    padding: 10px;
    border: 5px solid red;
}
```