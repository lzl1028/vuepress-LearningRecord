# js定时器是否准时

本文将测试setInterval、setTimeout、requestAnimationFrame这三个方法在浏览器可见以及不可见状态下的表现

## 浏览器可见和不可见状态

浏览器的可见和不可见状态的切换会触发visibilitychange事件，我们可以通过监听这个事件来判别浏览器的可见状态。

```js
document.addEventListener("visibilitychange", function() {
  console.log(document.visibilityState);
});
```

document.visibilityState有三个值

- hidden：页面彻底不可见。

- visible：页面至少一部分可见。

- prerender：页面即将或正在渲染，处于不可见状态。

当我们浏览器切换当前页面到另外一个标签页或者把浏览器最小化的时候，document.visibilityState就会是hidden值。我们也可以使用document.hidden，它返回一个布尔值，为true的时候，说明当前浏览器是不可见状态。

## setInterval

```js
<button id="btn">开始计时</button>

// 兼容ie写法
document.getElementById('btn').addEventListener('click', function() {
  setInterval(function() {
    const myDate = new Date();
    const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
    // 每次循环打印当前时间
    console.log(currentDate);
  }, 500);
});

// 浏览器可见状态切换事件
document.addEventListener('visibilitychange', function() { 
  if(document.hidden) {
    console.log('页面不可见');
  }
});
```

> 结论，**谷歌浏览器中，当页面处于不可见状态时，setInterval的最小间隔时间会被限制为1s。火狐浏览器的setInterval和谷歌特性一致，但是ie浏览器没有对不可见状态时的setInterval进行性能优化，不可见前后间隔时间不变。**

## setTimeout

```js
function timer() {
  setTimeout(function() {
    const myDate = new Date();
    const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
    console.log(currentDate);
    timer();
  }, 500)
}
// 兼容ie写法
document.getElementById('btn').addEventListener('click', function() {
  timer();
});
```

> 结论，**在谷歌浏览器中，setTimeout在浏览器不可见状态下间隔低于1s的会变为1s，大于等于1s的会变成N+1s的间隔值。火狐浏览器下setTimeout的最小间隔时间会变为1s,大于等于1s的间隔不变。ie浏览器在不可见状态前后的间隔时间不变。**


## requestAnimationFrame

raf是浏览器提供的一个更流畅的处理动画的方法，它会在下次浏览器GUI绘制页面的时候运行传入的方法。GUI绘制页面的频率跟显示器的刷新率有关，普通显示器的刷新率是60hz，因此raf在一秒之内需要运行60次，间隔四舍五入大概是17ms。

```js
function timer() {
  const myDate = new Date();
  const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
  console.log(currentDate);
  window.requestAnimationFrame(timer)
}
// 兼容ie写法
document.getElementById('btn').addEventListener('click', function() {
  timer();
});
```

> 谷歌浏览器和ie浏览器当浏览器状态为不可见时，raf方法将停止执行。火狐浏览器当状态变为不可见时，会在间隔是1s,2s,4s,8s,16s,32s...这样的顺序下去执行raf方法。

## 总结

- 谷歌浏览器中，当页面处于不可见状态时，setInterval的最小间隔时间会被限制为1s。火狐浏览器的setInterval和谷歌特性一致。ie浏览器没有对不可见状态时的setInterval进行性能优化，不可见前后间隔时间不变。

- 在谷歌浏览器中，setTimeout在浏览器不可见状态下间隔低于1s的会变为1s，大于等于1s的会变成N+1s的间隔值。火狐浏览器下setTimeout的最小间隔时间会变为1s,大于等于1s的间隔不变。ie浏览器在不可见状态前后的间隔时间不变。

- 谷歌浏览器和ie浏览器当浏览器状态为不可见时，raf方法将停止执行。火狐浏览器当状态变为不可见时，会在间隔是1s,2s,4s,8s,16s,32s...这样的顺序下去执行raf方法。


## 解决方案

### webWorkers: 还可以解决一个页面存在多个定时器时候间隔时间误差较大的问题。


```js
document.getElementById('btn').addEventListener('click', function() {
  var w = new Worker('demo_workers.js');
  w.onmessage = function(event){
    console.log(event.data);
  };
});
//浏览器切换事件
document.addEventListener('visibilitychange', function() { 
  if(document.hidden) {
    console.log('页面不可见');
  }
});
```

```js
// demo_workers.js
setInterval(function() {
  const myDate = new Date();
  const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
  postMessage(currentDate);
}, 500);
```