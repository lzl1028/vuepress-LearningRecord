# VuePress

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

















