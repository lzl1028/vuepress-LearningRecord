# 浏览器兼容

## 1. 解决 touchstart 事件与 click 事件的冲突

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






