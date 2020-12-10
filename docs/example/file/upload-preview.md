# 图片上传及预览

很多时候我们都会有图片上传的功能需求，如果我们先将图片上传到服务器，然后在将返回结果显示在前端，这样的操作性能开销太大，如果图片一多，简直要哭，而且万一还碰到了上传错误要删除的，那简直无法想象了。所以我们需要先将图片在前端展示后，然后由用户确认没有问题了，再统一上传，这样才是比较理想的。

## input

### type=file

相信大家都知道，要在前端实现图片的上传，我们离不开的是一个 <input> type=file 的 input 元素，该元素可以允许用户选择一个或者多个文件。

```html
    <input type="file">
```

此时，我们点击 input 元素，就可以浏览本地文件并选择上传。但是，此时我们只能选择一个文件，而不能多个。这时就需要 input 标签的另一个属性 multiple

### multiple

**multipla** 属性允许用户选择多个文件，他是一个不需要值的属性，也就是说，只要你的 input 标签上出现了这个属性，那么不论其值是什么，他都会支持多文件选择。通常来说我们使用 multiple 只会使用其属性名，而不会给他加值

```html
    <input type='file' multiple>
```

### accept

如果你尝试了以上标签及属性，你会发现你的不但能选择 image 文件，还能选择其他各种各样的文件。但是一般来说对我们有需要的只是 image 文件，至于其他什么的，爱咋咋地吧，只要不出来妨碍我就可以了。所以这时候我们需要 accept 的属性来进行限制。accept 属性接受逗号分隔的 MIME 类型字符串：

```js
1. accept='image/png' 或者 accept='.png' --只接受 .png 格式的图片
2. accept='iamge/png,image/jpeg' 或者 accept='.png, .jpg .jpeg' 接受 .png .jpeg .jpg 格式的图片
3. accept='image/*' 接受所有类型的 image 


    <input type='file' multiple accetp='image/*'>
```

> 注: 'image/*' 在部分浏览器中（Chrome和Safari等Webkit浏览器）响应比较缓慢，可以用以下方法代替

```js
    <<input type="file" multiple accept='image/png, image/jpeg, image/jpg, image/svg, image/gif'> 
```

### 样式

一般来说我们都会将 input 设置为 display:none, 然后通过 label 来设置其显示样式

## FileList 对象

选中文件通过 HTMLInputElement.files 属性返回了一个 FileList 对象,这个对象是一个包含了许多 file 文件的列表。每个 file 对象包含了一下信息：

1. name：文件名

2. lastModified：文件最后一次修改时间（时间戳形式）

3. lastModifiedDate：文件最后一次修改时间（UNIX timestamp形式）

4. size： 文件大小（byte 为单位）

5. type：文件 MIME 类型

我们可以通过对 input 标签监听 change 事件：

```js
    //  js

    document.getElementById('inputFile').addEventListener('change', changeHandler, false);

    function changeHandler(e) {
        var files = e.target.files;
        console.log(files) // 这里我们能获取到所选择的文件信息，需要注意的一点是 files 是个类数组对象。
    } 
```

## 预览

### FileReader or 对象 URL

当我们获取到文件对象信息 files 了以后，我们要如何将他在页面上预览出来，这里提供了两种方法：FileReader 或者 对象 URL。

### 1. FileReader

FileReader 实现了一种异步的读取机制。他必须先通过 FileReader() 构造函数创建出一个 fileReader 实例。该实例实现了一下几个方法和事件（部分）：

1. readerAsDataURL(file): 读取文件并以数据 URI 形式保存在 result 属性中

2. load 事件：在文件加载成功后触发 load 事件

3. error 事件：在文件加载失败后触发 error 事件

4. progress 事件：在读取文件的过程中触发 progress 事件，该事件可以近似（间隔性触发，不是实时响应）监听文件上传进度。该方法有三个属性：lengthComputable（进度信息是否可用）, loaded（已经加载了多少）, total总共有多少。

- usage:

```js
    files.forEach(function(item) {
        var reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onprogress = function(e) {
            if (e.lengthComputable) {
                // 简单把进度信息打印到控制台吧
                console.log(e.loaded / e.total + '%') 
            }
        }
        reader.onload = function(e) {
            var image = new Image()
            image.src = e.target.result
            body.appendChild(image)
        }
        reader.onerror = function(e) {
            console.log('there is an error!')
        }
    })
```

### 2. 对象 URL

对象 URL 指的是引用保存在 File 或 Blob 中的数据 URL。使用对象 URL 的时候不用像 FIleReader 一样要先把数据读取到 JavaScript 中，他可以引用 内存中 URL 地址而使用。

创建对象 URL 方法: window.URL.createObjectURL()。兼容写法：

```js
    function creatObjectURL(file) {
        if (window.URL) {
            return window.URL.createObjectURL(file);
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectURL(file);
        } else {
            return null
        }
    }
```

- usage

```js
    files.forEach(function(item) {
        var url = createObjectURL(item)
        var image = new Image()
        image.src = url
        body.appendChild(image)
    })
```

### 区别

1. FileReader 是异步操作，而对象 URL 是同步操作

2. FileReader.readAsDataURL 返回的是一个包含更多字节的 base64 格式，createObejctURL 返回的是一个带 hash 的 URL。

3. 由于两者返回形式不同，FileReader.readerAsDataURL 会占用更多内存，但是当你不再使用他的时候，他会自动释放内存，而 createObjectURL 则只有当你的页面关闭或者手动调用 revokeObejctURL 的时候才能释放内存。

4. 从兼容性来说： createObjectURL 和 FileReader.readerAsDataURL 都兼容 IE10+ 和现代所有主流浏览器

5. createObjectURL 相对 FileReader.readerAsDataURL，效率较高。但是如果图片较多，则最好手动清除内存，可以把 URL 当做参数直接传给 window.URL.revokeObjectURL()。兼容写法：

```js
 function revokeObjectURL(url) {
     if (widnow.URL) {
         return window.URL.revokeObjectURL(url)
     } else {
         return window.webkitURL.revokeObjectURL(url)
     }
 }
```

## 简单实现

```js
    // css

    input{
        display:none;
    }
    label{
        // 关于label样式
    }

    // html

    <input type='file' multiple accept='image/png, image/jpeg, image/jpg, image/svg, image/gif' id='inputFile'>
    <label for="inputFile">上传图片</label>

    // js 

    var inputFile = document.getElementById('inputFile')
    var body = document.body || document.getElementsByTagName('body')[0]

    inputFile.addEventListener('change', changeHandler, false)

    function changeHandler(e) {
        var files = Array.from(e.target.files)
        files.forEach(function(item) {
            var image = new Image()
            image.src = createObjectURL(item)
            body.appendChild(image)
            image.onload = function() {
                revokeObjectURL(this.src)
            }
        })
    }

    function createObjectURL(file) {
        if (window.URL) {
            return window.URL.createObjectURL(file)
        } else {
            return window.webkitURL.createObjectURL(file)
        }
    }

    function revokeObjectURL(file) {
        if (window.URL) {
            return window.URL.revokeObjectURL(file)
        } else {
            return window.webkitURL.revokeObjectURL(file)
        }
    }

     

        } else {
            前端学习培训、视频教程、学习路线，添加威信  kaixin666haoyun  与我联系
        }
```





