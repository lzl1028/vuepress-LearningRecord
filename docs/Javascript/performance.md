# 性能优化

## 函数

### 一、节流函数

1. 使用场景

- DOM.onclick()事件，我们给一个DOM节点绑定了点击事件，当点击该元素时触发事件函数的执行，但是当我们频繁点击该元素时，就会不断触发该点击事件，如果该点击事件触发的事件函数是DOM元素的，就会造成很高的性能消耗，可能会造成页面的卡顿。

- 所以此时我们应该限制该事件的触发频率，减少页面的开销。


2. 原理

- 连续触发事件，但是事件函数只在在规定的周期之内只执行一次。


3. 代码实现

```js
function throttle(fn, wait = 500) {
    let lastTime = 0 // 初始化上一次调用的事件
    return function () {
    	let args = [].slice.call(arguments) // 将类数组转化为数组
        let nowTime = new Date().getTime() // 获取当前时间
        if(nowTime - lastTime > wait) { 
            fn.apply(this, args)
            lastTime = nowTime // 把上一次调用时间重新赋值
        }
    }
}

// 使用
let btn = document.getElementById('btn')
let fn = function () {
    console.log(1)
}
btn.onclick = throttle(fn, 1000)
```

- 在给按钮加上点击事件后，即使一直不停的点击按钮，也只会每隔1000ms执行一次事件处理函数。



### 二、防抖函数

1. 使用场景

- 例如我们在百度搜索的输入框输入我们想要搜索的内容，在我们停止输入后一小段时间(delay)后就会得你输入框得内容然后进行搜索，如果你在输入后暂停的时间小于规定的时间(delay)，就会重新计算该时间。


2. 原理

- 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。


3. 代码实现

```js
function debounce(fn, delay) {
    let timer = null
    return function () {
        let _self = this
        let args = [].slice.call(arguments)
        clearTimout(timer)
        timer = setTimout(function () {
            fn.apply(_self, args)
        }, delay)
    }
} 

// 使用
let inp = document.getElementById('inp')
function handler() {
    console.log(this.value)
}
inp.oninput = debounce(handler, 500)
```















