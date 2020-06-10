# 图片上传压缩

我们通常在做图片上传的时候都会遇上这样的情况，一是后端接口限制上传图片的大小，或者是即使后端没有限制大小，因为图片太大在前端渲染时太慢，造成页面加载体验较差。因此我们很有必要对上传的图片进行压缩。

本文主要包括以下流程：

- 用户通过 `input` 框选择图片
- 使用 `FileReader` 进行图片预览
- 将图片绘制到 `canvas` 画布上
- 使用 `canvas` 画布的能力进行图片压缩
- 将压缩后的 `Base64(DataURL)` 格式的数据转换成 `Blob` 对象进行上传

### Input 标签来获取图片

通过设置 `input` 标签的 `type` 属性为 `file`，来让用户可以选择文件，设置 `accept` 限制选择的文件类型，绑定 `onchange` 事件，来获取确认选择后的文件

```js
<input type="file" accept="image/*" onchange="loadFile(event)"
```

### FileReader

`FileReader` 是什么，我们先来看看官方文档的介绍

> FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

`FileReader` 常用的两个方法如下：

- `FileReader.onload`:处理 `load` 事件。即该钩子在读取操作完成时触发，通过该钩子函数可以完成例如读取完图片后进行预览的操作，或读取完图片后对图片内容进行二次处理等操作。
- `FileReader.readAsDataURL`：读取方法，并且读取完成后，`result` 属性将返回 `Data URL` 格式（Base64 编码）的字符串，代表图片内容。

在图片上传中，我们可以通过 `readAsDataURL()` 方法进行了文件的读取，并且通过 `result` 属性拿到了图片的 `Base64(DataURL)` 格式的数据，然后通过该数据实现了图片预览的功能

```html
<div class="container">
  <input type="file" accept="image/*" onchange="loadFile(event)" />
</div>
<script>
  const loadFile = function (event) {
    let file =  event.target.files[0]
    const reader = new FileReader()
    reader.onload = function () {
      console.log(reader.result)
      ...
    }
    reader.readAsDataURL(file)
  }
</script>
```

### canvas 压缩图片

这是图片上传压缩的核心所在，我们先使用 `CanvasRenderingContext2D.drawImage()` 方法将上传的图片文件在画布上绘制出来，再使用 `Canvas.toDataURL()` 将画布上的图片信息转换成 `base64(DataURL)` 格式的数据。

`drawImage()` 方法在画布上绘制图像、画布或视频。`drawImage()` 方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。参数如下

- img 规定要使用的图像、画布或视频。
- sx 可选。开始剪切的 x 坐标位置。
- sy 可选。开始剪切的 y 坐标位置。
- swidth 可选。被剪切图像的宽度。
- sheight 可选。被剪切图像的高度。
- x 在画布上放置图像的 x 坐标位置。
- y 在画布上放置图像的 y 坐标位置。
- width 可选。要使用的图像的宽度。（伸展或缩小图像）
- height 可选。要使用的图像的高度。（伸展或缩小图像）

```js
var cas = document.querySelector('canvas')
var ctx = cas.getContext('2d')
// 先创建图片对象
var img = new Image()
img.src = './images/1.jpg'

// 图片加载完之后
img.onload = function () {
  ctx.drawImage(img, 206, 111, 32, 38, 100, 100, 32, 38)
}
```

#### Canvas.toDataURl()

`Canvas.toDataURl()` 方法可以将 `canvas` 画布上的信息转换为 `base64(DataURL)` 格式的图像信息，纯字符的图片表示形式。该方法接收 2 个参数：

- `mimeType`(可选): 表示需要转换的图像的 `mimeType` 类型。默认值是 `image/png`，还可以是 `image/jpeg`， `image/webp` 等。
- `quailty`(可选)：quality 表示转换的图片质量。范围是 0 到 1。图片的 `mimeType` 需要是 `image/jpeg` 或者 `image/webp`，其他 `mimeType` 值无效。默认压缩质量是 0.92。

```js
var canvas = document.createElement('canvas')
canvas.toDataURL("image/jpeg" 0.8)
```

到这里，我们先来上 canvas 压缩图片的代码

```js
function compress(base64, quality, mimeType) {
  let canvas = document.createElement('canvas')
  let img = document.createElement('img')
  img.crossOrigin = 'anonymous'
  return new Promise((resolve, reject) => {
    img.src = base64
    img.onload = () => {
      let targetWidth, targetHeight
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH
        targetHeight = (img.height * MAX_WIDTH) / img.width
      } else {
        targetWidth = img.width
        targetHeight = img.height
      }
      canvas.width = targetWidth
      canvas.height = targetHeight
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, targetWidth, targetHeight) // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      let imageData = canvas.toDataURL(mimeType, quality / 100)
      resolve(imageData)
    }
  })
}
```

### 将 base64 转化为文件

- 通过 `window.atob` 将 `base-64` 字符串解码为 `binaryString`（二进制文本）；
- 将 `binaryString` 构造为 `multipart/form-data` 格式；
- 用 `Uint8Array` 将 `multipart` 格式的二进制文本转换为 `ArrayBuffer`。

```js
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(',')[1])
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeType })
}
```

### 将图片上传到服务端

- 创建一个 `FormData`，把 `blob` append 到 `FormData` 里面
- 请求服务端接口，提交图片

```js
function uploadFile(url, blob) {
  let formData = new FormData()
  let request = new XMLHttpRequest()
  formData.append('image', blob)
  request.open('POST', url, true)
  request.send(formData)
}
```

ps：在实际开发中，我们要不要把图片转化为 `FormData` 形式上传到服务端，这就看具体的业务需要了。我们可以上图片上传到腾讯云，直接返回一个`'https.xxx.jgp'`的图片 url 用于上传。
