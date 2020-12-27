module.exports = {
    title: '天狼的Blog',
    description: '这是Scorpion的Vuepress技术文档（博客）',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/blog/', // 这是部署到github相关的配置 下面会讲
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    // 插件
    plugins: [
        ["@vuepress/back-to-top"], // 返回顶部
        ["@vuepress/nprogress"], // 加载进度条
        // globalUIComponents是用于注入全局的UI, 它以数组的形式接收参数名字, 这里的名字必须与components文件夹下的.vue文件同名, 全局UI就是一个Vue组件
        {
            name: "page-plugin",
            globalUIComponents: ["fixed"],
        },
        // 
    ],
    themeConfig: {
        sidebarDepth: 1, // 将同时提取markdown中h2 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        // 导航栏配置
        nav: [
            // { text: '前端积累', link: '/accumulate/' }, // 内部链接 以docs为根目录
            {
                text: 'Blog',
                items: [
                    { text: 'Javascript', link: '/Javascript/' },
                    { text: 'CSS', link: '/CSS/' },
                    { text: 'HTML', link: '/HTML/' },
                    { text: 'Node', link: '/node/' },
                    { text: 'Browser(浏览器)', link: '/browser/' },
                    { text: 'expand(拓展)', link: '/expand/' }
                ]
            },
            { text: '工具函数', link: '/outils/' },
            { text: '工作', link: '/work/' },
            { text: '实例', link: '/example/' },
            // 下拉列表
            {
                text: '更多',
                items: [
                    { text: 'GitHub地址', link: 'https://github.com/lzl1028' },
                    { text: '博客', link: 'https://lzl1028.github.io/' }, // 外部链接
                    // {
                    //     text: '算法仓库',
                    //     link: 'https://github.com/OBKoro1/Brush_algorithm'
                    // }
                ]
            }
        ],
        // 侧边栏配置：
        sidebar: {
            // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
            '/Javascript/': [{
                    title: 'Vue',
                    collapsable: true,
                    children: [
                        '/Javascript/vue/skills', // vue常用开发技巧
                        '/Javascript/vue/question', // vue开发中遇到的问题
                        '/Javascript/vue/cycle', // vue生命周期
                    ]
                }, {
                    title: 'Js函数方法解析',
                    collapsable: true,
                    children: [
                        '/Javascript/fun-parsing/cycle', // 循环
                    ]
                }, // js函数解析
                'commonMethods', // JS常用技巧
                'codeSpecification', // Js编码规范
                'dom', // DOM事件机制
                'async', // 前端异步编程
                'performance', // 性能优化
                'eventLoop', // 事件循环
                'copy', // 深拷贝
                'request', // 网络请求
                'code', // 代码优化
                'obj', // 对象操作
                'fun', // js基础之函数
                'errorCode', // Js常见报错
                'memoryManagement', // JS中的内存管理
                'throttle', // Js防抖和节流
                'pageJump', // Js页面跳转
                'popUp', // Js弹窗详解
                'design-patterns', // Js设计模式
                'form', // 表单办法总结
                'web-worker', // Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。
                'jq-js', // jQuery-JavaScript一览表
                'regularExpression', // 正则表达式
                'closure', // 闭包,
                'inherit', // js继承
                'prototype', // js原型及原型链
            ],
            '/CSS/': [
                'attribute', // css3属性与变量
                'middle', // css居中
                'text', // css 文本
                'adapter', // 前端适配
                'skills', // CSS小技巧
                'reset-template', // css初始化模板
                'unit', // CSS计量单位
                'mixed-model', // CSS 混合模式
            ],
            '/HTML/': [
                'label', // html标签介绍
                'special', // html特殊标签
                'base', // html基础标签
                'methods', // html元素方法
                'video', // H5 video标签
            ],
            '/node/': [
                'advance', // node 进阶需要了解的问题
                'build', // 搭建nodejs开发环境及目录设计
            ],
            '/browser/': [
                'work', // 浏览器工作原理
                'compatibility', // H5 键盘兼容性
                'request', // 向服务端发送请求方式
                'store', // 前端本地存储
                'statusCode', // HTTP详解
                'crossDomain', // 浏览器跨域请求
                'compatible', // 浏览器兼容
                're', // 浏览器的回流和重绘
                'nginx', // nginx介绍
                'cache', // 浏览器缓存
                'requests', // 前端网络请求
                'drawing', // 浏览器如何渲染网页
                'dns', // DNS基础知识
                'mobile', // 移动端知识
                'router', // 前端路由
                'communication', // 多页应用中各个页签之间数据交互的技术手段
            ],
            '/expand/': [
                'safe', // 前端安全
            ],
            '/outils/': [{
                title: '工具',
                collapsable: true, // 是否折叠
                children: [
                    '/outils/terminal/command', // 终端命令
                    '/outils/terminal/pdf', // HTML转成PDF
                    '/outils/terminal/css', // css方法
                    '/outils/terminal/js', // js方法
                    '/outils/terminal/browser', // 浏览器方法
                ]
            }, {
                title: '前端API',
                children: [
                    '/outils/api/screenwh', // 获取屏幕宽高总结
                    '/outils/api/datachange', // Js数据转换
                ]
            }, {
                title: '常用函数处理',
                children: [
                    '/outils/methods/url', // 常用URL参数操作方法
                    '/outils/methods/query', // js精准查询与模糊查询
                    '/outils/methods/array', // js数组操作
                ]
            }, {
                title: '算法总结',
                children: [
                    // 'outils/methods/sorting', // 排序算法
                ]
            }],
            '/work/': [{
                title: '面试',
                children: [
                    '/work/interview/question', // 面试题
                    '/work/interview/personnel', // 面试题（人事篇）
                    '/work/interview/css', // 面试题（css篇）
                    '/work/interview/html', // 面试题（html篇）
                    '/work/interview/js', // 面试题（js篇）
                    '/work/interview/vue', // 面试题（vue篇）
                ]
            }, {
                title: '项目问题',
                children: [
                    '/work/project/question', // 项目问题总结
                    '/work/project/rendering', // 页面数据渲染优化
                    '/work/project/error', // 前端开发中的常见错误
                    '/work/project/css', // 前端项目中常见的 CSS 问题
                    '/work/project/logo', // 网站 Logo
                    '/work/project/login', // 用户无感刷新 access_token(登录)
                    '/work/project/scheme', // 项目中遇到的一些问题的解决方案
                    '/work/project/optimize', // 项目中遇到的一些问题的解决方案
                    '/work/project/dataEncryption', // 敏感数据加密方案
                    '/work/project/timer', // 定时器时间间隔错误解决方案
                    '/work/project/debugging', // 移动端调试
                    '/work/project/backPosition', // 回到页面指定位置的三种方式
                ]
            }, {
                title: '代码规范',
                children: [
                    '/work/code/specification_readme', // README规范
                    '/work/code/specification_code', // 前端代码规范
                ]
            }, {
                title: '移动端总结',
                children: [
                    '/work/mobile/navigator', // 移动端系统判断
                    '/work/mobile/question', // 移动端问题总结
                ]
            }],
            '/example/': [{
                title: '实例',
                children: [
                    '/example/css/descartes', // 笛卡尔心型曲线
                    '/example/page/package', // package.json分析
                    '/example/page/layout', // 页面布局
                    '/example/css/amplification', // 图片效果
                    '/example/html/input', // 自适应高度输入框
                    '/example/js/scroll-top-absorption', // 滚动吸顶
                    '/example/file/upload-compressed', // 图片上传及canvas压缩
                    '/example/map/visual-data-map', // 不依赖任何库实现自己的可视化数据地图
                    '/example/back/vide-background', // 移动端背景视频
                    '/example/file/upload-preview', // 图片上传及预览
                ]
            }]
        }
    }
};