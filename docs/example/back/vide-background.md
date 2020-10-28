# 移动端背景视频实现

用 gif 来实现背景视频也是一种选择，一张图片就能解决的事，为什么还要研究背景视频呢？

## 为什么不使用 GIF

源视频分辨率为 1920×1080，25fps 时长为 6s，体积是 1.4M，转成同分辨率同帧率的 gif 图片，体积居然要 26M !!

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/080d780924d843d2b372ae4e56f33d32~tplv-k3u1fbpfcp-zoom-1.image)

而且由于 gif 格式只支持 256 色，mp4 转 gif 画面的分辨率虽然不变但画质有很大损失，上图能看到明显的像素块效果。

所以日常视频转 gif 时都会进行一定的压缩处理，页首 gif 经过 640×360 12fps 的压缩处理过的体积是 2.3M，还是大于视频的体积。

```js
# mp4 转 gif
ffmpeg -y -i demo.mp4 -s 640x360 -r 12 demo_mini.gif
```

相较于视频 gif 有两个比较明显的缺点：

    - 同等视觉效果的 gif 图片体积远大于视频文件
    
    - gif 受限于 256色无法保证视觉效果的细节

## video 元素的背景实现

我们先来看看使用视频来实现背景的关键要素：

1. 自动播放

2. 去除掉 video 的播放控件

3. video 元素需要放置于底层

```js
<section>
    <video
        loop
        autoplay="autoplay"
        preload="auto"
    >
        <source src="./demo.mp4" type="video/mp4">
    </video>
    <div>mask</div>
</section>
```

video 元素上面绝对定位改了一个遮罩层，loop 循环播放，且不配置 controls 是不会展示控制组件的，嗯，看起来正常，不过视频并没有自动播放，机智的你又查查资料，发现视频自动播放是有限制的，只有无音轨的视频或者静音 video 元素才能播放，于是乎加上了 muted 你写下了：

```js
<section>
    <video
        loop
        muted
        autoplay="autoplay"
        preload="auto"
    >
        <source src="./demo.mp4" type="video/mp4" >
    </video>
    <div>mask</div>
</section>
```

视频自动播放了，电脑上看起来没什么问题，要不换手机试试？

打开 charles 挂上代理，用果子的 Safari 打开，看起来没啥问题，换微信试试，然后你惊讶的发现：

- 视频元素的层级错乱

- 视频无法自动播放了

### 视频元素的层级错乱解决方案

为 video 设置内联播放标识 playsinline，然后为了兼容需要加上各种前缀：

- playsinline="true"

- webkit-playsinline="true"

- mtt-playsinline="true"

指定微信端的页面播放器类型：

- x5-video-player-type="h5-page"

### 视频无法自动播放

微信端可以监听页面的 WeixinJSBridgeReady 来触发视频播放

```js
<section>
    <video
        muted
        loop
        class="player"
        autoplay="autoplay"
        preload="auto"
        playsinline="true"
        webkit-playsinline="true"
        mtt-playsinline="true"
        x5-video-player-type="h5-page"
    >
        <source src="./demo.mp4" type="video/mp4">
    </video>
    <div class="mask">
        遮罩层
    </div>
</section>
<script>
    window.onload = function () {
        const player = document.querySelector('.player');
        // 自动播放
        document.addEventListener('WeixinJSBridgeReady', player.play());
    }
</script>
```

微信试试，稳得很。保险起见试试安卓端的各种浏览器吧。

果不其然，video 还是那个 video，浏览器已经不是那个 chrome 了。

几乎每个国产品牌的安卓机自带浏览器都有对 video 元素都有些定制化处理，常见且不限于：

- 静音视频无法自动播放

- 无法隐藏控制条（即使未设置 controls）

- 视频为顶级元素无法被覆盖

- 视频默认为弹层窗口播放

- 更有甚者给你加广告

- ...

video 元素在安卓端特性并不统一，目前并没有找到很好解决方案。

既然 video 不行，换 canvas 不就好了，video draw canvas 不是分分钟的事。

## video draw canvas ？

同志们，要把 video 绘制到 canvas 得先播放呀！
即使是有些可以自动播放的视频的浏览器，将 video 绘制 canvas 时，video 元素必须是可见的，所以隐藏的 video 元素也是做不到的。
既然这样，我们可以将视频截取一张张的图片，然后打个压缩文件，通过 canvas 绘制出来？
等等这不就是视频文件吗？还犯得着去截图播放吗？所以我们需要的是将视频文件解码成可播放的图片帧！

