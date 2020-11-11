# package.json

## 前言 🤔

- 在每个项目的根目录下面，一般都会有一个 package.json 文件，其定义了运行项目所需要的各种依赖和项目的配置信息（如名称、版本、许可证等元数据）。

- 大多数人对 package.json 文件的了解，仅停留在：

    - 项目名称、项目构建版本、许可证的定义；
    
    - 依赖定义（包括 dependencies 字段，devDependencies 字段）；
    
    - 使用scripts字段指定运行脚本命令的 npm 命令行缩写。


- 其实，package.json 的作用远不止于此，我们可以通过新增配置项实现更强大的功能，下面将带你重新认识  package.json。

## package.json详解

### 简单版的 package.json

- 当我们新建一个名称为 my-test 的项目时，使用 yarn init -y 或 npm init -y 命令后，在项目目录下会新增一个 package.json文件，内容如下：

```json
{
  "name": "my-test", # 项目名称(必备)
  "version": "1.0.0", # 项目版本（格式：大版本.次要版本.小版本）（必备）
  "description": "", # 项目描述
  "main": "index.js", # 入口文件
  "scripts": { # 指定运行脚本命令的 npm 命令行缩写
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], # 关键词
  "author": "", # 作者
  "license": "ISC" # 许可证
}
```

- 可以看到，package.json 文件的内容是一个 JSON 对象，对象的每一个成员就是当前项目的一项配置。

### 必备属性（name & version）

- package.json 中有非常多的配置项，其中必须填写的两个字段分别是 name 字段和 version 字段，它们是组成一个 npm 模块的唯一标识。

#### name字段

- name 字段定义了模块的名称，其命名时需要遵循官方的一些规范和建议：

    - 模块名会成为模块 url、命令行中的一个参数或者一个文件夹名称，任何非 url 安全的字符在模块名中都不能使用（我们可以使用 validate-npm-package-name 包来检测模块名是否合法）；

    - 语义化模块名，可以帮助开发者更快的找到需要的模块，并且避免意外获取错误的模块；

    - 若模块名称中存在一些符号，将符号去除后不得与现有的模块名重复，例如：由于 react-router-dom 已经存在，react.router.dom、reactrouterdom 都不可以再创建。

- name 字段不能与其他模块名重复，我们可以执行以下命令查看模块名是否已经被使用：

```js
npm view <packageName>
```

- 如果模块存在，可以查看该模块的一些基本信息：

- 如果该模块名从未被使用过，则会抛出 404 错误：

#### version 字段

- npm 包中的模块版本都需要遵循 SemVer 规范，该规范的标准版本号采用 X.Y.Z 的格式，其中 X、Y 和 Z 均为非负的整数，且禁止在数字前方补零：

    - X 是主版本号(major)：修改了不兼容的 API

    - Y 是次版本号(minor)：新增了向下兼容的功能

    - Z 为修订号(patch)：修正了向下兼容的问题

- 当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，我们可能要先发布一个先行版本。

- 先行版本号可以加到主版本号.次版本号.修订号的后面，通过 - 号连接一连串以句点分隔的标识符和版本编译信息：

    - 内部版本(alpha)

    - 公测版本(beta)

    - 正式版本的候选版本rc（即 Release candiate）

- 我们可以执行以下命令查看模块的版本：

```shell
npm view <packageName> version # 查看某个模块的最新版本
npm view <packageName> versions # 查看某个模块的所有历史版本
```

### 描述信息（description & keywords）

- description 字段用于添加模块的描述信息，便于用户了解该模块。

- keywords 字段用于给模块添加关键字。

- 当我们使用 npm 检索模块时，会对模块中的 description 字段和 keywords 字段进行匹配，写好 package.json中的 description 和 keywords 将有利于增加我们模块的曝光率。

### 安装项目依赖（dependencies & devDependencies）

- dependencies字段指定了项目运行所依赖的模块（生产环境使用），如 antd、 react、 moment等插件库：

    - 它们是我们生产环境所需要的依赖项，在把项目作为一个 npm 包的时候，用户安装 npm 包时只会安装 dependencies 里面的依赖。

