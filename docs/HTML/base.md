# 基础标签

## 0. DOCTYPE
DOCTYPE(Document Type)该声明处于dw文档中最前面的位置，处于html标签之前，此标签告知浏览器文档使用哪种HTML或者 XHTML规范。（必须存在，否则页面无法在浏览器中正确显示）。

- DTD(Document Type Definition)声明以<!DOCTYPE>开始，不区分大小写，前面没有任何内容，如果有其他内容(空格除外)会使浏览器在IE下开启怪异模式(quirks mode)渲染网页。
- 公共DTD，名称格式为注册//组织//类型 标签//语言
    - 注册：指组织是否由国际标准化组织(ISO)注册，+表示是，-表示不是。
    - 组织：即组织名称，如：W3C。
    - 类型：一般是 DTD。
    - 标签：是指定公开文本描述，即对所引用的公开文本的唯一描述性名称，后面可附带版本号。
    - 语言：是DTD语言的ISO 639语言标识符，如：EN表示英文，ZH表示中文。
- XHTML 1.0 可声明三种DTD 类型。分别表示严格版本，过渡版本，以及基于框架的HTML文档。

```html
<!--HTML 4.01 strict-->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!--HTML 4.01 Transitional-->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!--HTML 4.01 Frameset-->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

```html
<!--HTML5文档类型-->

<!DOCTYPE html><!-- 使用 HTML5 doctype，不区分大小写 -->
```

## 1. html标签:

### 1.1 head标签：
- meta标签：声明文档使用的字符编码 。标签的属性定义了与文档相关联的名称/值对。

属性 |	值 |	描述
--|---|---
http-equiv 	| content-type<br>expires<br>refresh<br>set-cookie|把 content 属性关联到 HTTP 头部。
name |	author<br>description<br>keywords<br>generator<br>revised<br>others | 把 content 属性关联到一个名称。
scheme 	| some_text |	定义用于翻译 content 属性值的格式。

- title：title是必要的，但是如果没有加，浏览器也会自动帮你加上。

```HTML
<head>
    <title>web</title>
</head>
```

- link
- style


- Viewport

    - 这个就很常见了，viewport一般是做移动端适配，将页面放在一个虚拟的窗口中-viewport中
    - 如果网页没有用viewport就会出现我们在手机浏览器打开时很小，而且还可以移动缩放，low爆了
    - viewport就是让网页开发者通过其大小,动态的设置其网页内容中控件元素的大小,从而使得在浏览器上实现和web网页中相同的效果(比例缩小)。用来更好支持响应式网站。


```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```


1. width:控制viewport的大小，一般情况下指定为device-width(单位为缩放为100%的CSS像素),也可以指定一个固定的值例如600.

2. height:和width相应,指定高度。

3. initial-scal:初始缩放比例,页面第一次load的时候的缩放比例。

4. maximum-scale:允许用户缩放到的最大比例。

5. minimum-scale:允许用户缩放到的最小比例。

6. user-scalable:用户是否可以手动缩放。


- Favicon

    - 这个是网页标题左边的小图标，指定他的路径，如果没有指定，浏览器会在根目录下寻找


```html
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
```
- css

    - 通过link标签链入样式文件


```html
<link rel="stylesheet" href="css/test.css">
```

- javascript(重点）

    - 通过script标签链入脚本文件


```html
<script src="js/test.js"></script>
```




## 2. 盒模型

元素都是按照盒模型的规则布局在页面中的。盒模型由 <font color=FF0000>margin + border + padding + content</font> 四个属性组成，分为两种：

- W3C的标准盒模型: <font color=FF0000>width = content</font>，不包含 <font color=FF0000>border + padding</font>

- IE盒模型(怪异盒模型): <font color=FF0000>width = border + padding + content</font>

设置：

- box-sizing: content-box 是W3C盒模型

- box-sizing: border-box 是IE盒模型