### video decode

视频解码的方案简单来说就是将视频文件解码成一一帧帧的图片，在 canvas 上按一定速率绘制出来。

前人栽树，后人乘凉，github 搜罗下找到几个可用的库

- WasmVideoPlayer

- WXInlinePlayer

- Broadway

- jsmpeg

- WasmVideoPlayer 原型演示，ffmepg + wasm 实现，移动端性能较差

- WXInlinePlayer 依赖于 flv， 且体积较大

- Broadway 作者实现了一套安卓端的 h264 解码器（c 语言实现 + wasm），支持特定编码的 mp4 格式的视频，且支持不完善有黑屏情况，且无法按照视频帧率进行播放（未对视频进行细颗粒度播放）

- jsmpeg 作者手撸了一个 mpeg-ts 的解码器（支持 JavaScript 与 wasm 版本），支持 ts 格式（mpeg1 编码）的视频，支持较为稳定，可支持细颗粒度播放

因为 MP4 格式的视频较为常见，如果能直接播放 MP4 是最理想的，但 WasmVideoPlayer 和 Broadway 的实现都不太理想，一个是移动端性能差，一个解码支持不完善。

上面的工具都未提供 npm 包支持，如果想在生产使用还需要自己做一下二次封装。

最终的选用的是 jsmpeg，jsmpeg 支持 ts 格式的视频有个优势。

:::tip
ts 是日本高清摄像机拍摄下进行的封装格式，全称为 MPEG2-TS 。ts 即 "Transport Stream" 的缩写。MPEG2-TS 格式的特点就是要求从视频流的任一片段开始都是可以独立解码的。
:::

[silent-film-player](https://github.com/kinglisky/silent-film-player) 是我对 jsmpeg 做的简单二次封装，考虑是做背景视频播放的，所以去掉音频解码相关的模块，新增了 Web Workers 的支持：

- 拆分模块支持 npm 包

- 移除声音模块

- 抽离核心的解析模块

- 新增 Web Workers 支持

使用：

```js
<template>
    <section>
        <canvas ref="canvas"></canvas>
        <div class="mask">
            遮罩层
        </div>
    </section>
</template>

<script>
import Player from 'silent-film-player';

export default {
    data() {
        return {
            url: 'https://xxx.ts',
        };
    },

    mounted() {
        const {
            url,
            $refs: { canvas },
        } = this;
        window.player = new Player(url, {
            canvas,
            loop: true,
            autoplay: true,
            disableWebAssembly: true,
            // 分片大小
            chunkSize: 1 * 1024 * 1024,
            videoBufferSize: 512 * 1024,
        });
    },
};
</script>
```

- [烟花](http://nlush.com/background-video/dist/index.html?source=fireworks&bg=0&canvas=1)

- [示例仓库](https://github.com/kinglisky/bloom/tree/master/background-video)

## 前景视频实现
- [例子](http://nlush.com/background-video/dist/index.html?source=water&bg=1&canvas=1)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e16f3e887634565bb993bd86b5e2349~tplv-k3u1fbpfcp-zoom-1.image)

是不是很神奇，结构大概如下，canvas 覆盖在一个图片元素之上，但视频的内容却透出了底部图片。

```js
<section class="container">
    <img
        class="view-bg"
        src="./demo.jpeg"
    />
    <canvas
        ref="canvas"
        class="view-canvas"
    >
    </canvas>
    <div class="view-mask">MASK</div>
</section>
```

具体实现为在 canvas 上附加上一个 css 属性

```css
mix-blend-mode: screen;
```
对的，只需要设置上这个属性，视频中的黑色部分即可透出下层图片。

## 缺点：

- 视频解码比较耗性能，注意控制播放的视频个数，可以对可视区域内视频元素做播放控制，不可见的视频不播放

- wasm 解码在移动端支持和性能较差（特别是安卓端），不太建议使用

- 对支持的标准 video 行为的浏览器，如桌面端浏览器可以直接使用 video 实现背景视频

- iOS 虽然大部分浏览器对 video 元素支持不错，但有些特例如：夸克、UC 极速版、ALOOK 视频默认是弹层播放的，而且 ALOOK 浏览器的 userAgent 居然是和 Safari 一样的，所以你根本没法区分它俩

- 微信页面的 WeixinJSBridgeReady 无法触发异步加载的视频

- MP4 转 TS 会造成视频质量下降，建议提高转码的比率

