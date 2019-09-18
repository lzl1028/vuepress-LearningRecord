# 表单办法总结

## 一、文本和文本框

### 1.将数据显示到桌面上：

- 用for循环遍历解析成功的JSON数据。

- 通过if判断过滤数据是span的还是input的。

- 将数据传给和数据名同名的ID元素。

```js
for (var key in json) {
   //过滤type为text的文本框
   if ($('#' + key).attr('type') == 'text') {
       $('#' + key).val(json[key]);
   }
   if($('#' + key).prop('tagName') == 'SPAN'){
       $('#' + key).text(json[key]);
   }
}
```
### 2.快速获取数据对象用于提交服务器
-  定义空model对象。

-  通过jQuery选择器获取目标元素的value。
-  将数据传入model中，对象元素的字段就是HTML元素的ID。

```js
var model = {};
$('input[type="text"]').each(function () {
   model[$(this).attr('id')]=$(this).val();
});
$('span').each(function () {
   model[$(this).attr('id')]=$(this).text();
});
console.log(model);
```
### 3.全部代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="jquery-2.2.3.js"></script>
</head>
<body>
    <div>
        <div>
            <label>姓名：<input type="text" id="name"></label>
            <label>性别：<input type="text" id="sex"></label>
            <label>年龄：<input type="text" id="age"></label>
            <label>时间：<input type="text" id="time"></label>
        </div>
        <div>
            <label>a：<span id="param01">1</span></label>
            <label>b：<span id="param02">2</span></label>
            <label>c：<span id="param03">3</span></label>
            <label>d：<span id="param04">4</span></label>
        </div>
    </div>
    <button onclick="showResult()">显示结果</button>
    <script>
        //多条input或者span的快速赋值
        //data是模拟服务器返回的JSON数据
        var data = '{"name":"张三","sex":"女","age":22,"time":"2016-5-10","param01":111,"param02":222,"param03":333,"param04":444}';
        //将数据显示到页面中
        var json = eval('(' + data + ')');
        for (var key in json) {
            if ($('#' + key).attr('type') == 'text') {
                $('#' + key).val(json[key]);
            }
            if($('#' + key).prop('tagName') == 'SPAN'){
                $('#' + key).text(json[key]);
            }
        }

        //获取文本和文本框的内容转为JSON对象
        function showResult() {
            var model = {};
            $('input[type="text"]').each(function () {
                model[$(this).attr('id')]=$(this).val();
            });
            $('span').each(function () {
                model[$(this).attr('id')]=$(this).text();
            });
            console.log(model);
        }
    </script>
</body>
</html>
```

## 二、Radio和Checkbox

### 1.显示数据：和之前的文本一样，用for循环遍历json数据，然后通过if过滤后显示到界面。不同之处是这边是通过name来显示和绑定数据的。 

```js
for(var key in json){
   if ($('input[name=' + key +  ']').attr('type') == 'radio') {
      showRadioValue(key, json[key]);
   }
   if ($('input[name=' + key +  ']').attr('type') == 'checkbox') {
     showCheckBoxValue(key, json[key]);
   }
}
```
### 2.获取数据model的方法

- 定义空model对象。
- 定义name避免重复添加。
- 遍历所有radio获取结果传给model
- 遍历所有checkbox获取结果传给model

```js
function showResult() {
    var model = {};
    var radioName = '';
    var checkboxName = '';
    $("input[type='radio']").each(function () {
        if($(this).attr('name') != radioName){
            radioName = $(this).attr('name');
            model[radioName] = getRadioValue(radioName);
        }
    });
    $("input[type='checkbox']").each(function () {
        if($(this).attr('name') != checkboxName){
            checkboxName = $(this).attr('name');
            model[checkboxName] = getCheckboxValue(checkboxName);
        }
    });
    console.log(model);
}
```
### 3.处理radio和checkbox的一些方法

```js
function showRadioValue(name, value) {
    $('input[name=' + name +  ']').each(function () {
        if(value == $(this).val()){
            $(this).attr('checked', 'true');
        }
    });
}

function getRadioValue(name) {
    var value = 0;
    var i = 0;
    $('input[name=' + name + ']' ).each(function () {
        if ($('input[name=' + name + ']').eq(i).is( ':checked')) {
            value = $('input[name=' + name + ']').eq(i).val();
            return;
        }
        i++;
    });
    return value;
}

