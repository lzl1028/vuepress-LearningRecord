# Js防抖和节流
## 1. 目的
- 节流和防抖是为了限制函数触发频率而产生的，主要运用了函数的闭包。

- 比如：某个按钮频繁点击，导致不停的下发请求，前端就可以使用防抖和节流解决。


## 2. 防抖
- 固定时间内函数只执行一次。

- 使用高阶函数，返回一个被定时器包裹的新函数，此函数在指定时间内若触发多次会导致上一次的函数不执行。

```js
//使用方式：
//debounce(延迟时间，你的函数，上下文)
//使用返回的函数即可（不再使用原函数）
//缺点：大多情况，这种方式并不适用，因为这会导致函数被延迟执行
var debounce = function(delay, fn, ctx) {
    if (ctx === undefined) {
        ctx = this;
    }
    var timer;
    return function() {
        var argu = this.arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(ctx, argu);
        }, delay);
    }
}
```

## 3. 节流
- 同样，固定时间内函数只执行一次，但不会导致函数延迟执行。
- 利用系统时间，计算函数2次触发的时间差，小于指定时间，则不执行第2次触发不执行。

```js
var throttle = function(t, fn, ctx) {
    if (ctx === undefined) {
        ctx = this;
    }
    var preT = 0;
    return function() {
        var currT = +new Date();
        if (currT - preT > t) {
            fn.apply(ctx, arguments);
            preT = currT;
        }
    };
};
```