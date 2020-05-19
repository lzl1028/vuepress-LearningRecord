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



## 数据处理

当表单在视图所展示的数据并不是后端需要的数据，或者后端返回的数据不是前端所要展示的内容，这时就需要进行数据转换，下面介绍几种常见的场景

```js
// 基础数据
 data(){
    return {
      form:{
        name: '商品名称',
        id: '订单编号',
        nickName: '商品别名',
        num: '商品数量',
        price:'价格',
        tag: '0' // 1 表示特价  0 表示无特价
      },
    }
 },
```

### 1.1 场景1 ：过滤我不要的数据

> 场景：当前端form中的数据存在冗余的字段，也就是说后端并不需要这些字段，我们可以通过过滤把不必要的字段筛选掉

```js
  const noRequired = ['tag', 'nickName']; //不需要的字段
    const formData = Object.keys(this.form)
      .filter(each => !noRequired.includes(each))
      .reduce((acc, key) => (acc[key] = this.form[key], acc), {});
```

### 1.2 场景2：只提取我要的数据

> 场景：后端不需要表单数据那么多数据，只需要一部分时可以用

```js
const formData= JSON.parse(
      JSON.stringify(this.form,["nickName","price"])
);
```

### 1.3 场景3 ：覆盖数据

> 场景：当前表单有部分字段需要替换或覆盖新的数据时可用

```js
Object.assign(this.form, {
  tag: '商品1' 
}
```

### 1.4 场景4 ：字段映射

> 当前表单字段需要映射为其他字段名称时可用，如下对应的name的key值换为Name

单个字段映射情况

```js
const formData = JSON.parse(
      JSON.stringify(this.form).replace(
        /name/g,
        'Name')
);
```

多字段映射情况

```js
const mapObj = {
      name: "Name",
      nickName: "NickName",
      tag: "Tag"
    };

const formData = JSON.parse(
      JSON.stringify(this.form).replace(
        /name|nickName|tag/gi,
        matched => mapObj[matched])
   );
```

:::warn
ps: 如果key和value都存在一样的内容，会把value里的内容也替换掉
:::

### 1.5 场景5 ： 数据映射

> 当字段存在0，1等状态数，需要转换成为相对应的表示时可用，如下对应的tag字段，0对应特价，1对应无特价，进行映射转换

```js
const formData = JSON.parse(JSON.stringify(this.form,(key,value)=>{
      if(key == 'tag'){
        return ['特价','无特价'][value];
      }
      return value;
}));
```

### 1.6 场景6： 数据合并

> 数据合并，将表单数据字段合并，注意的是，如果字段相同，会覆盖前面表单数据字段的数值

```js
 const query = { tenaId: '订单编号', id:'查询ID'}
   const formData = {
     ...this.form,
     query
   }
```

## 表单校验

> 当表单数据填写完成，需要进一步做表单提交传送后端服务器，但是前端需要做数据的进一步确实是否符合规则，比如是否为必填项、是否为手机号码格式

### 2.1 简单版的单字段检查

```js
data() {
    return {
       schema:{
          phone: {
            required:true
          },
       }
    };
 },
 methods: {
    // 判断输入的值
     validate(schema, values) {
       for(field in schema) {
          if(schema[field].required) {
            if(!values[field]) {
              return false;
            }
          }
        }
       return true;
    },
 }

console.log(this.validate(schema, {phone:'159195**34'}));
```

### 简单版的多字段检查

```js
data() {
    return {
       phoneForm: {
          phoneNumber: '',
          verificationCode: '',
          tips:''
       },
       schema:{
          phoneNumber: [{required: true, error: '手机不能为空'}, {
            regex: /^1[3|4|5|6|7|8][0-9]{9}$/,
            error: '手机格式不对',
          }],
          verificationCode: [{required: true, error: '验证码不能为空'}],
       }
    };
 },
 methods: {
    // 判断输入的值
     validate(schema, values) {
      const valArr = schema;
      for (const field in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, field)) {
          for (const key of schema[field]) {
            if (key.required) {
              if (!valArr[field]) {
                valArr.tips = key.error;
                return false;
              }
            } else if (key.regex) {
              if (!new RegExp(key.regex).test(valArr[field])) {
                valArr.tips = key.error;
                return false;
              }
            }
          }
        }
      }
      return true;
    },
 }

console.log(this.validate(this.schema, this.phoneForm);
```