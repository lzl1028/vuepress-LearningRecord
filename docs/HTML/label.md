# 常用标签

## 1. a标签
 * 链接一个页面,点击则会跳转这个链接页面
 * 使用锚点滚动到设定的位置
 * 只有拥有name属性的a标签才能锚点,还有一种方式是通过ID标识唯一元素，也可以跳转(不仅仅是a标签)

```html
<a href=""></a>
<!--a标签中的href控制点击的时候跳转到哪里如果没写表示刷新当前页面-->

<a href="#"></a>
<!--跳转到当前页面(回归到页面顶部)-->

<a href="javascript:void(0);"></a>
<!--死链接，不会跳转，一般用于js特效-->

<a href="#name">锚点到一个标签上所对应的ID名字，点击则跳到那个标签位置</a>

<a href="//baidu.com">跳转到百度</a>
<!--跳转到百度 需要注意的是 http 协议不能少-->
```

## 2. 文本章节类HTML标签

###  article / section

- 都是表示文档中的一个独立区域（独立单元），其中还可以从结构上拆分成 header / footer 等部分。

- article比section要大一级：

    1.  article 中可以包含 section ，举个例子：一篇博客文章的下方或侧方一般会有“相关文章”的列表，那么，这一整块HTML就可以用 article 给包起来，而“相关文章”的那一小块HTML则可以用section来表示；再举个例子，比如说文章的“版权信息”，也可以用section来表示。
    2. article 中可包含 article ，比如说：一篇文章以及这篇文章的用户评论，整块HTML可以用 article 来包起来，而用户评论从逻辑分析起来也是从属于这篇文章的，因此也可以用 article 包起来并归到文章的 article 之下。
    3. section 之下不能再放 section 了，这从侧面表示这是最小一级的独立单元标签。
    
    4.  article 一般用于“详细内容”，因此一般一个页面只含有一个顶级的 article 。而相反， section 的用途更广泛一些，除却“详细内容”外都可以用 section 来进行包裹，比如说：网站首页上，可以利用 section 来展示不同分类/栏目的文章列表。

### pre: 预定义格式文本

- HTML pre 元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。

```html
<pre>
    < Hello World >                          我      就是   想
      ---------------------------                    乱    七   
            \   ^__^                            八       遭
              \  (oo)\_______
                (__)\       )\/\        的                     定位  写
                    ||----w |
                    ||     ||                      出来 ~
</pre>
```

### figure 与 figcaption

- HTML figure 元素代表一段独立的内容, 经常与说明（caption）figcaption配合使用, 并且作为一个独立的引用单元。当它属于主内容流（main flow）时，它的位置独立于主体。这个标签经常是在主文中引用的图片，插图，表格，代码段等等.

```html
<figure>
    <img style="width: 300px" src="https://github.com/quhongqiang/quhongqiang.github.io/blob/master/img/_posts/17.png?raw=true"
         alt="Elephant at sunset">
    <figcaption>这是的我微信公众号，快来扫码认识我吧~</figcaption>
</figure>
```

### em 标签 与 strong 标签

- HTML 着重元素 (em) 标记出需要用户着重阅读的内容， em 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读,一般显示为 " 倾斜字体 "。

- Strong 元素 (strong)表示文本十分重要，一般用粗体显示。

### 定义水平线：hr

## 3. 对话框

### dialog(只有Chrome和Safari支持)

- 基础用法：open属性控制dialog是否显示

```html
<dialog open>我是一个对话框</dialog>
```

- 简单用法：用JS来控制元素的显示跟隐藏。

    1. show: 显示dialog元素（跟open属性控制一样）

    2. showModal: 显示dialog元素，并且全屏居中，并带有黑色透明遮罩
    
    3. close: 隐藏dialog元素

```html
<dialog>
  <p>我是一个对话框</p>
  <button onclick="hideDialog()">隐藏对话框</button>
</dialog>

<button onclick="showDialog()">显示对话框</button>

<script>
  let dialog = document.querySelector("dialog");
  
  // 显示对话框
  function showDialog() {
    dialog.show();
  }
  
  // 隐藏对话框
  function hideDialog() {
    dialog.close();
  }
</script>
```

- 修改背景色: 直接覆盖掉样式
```css
/* ::backdrop伪元素（透明遮罩） */
dialog::backdrop {
  background: linear-gradient(45deg, black, transparent);
}
```





