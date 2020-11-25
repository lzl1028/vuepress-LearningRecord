# 浏览器兼容

## 1. 明确兼容的浏览器范围：
<!-[if !IE]> 除IE外都可识别 <![endif]-><br />
<!-[if IE]> 所有的IE可识别 <![endif]-><br />
<!-[if IE 6]> 仅IE6可识别 <![endif]-><br />
<!-[if lt IE 6]> IE6以及IE6以下版本可识别 <![endif]-><br />
<!-[if gte IE 6]> IE6以及IE6以上版本可识别 <![endif]-><br />
<!-[if IE 7]> 仅IE7可识别 <![endif]-><br />
<!-[if lt IE 7]> IE7以及IE7以下版本可识别 <![endif]-><br />
<!-[if gte IE 7]> IE7以及IE7以上版本可识别 <![endif]-><br />
<!-[if IE 8]> 仅IE8可识别 <![endif]-><br />
<!-[if IE 9]> 仅IE9可识别 <![endif]--><br />

## 2. 符号解释：
- ！（非）;
- lt (小于);
- lte(小于或等于);
- gt(大于);
- gte(大于或等于);
- &(与);
- |(或);

## 3. 检查页面中的伪类和伪元素，不支持的伪类和伪元素要换通用的方法兼容

## 4. 排查CSS3兼容问题

## 5. 使用CSS hack

[CSS hack大全](http://www.webhj.com/hj-650.html)

## 6.判断浏览器类型：

方式一：

```js
var isIE=!!window.ActiveXObject;
var isIE6=isIE&&!window.XMLHttpRequest;
var isIE8=isIE&&!!document.documentMode;
var isIE7=isIE&&!isIE6&&!isIE8;
if (isIE){
    if (isIE6){
        alert('ie6');
    }else if (isIE8){
        alert('ie8');
    }else if (isIE7){
        alert('ie7');
    }
}
```

方式二：

```js
if(navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.match(/6./i)=='6.'){
    alert('IE 6');
}
else if(navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.match(/7./i)=='7.'){
    alert('IE 7');
}
else if(navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.match(/8./i)=='8.'){
    alert('IE 8');
}
else if(navigator.appName == 'Microsoft Internet Explorer' && navigator.appVersion.match(/9./i)=='9.'){
    alert('IE 9');
}
```

方式三：
```js
if(navigator.userAgent.indexOf('Opera') != -1) {
alert('Opera');
}
else if(navigator.userAgent.indexOf('MSIE') != -1) {
alert('Internet Explorer');
}
else if(navigator.userAgent.indexOf('Firefox') != -1) {
alert('Firefox');
}
else if(navigator.userAgent.indexOf('Netscape') != -1) {
alert('Netscape');
}
else if(navigator.userAgent.indexOf('Safari') != -1) {
alert('Safari');
}
else{
alert('无法识别的浏览器。');
}
```

## 6. 解决 touchstart 事件与 click 事件的冲突

- 移动设备上的浏览器将会在 click 事件触发时延迟 300ms ，以确保这是一个“单击”事件而非“双击”事件。

- 而对于 touchstart 事件而言，则会在用户手指触碰屏幕的一瞬间触发所绑定的事件。所以，使用 touchstart 替换 click 事件的意义在于，帮助用户在每次点击时节省 300ms 的时间。在页面频繁需要点击，或者点击发生在动画中，对动画流畅度有较高要求的情境下，使用这种技术是非常必要的。

- 在 PC端站点适配移动端时 我们不能简单的进行 touchstart 和 click 事件的替换，因为PC并不能识别 touchstart 事件。


### 原因：

由于移动设备能够同时识别 touchstart 和 click 事件，因此当用户点击目标元素时，绑定在目标元素上的 touchstart 事件与 click 事件（约300ms后）会依次被触发，也就是说，我们所绑定的回调函数会被执行两次！。

### 解决方案：

1. 使用 preventDefault：第一种解决方案是使用事件对象中的 preventDefault 方法
```
const Button = document.getElementById("targetButton")

Button.addEventListener("touchstart", e => {
    e.preventDefault()
    console.log("touchstart event!")
})

Button.addEventListener("click", e => {
    e.preventDefault()
    console.log("click event!")
})
```

2. 基于功能检测绑定事件
```
const Button = document.getElementById("targetButton")

const clickEvent = (function() {
  if ('ontouchstart' in document.documentElement === true)
    return 'touchstart';
  else
    return 'click';
})();

Button.addEventListener(clickEvent, e => {
  console.log("things happened!")
})
```