function showCheckBoxValue (name, value) {
    var values = value.split(',' );
    var row = 1;
    $('input[name="' + name + '"]').each( function () {
        if (values[row] == 1) {
            $(this).attr("checked" , 'true');
        }
        row++;
    });
}

function getCheckboxValue (name) {
    var text = "" ;
    $('input[name="' + name + '"]').each( function () {
        var t = '' ;
        if ($(this ).is(':checked')) {
            t = "1";
        } else {
            t = "0";
        }
        text += "," + t;
    });
    return text;
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="jquery-2.2.3.js"></script>
</head>
<body>
    <div>
        <div>
            <label><input type="radio" name="param01" value="1">1</label>
            <label><input type="radio" name="param01" value="2">2</label>
            <label><input type="radio" name="param01" value="3">3</label>
        </div>
        <div>
            <label><input type="radio" name="param02" value="1">1</label>
            <label><input type="radio" name="param02" value="2">2</label>
            <label><input type="radio" name="param02" value="3">3</label>
        </div>
        <div>
            <label><input type="radio" name="param03" value="1">1</label>
            <label><input type="radio" name="param03" value="2">2</label>
            <label><input type="radio" name="param03" value="3">3</label>
        </div>
        <div>
            <label><input type="checkbox" name="param04">1</label>
            <label><input type="checkbox" name="param04">2</label>
            <label><input type="checkbox" name="param04">3</label>
            <label><input type="checkbox" name="param04">3</label>
        </div>
        <div>
            <label><input type="checkbox" name="param05">1</label>
            <label><input type="checkbox" name="param05">2</label>
            <label><input type="checkbox" name="param05">3</label>
            <label><input type="checkbox" name="param05">3</label>
        </div>
        <button onclick="showResult()">显示结果</button>
        <label id="result">result</label>
    </div>
    <script>
        //多条radio或者checkbox的快速赋值
        var data = '{"param01":"1","param02":"3","param03":"2","param04":",1,0,0,0","param05":",0,0,1,1"}';
        var json =eval( '(' + data + ')');
        for(var key in json){
            if ($('input[name=' + key +  ']').attr('type') == 'radio') {
                showRadioValue(key, json[key]);
            }
            if ($('input[name=' + key +  ']').attr('type') == 'checkbox') {
                showCheckBoxValue(key, json[key]);
            }
        }

        function showRadioValue(name, value) {
            $('input[name=' + name +  ']').each(function () {
                if(value == $(this).val()){
                    $(this).attr('checked', 'true');
                }
            });
        }

        function getRadioValue(name) {
            var value = 0;
            var i = 0;
            $('input[name=' + name + ']' ).each(function () {
                if ($('input[name=' + name + ']').eq(i).is( ':checked')) {
                    value = $('input[name=' + name + ']').eq(i).val();
                    return;
                }
                i++;
            });
            return value;
        }

        function showCheckBoxValue (name, value) {
            var values = value.split(',' );
            var row = 1;
            $('input[name="' + name + '"]').each( function () {
                if (values[row] == 1) {
                    $(this).attr("checked" , 'true');
                }
                row++;
            });
        }

        function getCheckboxValue (name) {
            var text = "" ;
            $('input[name="' + name + '"]').each( function () {
                var t = '' ;
                if ($(this ).is(':checked')) {
                    t = "1";
                } else {
                    t = "0";
                }
                text += "," + t;
            });
            return text;
        }

        function showResult() {
            var model = {};
            var radioName = '';
            var checkboxName = '';
            $("input[type='radio']").each(function () {
                if($(this).attr('name') != radioName){
                    radioName = $(this).attr('name');
                    model[radioName] = getRadioValue(radioName);
                }
            });
            $("input[type='checkbox']").each(function () {
                if($(this).attr('name') != checkboxName){
                    checkboxName = $(this).attr('name');
                    model[checkboxName] = getCheckboxValue(checkboxName);
                }
            });
            console.log(model);
        }
    </script>
</body>
</html>
```
### 4. jquery实现复选框的全选和全不选的操作

```js
// 1.8之前的jquery版本
$("tbody input").attr("checked",this.checked);
// 1.8之后的jquery版本
$("tbody input").prop("checked",this.checked);
```


