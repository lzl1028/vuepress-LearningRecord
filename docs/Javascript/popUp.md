# js弹出框、对话框、提示框、弹窗总结

## 1. 弹出一段提示信息

```js
alert("我是提示框！");
```

## 2. 弹出一个对话框，有确定和取消按钮

```js
// 利用对话框返回的值（true or false）
if(confirm("我是对话框！")){
    alert("点击了确定！");
}else {
    alert("点击了取消！");
}
```

## 3. 弹出一个输入框，输入一段文字，可提交

```js
// 参数一：提示的话；参数二：在对话框里的默认值；
var name = prompt("请输入您的名字：","");
```

## 4. 弹窗模板：

```html
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="Generator" content="EditPlus®">

    <meta name="Author" content="">

    <meta name="Keywords" content="">

    <meta name="Description" content="">

    <title>js弹出框、对话框、提示框、弹窗总结</title>

    <style>
        .overlay {

            display: none;

            position: absolute;

            top: 0;

            left: 0;

            width: 100%;

            height: 100%;

            background-color: black;

            z-index: 1001;

            -moz-opacity: 0.8;

            opacity: .80;

            filter: alpha(opacity=80);

        }

        .content {

            display: none;

            position: absolute;

            top: 25%;

            left: 25%;

            width: 200px;

            height: 120px;

            padding: 5px;

            border: 2px solid orange;

            background-color: white;

            z-index: 1002;

            overflow: auto;

        }
    </style>

</head>

<body>

    <p>样式可改
        <a href="javascript:void(0)" onclick="alter_show()">点击这里打开窗口</a>
    </p>

    <div id="light" class="content">

        <p>这里是提示信息</p>

        <a href="javascript:void(0)" onclick="alter_close()">

            确认</a>
    </div>

    <div id="face" class="overlay">

    </div>

    <script>

        function alter_show() {

            document.getElementById('light').style.display = 'block';

            document.getElementById('face').style.display = 'block'

        }

        function alter_close() {

            document.getElementById('light').style.display = 'none';

            document.getElementById('face').style.display = 'none'

        }

    </script>

</body>

</html>
```