- devDependencies 字段指定了项目开发所需要的模块（开发环境使用），如 webpack、typescript、babel等：

    - 在代码打包提交线上时，我们并不需要这些工具，所以我们将它放入 devDependencies 中。

- 如果一个模块不在 package.json 文件之中，我们可以单独安装这个模块，并使用相应的参数，将其写入 dependencies 字段/ devDependencies 字段中：

```shell
# 使用 npm
npm install <package...> --save # 写入 dependencies 属性
npm install <package...> --save-dev # 写入 devDependencies 属性

# 使用 yarn
yarn add <package...> # 写入 dependencies 属性
yarn add <package...> --dev # 写入 devDependencies 属性
```

- 有了 package.json 文件，开发直接使用 npm install / yarn install 命令，就会在当前目录中自动安装所需要的模块，安装完成项目所需的运行和开发环境就配置好了。


### 简化终端命令（scripts）

- scripts 字段是 package.json 中的一种元数据功能，它接受一个对象，对象的属性为可以通过 npm run 运行的脚本，值为实际运行的命令（通常是终端命令），如：

```json
"scripts": {
  "start": "node index.js"
},
```

### 定义项目入口（main）

- main 字段是 package.json 中的另一种元数据功能，它可以用来指定加载的入口文件。假如你的项目是一个 npm 包，当用户安装你的包后，require('my-module') 返回的是 main 字段中所列出文件的 module.exports 属性。

- 当不指定main 字段时，默认值是模块根目录下面的index.js 文件。

### 发布文件配置（files）

- files 字段用于描述我们使用 npm publish 命令后推送到 npm 服务器的文件列表，如果指定文件夹，则文件夹内的所有内容都会包含进来。

- 我们可以查看下载的 antd 的 package.json 的files 字段，内容如下：

```json
"files": [
    "dist",
    "lib",
    "es"
],
```

### 定义私有模块（private）

- 一般公司的非开源项目，都会设置 private 属性的值为 true，这是因为 npm 拒绝发布私有模块，通过设置该字段可以防止私有模块被无意间发布出去。

### 指定模块适用系统（os）

- 假如我们开发了一个模块，只能跑在 darwin 系统下，我们需要保证 windows 用户不会安装到该模块，从而避免发生不必要的错误。

- 这时候，使用 os 属性则可以帮助我们实现以上的需求，该属性可以指定模块适用系统的系统，或者指定不能安装的系统黑名单（当在系统黑名单中的系统中安装模块则会报错）：

```
"os" : [ "darwin", "linux" ] # 适用系统
"os" : [ "!win32" ] # 黑名单
```

> Tips：在 node 环境下可以使用 process.platform 来判断操作系统。

### 指定模块适用 cpu 架构（cpu）

- 和上面的 os 字段类似，我们可以用 cpu 字段更精准的限制用户安装环境：

```
"cpu" : [ "x64", "ia32" ] # 适用 cpu
"cpu" : [ "!arm", "!mips" ] # 黑名单
```

> Tips：在 node 环境下可以使用 process.arch 来判断 cpu 架构。

### 指定项目 node 版本（engines）

- 有时候，新拉一个项目的时候，由于和其他开发使用的 node 版本不同，导致会出现很多奇奇怪怪的问题（如某些依赖安装报错、依赖安装完项目跑步起来等）。

- 为了实现项目开箱即用的伟大理想，这时候可以使用 package.json 的 engines 字段来指定项目 node 版本：

```json
"engines": {
   "node": ">= 8.16.0"
},
```

- 该字段也可以指定适用的 npm 版本：

```json
"engines": {
   "npm": ">= 6.9.0"
 },
```

> 需要注意的是，engines属性仅起到一个说明的作用，当用户版本不符合指定值时也不影响依赖的安装。

### 自定义命令（bin）

- 用过 vue-cli，create-react-app等脚手架的朋友们，不知道你们有没有好奇过，为什么安装这些脚手架后，就可以使用类似 vue create/create-react-app之类的命令，其实这和 package.json 中的 bin 字段有关。

- bin 字段用来指定各个内部命令对应的可执行文件的位置。当package.json 提供了 bin 字段后，即相当于做了一个命令名和本地文件名的映射。

