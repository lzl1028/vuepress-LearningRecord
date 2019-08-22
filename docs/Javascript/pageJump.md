# JS跳转页面详解

## 1. window:

- 典型情况下，浏览器会为每一个打开的html创建对应的window对象，如果这个文档包含了多个框架()，则浏览器会为原始文档建立一个window对象，再为每个框架创建额外的window对象。可以再当前窗口中直接使用window的全部属性、方法和集合，即不需要在前面附加计算结果为当前window对象的表达式。虽然window可以省略，但是为了方便阅读以及避免一些漏洞，一般都使用这个关键字。


## 2. location：

- 该对象包含当前url信息，拥有多个属性。默认属性为 location.href,表示整个url，即如果设置location="https://www.baidu.com/", 则等同于location.href="https://www.baidu.com/"。


## 3. 打开页面的方式：

- 第一种：超链接

```js
<a href="https://www.baidu.com/"title="百度">Welcome</a>
/*
等效于
在当前窗口中打开窗口
*/

window.location.href = "https://ww.baidu.com/";
```

- 第二种：超链接

```js
<a href="https://www.baidu.com/" title="百度" target="_blank">Welcome</a>
/*
等效于在另外新建窗口中打开窗口
*/
window.open("https://www.baidu.com/");
```

- 第3种：window.navigate("https://www.baidu.com/");//只对ie浏览器有效，其他浏览器无效，不建议使用。

- 第4种：self.location='https://www.baidu.com/'; //self:当前窗口对象

- 第5种：top.location='https://www.baidu.com/'; //top父窗口对象 页面跳出框架

- 第4种和第5种联合使用，可以防止别人用iframe等框架引用你的页面。

```js
// 防止iframe等框架
if(top.location.href!=self.location.href){
    window.location.href = "http://www.baidu.com";
}
```

- 第6种：window.history.back(-1);//返回上一页，该方法不会刷新页面。
