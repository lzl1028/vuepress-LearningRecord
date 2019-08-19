module.exports = {
    title: '天狼',
    description: '这是Scorpion的Vue技术文档（博客）',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/web_accumulate/', // 这是部署到github相关的配置 下面会讲
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
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
                    { text: 'Browser(浏览器)', link: '/browser/' }
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
                    title: 'Js函数方法解析',
                    collapsable: true,
                    children: [
                        '/Javascript/fun-parsing/cycle', // 循环
                    ]
                }, // js函数解析
                'codeSpecification', // Js编码规范
                'dom', // DOM事件机制
                'promise', // 前端异步技术-Promise
                'async', // 前端异步编程
                'performance', // 性能优化
                'eventLoop', // 事件循环
                'copy', // 深拷贝
                'this', // this指向
                'request', // 网络请求
                'code', // 代码优化
                'obj', // 对象操作
                'fun', // js基础之函数
                'es6',
            ],
            '/CSS/': [
                'middle', // css居中
                'layout', // css布局
                'text', // css 文本
                'adapter', // 前端适配
            ],
            '/HTML/': [
                'label', // html标签介绍
                'special', // html特殊标签
                'base', // html基础标签
                'methods', // html元素方法
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
            ],
            '/outils/': [{
                title: '工具',
                collapsable: true, // 是否折叠
                children: [
                    '/outils/terminal/command', // 终端命令
                    '/outils/terminal/pdf', // HTML转成PDF
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
                ]
            }],
            '/work/': [{
                title: '面试',
                children: [
                    '/work/interview/question', // 面试题
                    '/work/interview/personnel', // 面试题（人事篇）
                    '/work/interview/css', // 面试题（css篇）
                    '/work/interview/html', // 面试题（html篇）
                ]
            }, {
                title: '项目问题',
                children: [
                    '/work/project/question', // 项目问题总结
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
                title: 'CSS',
                children: [
                    '/example/css/descartes', // 笛卡尔心型曲线
                ]
            }]
        }
    }
};