- 当用户安装带有 bin 字段的包时，

    - 如果是全局安装，npm 将会使用符号链接把这些文件链接到/usr/local/node_modules/.bin/；
    
    - 如果是本地安装，会链接到./node_modules/.bin/。

- 举个 🌰，如果要使用 my-app-cli 作为命令时，可以配置以下 bin 字段：

```json
"bin": {
  "my-app-cli": "./bin/cli.js"
}
```

- 上面代码指定，my-app-cli 命令对应的可执行文件为 bin 子目录下的 cli.js，因此在安装了 my-app-cli 包的项目中，就可以很方便地利用 npm执行脚本：

```json
"scripts": {
  start: 'node node_modules/.bin/my-app-cli'
}
```

- 怎么看起来和 vue create/create-react-app之类的命令不太像？原因：

    - 当需要 node 环境时就需要加上 node 前缀

    - 如果加上 node 前缀，就需要指定 my-app-cli 的路径 -> node_modules/.bin，否则 node my-app-cli会去查找当前路径下的 my-app-cli.js，这样肯定是不对。

- 若要实现像 vue create/create-react-app之类的命令一样简便的方式，则可以在上文提到的 bin 子目录下可执行文件cli.js 中的第一行写入以下命令：

```js
#!/usr/bin/env node
```

- 这行命令的作用是告诉系统用 node 解析，这样命令就可以简写成 my-app-cli 了。

## React项目相关

### 设置应用根路径（homepage）

- 当我们使用 create-react-app 脚手架搭建的 React 项目，默认是使用内置的 webpack 配置，当package.json 中不配置 homepage 属性时，build 打包之后的文件资源应用路径默认是 /，如下图：

- 一般来说，我们打包的静态资源会部署在 CDN 上，为了让我们的应用知道去哪里加载资源，则需要我们设置一个根路径，这时可以通过 package.json 中的 homepage 字段设置应用的根路径。

- 当我们设置了 homepage 属性后：

```json
{
  "homepage": "https://xxxx.cdn/my-project",
}
```

- 打包后的资源路径就会加上 homepage 的地址：

### 开发环境解决跨域问题（proxy）

- 在做前后端分离的项目的时候，调用接口时则会遇到跨域的问题，当在开发环境中时，可以通过配置 package.json 中的 proxy 来解决跨域问题，配置如下：

```json
{
  "proxy": "http://localhost:4000"  // 配置你要请求的服务器地址
}
```

- 注意，当 create-react-app 的版本高于 2.0 版本的时候在 package.json 中只能配置 string 类型，这意味着如果要使用 package.json 来解决跨域问题，则只能代理一个服务器地址。

- 如果要代理多个服务器地址时，则需要安装 http-proxy-middleware ，在 src 目录下新建 setupProxy.js ：

```js
const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/base", {
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
  app.use(
    proxy("/fans", {
      target: "http://localhost:5000",
      changeOrigin: true
    })
  );
};
```

### 根据开发环境采用不同的全局变量值（自定义字段）

- 假设有这么一个组件，当组件被点击时，在开发环境时是跳转测试环境的 sentry 地址，在正式环境时则跳转正式环境的 sentry 地址。

- 首先，通过配置前面提到的 scripts 字段，实现环境变量（NODE_ENV）的设置：

```json
"scripts": {
  "start": "NODE_ENV=development node scripts/start.js",
  "build": "NODE_ENV=production node scripts/build.js",
},
```

- 项目启动起来后，在代码中我们可以通过 process.env.NODE_ENV 访问到 NODE_ENV 的值。

#### 方案一

- 我们可以在组件中写类似以下的判断代码，根据不同环境给 sentryUrl 设置不同的值：

```js
let sentryUrl;
if (process.env.NODE_ENV === 'development') {
    sentryUrl = 'test-sentry.xxx.com';
} else {
    sentryUrl = 'sentry.xxx.com';
}
```

- 但是深入一想，如果有多个组件，要根据不同的环境使用不同的服务（多种服务）地址，如果按照上面的写法，项目中将存在许多重复的判断代码，且当服务地址发生变化时，包含这些服务地址的组件都需要相应的做改动，这样明显是不合理的。

