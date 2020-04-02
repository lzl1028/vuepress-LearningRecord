[[toc]]

# VuePress

- [VuePress](https://vuepress.vuejs.org/zh/)

- [VuePress中文网](http://caibaojian.com/vuepress/).

- [My-vuepress](https://scorpio-li.github.io/vuepress-document/)

## 安装

### 1. 全局安装(推荐)
```js
$ npm install -g vuepress
```

### 2. 本地安装

- 区别于全局安装，本地安装会把npm包安装在本项目上，生成一个叫node_modules目录，可以通过如下命令进行本地安装（需同时安装vuepress和webpack-dev-middleware）

```js
$ npm install vuepress webpack-dev-middleware --save-dev
```

## 基本配置

ps: 基本配置下的内容适用于 VuePress 的默认主题，对于自定义主题配置可能会不太一样

### 1. 脚本命令

- 我们需要至少两个脚本命令，分别用于本地开发和打包上线，脚本命令需要配置在docs/package.json文件中，它的配置如下
```js
{
  "scripts": {
    // 本地开发：在本地启用了一个小型的服务器，你可以在浏览器中使用localhost:8080(默认情况下)进行访问
    "docs:dev": "vuepress dev docs",
    // 打包上线：在.vuepress目录下生成一个dist文件夹
    "docs:build": "vuepress build docs"
  }
}
```

### 2. 项目目录

|-- docs // 特定的目录
    |-- README.md // 首页
    |-- .vuepress // 特定的目录
        |-- config.js // 特定的配置文件
|-- package.json // 脚本命令

### 3. 首页

- 默认主题提供了一个首页(HomePage)，即上面目录结构中的README.md文件中的内容，首页是可选的，对于 VuePress 中默认主题的首页，我们可以进行如下配置

```js
---
home: true
lang: zh-CN
heroText: A  Personal Blog
heroImage: /logo.jpg
actionText: 开始 →
actionLink: /interview/
features:
- title: A Blog
  details: 专注写作前端博客，记录日常所得。
- title: For Me
  details: 故九万里，则风斯在下矣，而后乃今培风；背负青天，而莫之夭阏者，而后乃今将图南。
- title: For Interview
  details: 
footer: Copyright © 2019-present Wangtunan
---
```

- 首页配置说明

    - home:true：标记此页面是否为首页
    - lang:zh-CN：表示本页面的语言为zh-CN(简体中文)
    - heroText: 首页的标题内容
    - heroImage: 首页的标题图片，其中全路径为docs/.vuepress/public/logo.jpg，默认去public目录下找静态资源
    - actionText: 首页跳转按钮的内容
    - actionLink: 首页跳转按钮挑战的路径，其中全路径为docs/interview/readme.md，默认readme命名的文件可以省略不写链接的后面内容，省略后的链接如上
    - features: 表明首页的特征，固定的格式为title + details，以三栏流式布局的方式展示
    - footer: 为底部内容，与普通的网页一样，我们可以在footer里面写版权信息

### 4. 导航栏

- 配置导航栏需要在.vuepress/config.js文件中进行配置

- 在默认主题下，导航栏需要在themeConfig属性上进行配置nav，导航栏的两个重要属性为text和link，其中text指明了导航的文字内容，link指明了导航的链接。

- 基本导航栏

```js
module.exports = {
  // 其它配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/CSS/' },
      { text: 'JavaScript', link: '/JavaScript/' }
    ]
  }
}
```

- 导航栏下拉列表
    - 下拉列表需要配置items属性，它是一个数组，数组里的对象依然是一个普通导航对象，即拥有text和link属性，一个导航栏下拉列表可以配置成如下所示
```js
module.exports = {
  // 其它配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端三剑客', items: [
        { text: 'HTML', link: '/html/' },
        { text: 'CSS', link: '/CSS/' },
        { text: 'JavaScript', link: '/JavaScript/' }
      ]},
      { text: 'Vue.jss', link: '/vue/' },
    ]
  }
}
```

- 禁用导航栏

    - 禁用导航栏分为两种情况，第一种禁用所有的导航栏，第二种在某个页面禁用导航栏，针对这两种不同的情况，相关的配置是不同的，具体如下所示
        1. 第一种： 禁用所有导航栏，通过配置navbar属性为false，此种方式禁用后，将不会存在任何导航栏
            ```js
            module.exports = {
                // 其它配置
                themeConfig: {
                    navbar: false
                }
            }
            ```
        2. 第二种： 单个禁用导航栏，在每一个页面(.md文件)最顶部，配置navbar属性为false，此种方式禁用后，对应的导航栏依然存在，只是不能点击跳转。
            ```js
            ---
            navbar: false
            ---
            ```
### 5. 内置搜索

- 我们在以上配置导航栏的过程中，除了我们配置的导航，还会出现一个搜索框，这就是 VuePress 内置的搜索，内置的搜索只能搜索页面的h2和h3标题构成的索引，我们依然可以对内置的搜索进行以下配置：

    - search: 通过配置此属性为false，来禁用内置搜索
    - searchMaxSuggestions: 通过配置此属性为一个数字，对内置的搜索进行最多结果数量的限制
```js
module.exports = {
  // 其它配置
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

### 6. 侧边栏

1. 侧边栏分组: 侧边栏分组即意味着把链接进行分组，每一个链接对应一个页面
    - 侧边栏分组可以如下进行配置，其中collapsable属性设置为false，意味着展开这个分组，属性设置为true，意味着折叠这个分组。
        ```js
        module.exports = {
            themeConfig: {
                // 其它配置
                sidebar: [
                {
                    title: '前端三剑客',
                    collapsable: false,
                    children: [
                    '/CSS/',
                    '/HTML/',
                    '/JavaScript/'
                    ]
                },
                {
                    title: 'Vue.js',
                    collapsable: false,
                    children: [
                    '/Vue/',
                    '/Vue/Vuex.md',
                    '/Vue/Vue-Router.md',
                    ]
                }
                ]
            }
        }
        ```
    - 要实现以上分组结果，目录结构可以如下所示
    |-- docs
    |   |-- CSS
    |   |   |-- README.md
    |   |-- HTML
    |   |   |-- README.md
    |   |-- JavaScript
    |   |   |-- README.md
    |   |-- Vue
    |       |-- README.md
    |       |-- Vue-Router.md
    |       |-- Vuex.md
    |   |-- README.md

2. 自动生成侧边栏

    - 如果我们要为所有.md都开启自动生成侧边栏的话，需要进行如下配置

        ```js
        module.exports = {
        themeConfig: {
            // 所有页面全部开启自动生成侧边栏
            sidebar: 'auto',
        }
        }
        ```

    - 如果我们只是针对某一个.md文件开启自动生成侧边栏的话，需要在.md文件的最上方，通过设置YAML属性，相关配置如下
        ```js
        ---
        sidebar: auto
        ---
        # Vue.js
        这里是Vue.js文件的内容部分
        ```
    - 正如上面所提到的单独配置文件的侧边栏，同样的道理，我们也能单独禁用侧边栏。
        ```js
        ---
        sidebar: false
        ---
        # Vue.js
        这里是Vue.js文件的内容部分
        ```

### 7. 最后更新时间

- 最后更新时间默认不开启，它是基于git提交的时间戳，所以我们的静态站点是需要通过git init的仓库进行管理的，并且它是按git commit的时间来计算的。

- 最后更新时间可以通过配置lastUpdated，它的默认值为false，接受字符串(String)和布尔值(boolean)
```js
module.exports = {
  themeConfig: {
    // 1.接受字符串，它设置了最后更新时间的label，例如：最后更新时间：2019年5月3日 21:51:53
    lastUpdated: '最后更新时间',
    // 2.设置true，开启最后更新时间
    lastUpdated: true,
    // 3.设置false，不开启最后更新时间(默认)
    lastUpdated: false
}
```

### 8. 上一篇/下一篇

- 上一篇/下一篇可以通过配置YAML的prev和next来显示的配置，链接地址同导航的地址一样的书写规则，一个配置了上一篇/下一篇的.md文件可以如下所示

```yaml
---
prev: /HTML/
next: /JavaScript/
---
# HTML5

这里是HTML5的内容部分
```

### 9. Git仓库和编辑链接

- 在输出我们的静态网站的时候，我们可能需要有一个导航链接到我们的GitHub仓库，对于这个需求我们可以通过如下配置来解决

- repo代表我们的链接地址，repoLabel代表链接的名称，配置后它会自动出现在我们nav导航的最后一个位置

```js
module.exports = {
  themeConfig: {
    // 其它配置
    repo: 'https://github.com/wangtunan/blog',
    repoLabel: 'Github',
    nav: [
      { text: '首页', link: '/' },
      { text: '前端三剑客', items: [
        { text: 'HTML', link: '/html/' },
        { text: 'CSS', link: '/CSS/' },
        { text: 'JavaScript', link: '/JavaScript/' }
      ]},
      { text: 'Vue.js', link: '/vue/' },
    ]
  }
}
```
- 编辑功能默认是没有开启的，我们可以通过配置editLinks来设置是否出现编辑链接，editLinkText指明编辑功能的文字内容

```js
module.exports = {
  themeConfig: {
    // 其它配置
    repo: 'https://github.com/wangtunan/blog',
    repoLabel: 'Github',
    editLinks: true,
    editLinkText: '编辑此页',
    nav: [
      { text: '首页', link: '/' },
      { text: '前端三剑客', items: [
        { text: 'HTML', link: '/html/' },
        { text: 'CSS', link: '/CSS/' },
        { text: 'JavaScript', link: '/JavaScript/' }
      ]},
      { text: 'Vue.jss', link: '/vue/' },
    ]
  }
}
```
- 你也可以通过设置YAML来单独禁止某个.md文件启用编辑链接功能
```yaml
---
editLink: false
---
```


## Markdown扩展

### 1. 链接

#### 锚链接

- 在VuePress 中所有.md文件中的标题(默认h2和h3)都会自动添加锚点链接(anchor)，所以如果我们需要跳转至固定的锚点，可以如下进行设置

```md
[锚点链接](/vuepress/#pwa配置)
```
#### 内部链接

- 在 VuePress 内部，以.md或者.html结尾的文件，会被转换成router-link用于SPA导航，它是大小写敏感的。

- 如果文件名为README，它会被编译成index.html，所以当我们访问/vuepress/时，其实就是在访问/vuepress/README.md或者/vuepress/index.html

### 2. 自定义容器

- VuePress 内置了三种不同状态的自定义容器，分别有tip、warning和danger三种类型，在紧挨着类型的旁边，可以设置自定义容器标题，不写的话默认为TIP，它们的书写规则如下所示

```md
::: tip 提醒
这里是tip容器
:::

::: warning 警告
这里是警告容器
:::

::: danger 危险
这里是危险容器
:::
```

### 3. 代码块类别

对于不同的代码块，需要设置不同的类型进行展示，常见的代码块类型有如下所示:

- html 类型：它表示代码块是html格式的

- css 类型：它表示代码块是css格式的

- js 类型：它表示代码块是javascript格式的

- stylus 类型：它表示代码块是stylus格式的，类似的类型还有less和scss

- md 类型：它表示代码块是markdown格式的

- json 类型：它表示代码块是json格式的


他们的对应的配置如下所示

-  HTML格式的代码块(观测代码块右上角小角标)

```html
<div class="box">html类型的代码块</html>
```

其它格式的代码块同理，就不在次累述



### 4. 代码块高亮和行号

#### 代码块高亮
在Markdown中，我们可以如下所示来进行代码块的高亮设置(类型后跟一个花括号)

```md
`` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
``
```

它的结果可能会是这样的(第四行高亮，行数不是从0开始的)

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

多行高亮，只需要把行号用逗号隔开即可，例如js {1,3,5}

```js{1,3,5}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

#### 代码块行号

代码块行号配置同样需要在config.js中进行配置，如下所示

```js
module.exports = {
  // 其它配置
  markdown: {
    // 显示代码块行号
    lineNumbers: true
  }
}
```

### 5. 使用Emoji表情

在.md文件中，我们可以使用Emoji表情，你也可以访问[Emoji Search](https://emoji.muan.co/)来查询你喜欢的Emoji表情，访问[Common Emoji](https://gitmoji.carloscuesta.me/)来访问常用的Emoji，一个Emoji可以是这样写的

```md
#### 这里是Emoji表情 :tada:
:100: :rocket:
```

### 6. Github风格的表格

有时候我们想要在.md文件中列一些简单的表格，可以像下面这样配置

```md
| 序号          | 订单编号      | 订单金额|
| -------------|:-------------:| ------:|
| 1             | 20180101     | $1600  |
| 2             | 20180102     |   $12  |
| 3             | 20180103     |    $1  |
```

以上表格同Github表格风格是一致的，它的结果如下所示

| 序号          | 订单编号      | 订单金额|
| -------------|:-------------:| ------:|
| 1             | 20180101     | $1600  |
| 2             | 20180102     |   $12  |
| 3             | 20180103     |    $1  |


### 7. 自动生成目录

我们有时候希望根据标题自动生成目录，可以使用[[toc]]来输出我们的目录，它默认只列举h2标题和h3标题

```md
[[toc]]

# H1标题

## h2标题
### h3标题
### h3标题

## h2标题
### h3标题
### h3标题
```

### 8. 使用Vue模板语法

#### 使用插值

在.md文件中，可以使用 Vue 的插值表达式，像下面这样

```md
# 插值表达式
1 + 1 的结果是 {{1+1}}
```
1 + 1 的结果是 {{1+1}}


#### 指令

除了像上面那样使用插值表达式，我们还可以使用v-for等指令，下面是一个使用v-for指令的例子

```html
列表渲染的结果是：<span v-for="number in 5">{{number}}</span>
```
列表渲染的结果是: <span v-for="number in 5">{{number}}</span>


### 9. 使用原生JavaScript和CSS

::: warning 
如果我们要在原生JS中操作DOM，那么一定要记住VuePress的页面是经过服务端渲染而来，最好是在页面加载完毕之后再操作DOM 
:::

VuePress 赋予了我们在.md文件中直接书写原生js和css的能力，它们可以是下面这样的形式

```md

<!--样式内容-->
<style>
.box {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
  background-color: #58a;
}
</style>

<!--.md内容-->
#### 使用原生的JS和CSS
<div id="container"></div>

<!--js内容-->
<script>
window.onload = function() {
  var dom = document.getElementById('container');
  dom.innerHTML = 'box content'
  dom.className = 'box'
}
</script>

```
以上代码的结果如下图所示:

<!--样式内容-->
<style>
.box {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
  background-color: #58a;
}
</style>

<!--.md内容-->
#### 使用原生的JS和CSS
<div id="container"></div>

<!--js内容-->
<script>
window.onload = function() {
  var dom = document.getElementById('container');
  dom.innerHTML = 'box content'
  dom.className = 'box'
}
</script>


### 10. 使用CSS预处理器

VuePress 不仅像上面一样赋予我们使用原生JS和CSS的能力，还赋予我们使用CSS预处理器的能力，它内置了相关CSS预处理器的配置，我们只需要安装对应的依赖并使用即可，特别要注意的是，VuePress 内置了Stylus，我们无需安装，可以直接使用，现在让我们使用Stylus来改写上面的例子

```html{1, 8}
<!--样式内容-->
<style lang="stylus">
.box
  width: 100%
  height: 100px
  line-height: 100px
  text-align: center
  color: #fff
  background-color: #fb3
</style>

<!--.md内容-->
#### 使用原生的JS和CSS
<div id="container"></div>

<!--js内容-->
<script>
window.onload = function() {
  var dom = document.getElementById('container');
  dom.innerHTML = 'box content'
  dom.className = 'box'
}
</script>
```

### 11. 使用内置组件

#### 外部链接

::: warning
OutboundLink用来标识一个外部链接，它紧跟在链接后面，在.md文件中设置外部链接时，已默认使用了此组件。 
:::

下面是一个外部链接的配置，它链接到百度:

```md
[百度一下](https://www.baidu.com)
```
此时，百度一下文字后面的小图标就是内置组件OutboundLink: [百度一下](https://www.baidu.com)


#### Badge(角标)

内置组件Badge有三个属性需要传递: 

- text：它指明了角标的内容

- type：同自定义容器类似，它有三种不同的类型，分别是tip、warn和error，默认是tip

- vertical：它指明了角标同内容的对齐方式，有两个值，分别是top和middle，默认是top

角标的使用如下所示: 

```md
#### Vue <Badge text="2.5.0+"/> 
#### Vuex <Badge text="beta" type="warn" vertical="top"/> 
#### Vue-Resource<Badge text="废弃" vertical="middle" type="error"/>
```
Vue <Badge text="2.5.0+"/> 
Vuex <Badge text="beta" type="warn" vertical="top"/> 
Vue-Resource<Badge text="废弃" vertical="middle" type="error"/>


### 12. 使用Vue组件

VuePress 除了让我们使用内置组件以外，还可以让我们使用自己的组件，它默认把在.vuepress/components目录下所有的组件全局注册，注册后我们可以直接在.md文件中使用。我们先在.vuepress/components目录下(无则新建)一个customer-component的.vue文件，它的内容如下所示
```
<template>
  <div class="customer-component">
    todoList:
    <div v-for="item in list" :key="item.id">
      项目：{{item.text}}，状态：{{item.done ? '完成': '进行中'}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerComponent',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.list = [
      { id: 1, text: 'JavaScript', done: false },
      { id: 2, text: 'HTML', done: false },
      { id: 3, text: 'CSS', done: true },
      { id: 4, text: 'Vue.js', done: true },
      { id: 5, text: 'VuePress', done: true }
    ]
  }
}
</script>
```

在.md文件中引入:

```md
### 使用自定义组件
<customer-component/>
```

## 进阶配置

### 1. 基本配置API

#### title(标题)

::: tip
title标题能让我们配置静态站点的标题，它固定在我们顶部左上角 
:::

可以像下面这样来配置title

```js
module.exports = {
  // 其它配置
  title: 'VuePress Blog'
}
```

#### description(网站的描述)

::: tip
description它将会以 <meta> 标签渲染到当前页面的 HTML 中，它是给搜索引擎去识别的，这属于SEO配置 
:::

可以像下面这样配置description

```js
module.exports = {
  // 其它配置
  title: 'VuePress Blog',
  description: 'VuePress Blog 的网站描述'
}
```

#### base

::: tip
base默认值为/,它属于部署环节，配置它我们可以在GitHub Pages哪个目录下访问我们的项目 
:::

简单来说，如果我们要配置在https://xxx.github.io/blog/这个地址，那么我们的base需要进行如下配置:

```js
module.exports = {
  // 其它配置
  base: '/blog/',
  title: 'VuePress Blog',
  description: 'VuePress Blog 的网站描述'
}
```

#### host(主机名)和post(端口)

::: tip
host默认值为0.0.0.0，此参数可以指明我们主机名(IP地址)， port默认值为8080，此参数可以指明我们的端口号 
:::

配置了host和port后，我们可以在浏览器上通过IP地址+port端口进行访问，例如:

```js
module.exports = {
  // 其它配置
  port: 3000,
  host: '127.0.0.1',
  base: '/blog/',
  title: 'VuePress Blog',
  description: 'VuePress Blog 的网站描述'
}
```

以上配置成功后我们可以127.0.0.1:3000来访问我们的项目

#### dest(输出目录)

::: tip
dest默认值为.vuepress/dist，配置它可以显示的帮助我们设置打包文件的输出目录 
:::

如果我们想把dist目录输出在根路径下，而不是.vuepress文件夹下，可以进行如下配置:

```js
module.exports = {
  // 其它配置
  dest: 'dist',
  port: 3000,
  host: '127.0.0.1',
  base: '/blog/',
  title: 'VuePress Blog',
  description: 'VuePress Blog 的网站描述'
}
```

### 2. 简单的样式覆盖

如果你只是希望能够在默认样式中进行一些简单的样式覆盖，你需要在.vuepress目录下创建两个样式文件override.styl和style.styl，它们都是stylus文件(也可以是其它类型的样式文件)，这两个文件的具体作用如下:

1. override.styl 重置默认主题的样式变量
2. style.styl 运用到默认主题下的自定义样式

#### override.styl

对于 VuePress 的默认主题，它提供了一些主题常量来让我们可以自由配置，可以配置的常量和其对应的解释如下:

```stylus
// 默认主题下的hover颜色(主题绿)
$accentColor = #3eaf7c 
// 默认主题下的文本颜色
$textColor = #2c3e50
// 默认主题下的border颜色
$borderColor = #eaecef
// 默认主题下的代码块背景色(背景黑)
$codeBgColor = #282c34
```

为了演示效果，我们给这些常亮设置一个醒目的颜色:

```stylus
$accentColor = #fb3 
$textColor = green
$borderColor = red
$codeBgColor = #58a
```

#### style.styl

什么是自定义的样式？举个栗子，如果我们觉得默认主题下单行代码块的文字颜色和背景色不够醒目，在利用浏览器审查元素后，我们可以这样设置我们的自定义样式

```stylus
.content
  code
    background-color: #fff5f5;
    color: #ff502c;
```

### 3. 引入代码片段

如果我们在写.md文档中，需要导入我们已经存在的js代码，而我们又不想再去使用代码块复制粘贴一遍，这个时候 VuePress 允许我们引入已经存在的js代码片段，它的语法如下:

```md
<<< @filepath
// 导入的同时也支持高亮
<<< @filepath{highlightLines}
```

### 4. Algolia搜索

在基础配置章节我们讲到了内置搜索，内置搜索只会为页面的h2和h3标题建立索引，而如果我们想进行全文搜索，就需要使用到本小结的Algolia搜索了，它的配置可以是下面这样的:

```js
module.exports = {
  // 其它配置
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```
[Algolia搜索](https://docsearch.algolia.com/)


### 5. 管理静态资源

在.md文件中，如果我们要使用静态资源，我们有如下几种方式来引用资源

1. 相对路径/绝对路径
2. Webpack 别名


#### 相对路径

要在.md文件中引用一个图片资源，它的固定格式如下

```md
// 格式
![图片缺失时的alt](图片的路径)

// 示例：绝对路径
![百度logo](https://www.baidu.com/logo.png)
// 示例：相对路径
![Algolia搜索](../images/vuepress/16.png)
```

- 如果你的目录结构相对简单，那么使用相对路径或者利用图床技术，先把图片上传到图床服务器，再填写绝对路径，这往往是非常简便和易懂的一种做法。


#### Webpack别名

就像Vue-cli脚手架那样，在路径比较长或者目录结构比较复杂的时候，使用Webpack别名进行访问，它通常是非常友好的，它的配置可以是这样的:

```js
// .vuepress/config.js下配置
module.exports = {
  // 其它配置
  configureWebpack: {
    resolve: {
      alias: {
        '@vuepress': '../images/vuepress',
        '@vue': '../images/vue',
        '@interview': '../images/interview'
      }
    }
  }
}
```

通过上面的配置以后，我们就可以在.md文件中这样使用:

```md
// 不使用别名
![Algolia搜索](../images/vuepress/16.png)

// 使用别名
![Algolia搜索](~@vuepress/16.png)
```


### 6.自定义页面样式类

有时候我们希望在特定的页面使用特定的样式，VuePress允许我们这样做，你只需要在.vuepress/style.styl中编写自定义样式并在对应的页面使用即可，它们可能是这样配置的:

```stylus
// .vuepress/style.styl
.customer-page-class
  color: #fb3;
  background-color: #333;
```

在对应的.md文件的最顶部，使用YAML语法进行引用自定义样式

```yaml
---
pageClass: customer-page-class
---
```

### 7. 自定义页面布局

在默认主题下，每一个.md文件都会被渲染在<div class="page"></div>这样的一个标签中，同时生成页面的侧边栏、编辑链接(如果有)、最新更新时间(如果有)以及上一篇/下一篇(如果有)。

但是如果我们不想生成这样的页面，而是想使用自定义布局，也就是使用Vue组件来进行自定义页面开发，VuePress提供给了我们这样的能力，它在保留导航栏的基础上，其它一切我们都可以自定义的，它的配置可能是这样的

```yaml
// 在需要自定义的.md文件中使用YAML语法
---
layout: customerComponent
---
```

上面这样的一个组件名，它对应的路径为.vuepress/components/customerComponent.vue，由于 VuePress会自动帮我们把.vuepress/components目录下的所有组件全部注册，这样我们可以在任何一个.md文件中进行使用，customerComponent.vue中的代码可以是下面这样的

```vue
<template>
  <div class="customer-component">
    <div class="left">123</div>
    <div class="center">123</div>
    <div class="right">123</div>
  </div>
</template>
<style lang="stylus">
  .customer-component
    height: calc(100vh - 60px);
    display: flex;
    background-color: #333;
    color: #fff;
    & > div
      flex: 0 0 200px;
      width: 200px;
      text-align: center
    .left
      background-color: #58a;
    .center
      flex: 1;
      background-color: #fb3;
    .right
      background-color: #58a;
</style>
```

### 8. 使用第三方主题

VuePress支持使用第三方主题，需要在.vuepress/config.js中如下进行配置即可

::: tip
VuePress的插件，命名是固定的，一般为vuepress-theme-xxx，npm install安装第三方主题后，在配置时只需要写最后一个名字即可。例如：vuepress-theme-reco主题，只需如下进行配置即可。
:::

```js
module.exports = {
  // 其它配置
  theme: 'reco'
}
```

### 9. 使用第三方库

在写文档的时候，我们如果希望使用npm包或者其它第三方库，我们该如何进行使用，VuePress提供给我们enhanceApp.js来让我们可以进行应用级别的配置，它的路径为.vuepress/enhanceApp.js，相关配置如下:

```js

// 使用自定义样式
import './style/index.styl'
// 使用第三方包
import _ from 'lodash'
// 其它
// import xxx from xxx

export default ({
  Vue,
  options,
  router,
  siteData 
}) => {
  // ...做一些其他的应用级别的优化
}
```

## 部署

### 部署到Github Pages

部署到Github Pages，我们需要以下几个步骤:

- 打包生成dist文件夹

- 新建一个仓库，在此仓库下新建一个gh-pages分支

- 提交代码到远程仓库(包含master分支和gh-pages分支)

#### 打包

在部署前，我们需要使用我们配置的打包命令:

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

运行打包命令npm run docs:build，它会在.vuepress目录下生成一个dist文件夹，随后我们只需要把这个文件夹上传到Github即可，它的打包结果可以参考如下:

```js

> vuepress build docs
 WAIT  Extracting site metadata...
[23:53:00] Compiling Client
[23:53:00] Compiling Server
Language does not exist sh
Language does not exist sh
[23:53:07] Compiled Server in 7s
[23:53:12] Compiled Client in 12s
WAIT  Rendering static HTML...
DONE  Success! Generated static files in docs\.vuepress\dist.
```

#### 新建仓库并创建Github Pages分支

新建一个github仓库和新建分支的具体步骤就不在此累述，如果你新建成功了的话，你的仓库看起来应该是这样子的:

#### 提交到Github

上面我们新建了一个远程仓库，我们可以在dist目录下进行如下的命令:

```sh
// 新建仓库
$ git init

// 关联你的远程仓库
$ git remote add origin xxxx

// 切换到gh-pages分支
$ git checkout gh-pages

// 提交代码到gh-pages分支
$ git push origin gh-pages

// 合并到master分支
$ git checkout master
$ git merge gh-pages
```

在提交成功后，可以通过https://xxx.github.io或者https://xxx.github.io/xxx/(这取决于你是否配置了base属性)进行访问