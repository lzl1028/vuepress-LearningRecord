# 前端H5 Video

## 1.原生H5 video标签

```js
<video id="mse" autoplay=true playsinline controls="controls">
   <source src="实机视频地址" type="video/mp4">
   你的浏览器不支持Video标签
</video>
```

## 2.第三方插件video.js

```js
_this.player = videojs(
    _this.videoNode,
    {
        autoplay: true,
        bigPlayButton : false,
        controls: true,
        preload: 'auto',
        poster: poster,
        notSupportedMessage: '视频加载失败，请刷新再试试',
        sources: [
            {
                src: videoUrl,
                type: 'video/mp4',
            },
        ],
    },
    function onPlayerReady() {
        this.play();
    }
)

<video
  ref={(node) => (this.videoNode = node)}
  className="video-js vjs-big-play-centered"
  preload="auto"
  autoplay="autoplay"
  playsinline='true'
  webkit-playsinline='true'
  x5-video-player-type='h5'
  x5-video-player-fullscreen='false'
  x5-video-orientation='portraint'
></video>
```

## 3.业务开发中的场景

### 3.1 自动播放实现

#### 3.1.1 非微信端

目前主要方法是在videojs 的onPlayerReady回调中调用play方法，以及特殊环境下需要用户手动触发

#### 3.1.2 微信端

微信端（特别是ios）为了能够实现自动播放功能，目前主要通过增加微信WeixinJSBridgeReady事件回调的方式来触发

```js
document.addEventListener("WeixinJSBridgeReady", function () {
    this.player.play();
}, false);
```

### 3.2 如何实现视频本地预览

视频本地预览的功能主要利用 URL.createObjectURL() 方法来实现。URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的 URL 对象表示指定的 File 对象或 Blob 对象。

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>视频本地预览示例</title>
  </head>
  <body>
    <input type="file" accept="video/*" onchange="loadFile(event)" />
    <video
      id="previewContainer"
      controls
      width="480"
      height="270"
      style="display: none;"
    ></video>

    <script>
      const loadFile = function (event) {
        const reader = new FileReader();
        reader.onload = function () {
          const output = document.querySelector("#previewContainer");
          output.style.display = "block";
          output.src = URL.createObjectURL(new Blob([reader.result]));
        };
        reader.readAsArrayBuffer(event.target.files[0]);
      };
    </script>
  </body>
</html>
```

### 3.3 如何实现播放器截图

播放器截图功能主要利用 CanvasRenderingContext2D.drawImage() API 来实现。Canvas 2D API 中的 CanvasRenderingContext2D.drawImage()  方法提供了多种方式在 Canvas 上绘制图像。

drawImage API 的语法如下：

```js
void ctx.drawImage(image, dx, dy); 
void ctx.drawImage(image, dx, dy, dWidth, dHeight); 
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>播放器截图示例</title>
  </head>
  <body>
    <video id="video" controls="controls" width="460" height="270" crossorigin="anonymous">
      <!-- 请替换为实际视频地址 -->
      <source src="请替换为实际视频地址" />
    </video>
    <button onclick="captureVideo()">截图</button>
    <script>
      let video = document.querySelector("#video");
      let canvas = document.createElement("canvas");
      let img = document.createElement("img");
      img.crossOrigin = "";
      let ctx = canvas.getContext("2d");

      function captureVideo() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        img.src = canvas.toDataURL();
        document.body.append(img);
      }
    </script>
  </body>
</html>
```

### 3.4 如何实现 Canvas 播放视频

使用 Canvas 播放视频主要是利用 ctx.drawImage(video, x, y, width, height) 来对视频当前帧的图像进行绘制，其中 video 参数就是页面中的 video 对象。所以如果我们按照特定的频率不断获取 video 当前画面，并渲染到 Canvas 画布上，就可以实现使用 Canvas 播放视频的功能。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>使用 Canvas 播放视频</title>
  </head>
  <body>
    <video id="video" controls="controls" style="display: none;">
      <!-- 请替换为实际视频地址 -->
      <source src="请替换为实际视频地址" />
    </video>
    <canvas
      id="myCanvas"
      width="460"
      height="270"
      style="border: 1px solid blue;"
    ></canvas>
    <div>
      <button id="playBtn">播放</button>
      <button id="pauseBtn">暂停</button>
    </div>
    <script>
      const video = document.querySelector("#video");
      const canvas = document.querySelector("#myCanvas");
      const playBtn = document.querySelector("#playBtn");
      const pauseBtn = document.querySelector("#pauseBtn");
      const context = canvas.getContext("2d");
      let timerId = null;

      function draw() {
        if (video.paused || video.ended) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        timerId = setTimeout(draw, 0);
      }

      playBtn.addEventListener("click", () => {
        if (!video.paused) return;
        video.play();
        draw();
      });

      pauseBtn.addEventListener("click", () => {
        if (video.paused) return;
        video.pause();
        clearTimeout(timerId);
      });
    </script>
  </body>
</html>
```

