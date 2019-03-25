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
            { text: '前端积累', link: '/accumulate/' }, // 内部链接 以docs为根目录
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
            '/accumulate/': [
                // '/accumulate/', // accumulate文件夹的README.md 不是下拉框形式
                {
                    title: 'Javascript',
                    children: [
                        // 以docs为根目录来查找文件 
                        // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                        // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
                        '/accumulate/JS/dom', // DOM事件机制
                        '/accumulate/JS/promise', // 前端异步技术-Promise
                        '/accumulate/JS/async', // 前端异步编程
                        '/accumulate/JS/performance', // 性能优化
                        '/accumulate/JS/eventLoop', // 事件循环
                        '/accumulate/JS/copy', // 深拷贝
                    ]
                }, {
                    title: '浏览器',
                    children: [
                        '/accumulate/browser/work', // 浏览器工作原理
                        '/accumulate/browser/compatibility', // H5 键盘兼容性
                        '/accumulate/browser/request', // 向服务端发送请求方式
                        '/accumulate/browser/store', // 前端本地存储
                        '/accumulate/browser/statusCode', // 具有代表性的 HTTP 状态码
                        '/accumulate/browser/crossDomain', // 浏览器跨域请求
                        '/accumulate/browser/compatible', // 浏览器兼容
                        '/accumulate/browser/re', // 浏览器的回流和重绘
                        '/accumulate/browser/nginx', // nginx介绍
                        '/accumulate/browser/cache', // 浏览器缓存
                    ]
                }, {
                    title: 'CSS',
                    children: [
                        '/accumulate/css/middle', // css居中
                        '/accumulate/css/layout', // css布局
                        '/accumulate/css/text', // css 文本
                    ]
                }, {
                    title: 'HTML',
                    children: [
                        '/accumulate/html/label', // html标签介绍
                    ]
                }
            ],
            '/outils/': [{
                title: '工具',
                children: [
                    '/outils/terminal/command', // 终端命令
                ]
            }],
            '/work/': [{
                title: '面试',
                children: [
                    '/work/interview/question', // 面试题
                ]
            }, {
                title: '项目问题',
                children: [
                    '/work/project/question', // 项目问题总结
                ]
            }, {
                title: '代码规范',
                children: [
                    '/work/code/specification_readme', //README规范
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