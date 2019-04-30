# 前端页面适配

## 1.动态适配Rem

```html
<body>
    <script>
    (function() {
        var ua = window.navigator.userAgent;
        var docEl = document.documentElement;
        var html = document.querySelector('html');
        var isAndorid = /Android/i.test(ua);
        var dpr = window.devicePixelRatio || 1;
        var rem = docEl.clientWidth / 10;

        // 设置 rem 基准值
        html.style.fontSize = rem + 'px';

        // Nexus 5 上 rem 值不准，
        // 如：设置100px，getComputedStyle 中的值却为 85px，导致页面错乱
        // 这时需要检查设置的值和计算后的值是否一样，
        // 不一样的话重新设置正确的值
        var getCPTStyle = window.getComputedStyle;
        var fontSize = parseFloat(html.style.fontSize, 10);
        var computedFontSize = parseFloat(getCPTStyle(html)['font-size'], 10);
        if (getCPTStyle && Math.abs(fontSize - computedFontSize) >= 1) {
            html.style.fontSize = fontSize * (fontSize / computedFontSize) + 'px';
        }

        // 设置 data-dpr 属性，留作的 css hack 之用
        html.setAttribute('data-dpr', dpr);

        // 安卓平台额外加上标记类
        if (isAndorid) {
            html.setAttribute('data-platform', 'android');
        }
    })();
    </script>
    ...
</body>
```

```js
<!-- 设计图标准尺寸：750*1334 -->
<script>   
(function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=750){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
</script>

document.addEventListener('DOMContentLoaded', function(e) {
    document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
}, false);

```

- 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。


## 2.css设置

```css
//设计稿为640
@function rem($val) {
    @return $val/64 * 1rem;;
}

//设计稿为750
@function rem750($val) {
    @return $val/75 * 1rem;
}

//使用
.className {
    width: @rem(100);
}
```

```scss
// utils.scss
@function px2rem($px){
    $rem : 75px; // '750/10':分成10份
    @return ($px/$rem) + rem;
}

// foo.scss

.box1 {
 	width: px2rem(320px); // '(320/750) * 10 = 4.266rem'
 }

```

## 3. 像素比

- 设备花了200px的长宽来渲染CSS里面定义的100px的长宽，而设备pixels和样式pixels的比值，就是dpr，即Device Pixel Ratio

- 我们大家都知道Retina屏（视网膜屏），之所以看起来这么高清，就是因为苹果设备花两个像素来渲染一个像素的物体，那么看起来肯定更为精致。
所以，如果我们针对dpr=1的书写了rem2px(100px)，那么在dpr=2的设备看起来将会是被放大了2倍的元素。


```
var dpr = window.devicePixelRatio;
meta.setAttribute('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no'); 
// 帮助理解 如果dpr=2，说明写的100px渲染成了200px，所以需要缩小至1/2，即1/dpr
```

## 4. 总结：

```
<script>
  var dpr = window.devicePixelRatio;
  var meta = document.createElement('meta');

  // dpr
  meta.setAttribute('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no'); 
  document.getElementsByTagName('head')[0].appendChild(meta);

  // rem
  document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
  }, false);
</script>
```




