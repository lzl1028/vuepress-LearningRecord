
# CSS常用工具方法

## 动态添加css文件

- 应用场景：

    - 换肤功能
    - 一套代码不同地区使用，不同地区不同风格
    - 一套代码不同用户使用，用户个性化设置功能

- 那么如何动态添加不同的css文件呢？

```js
 /**
 * @param {String} cssName : css 名称 不带后缀
 * @param {String} prefix  ：css 前缀
 */
function dynamicAddCss(cssName,prefix=""){
    let link = document.createElement('link')
    link.setAttribute('href',prefix+cssName+'.css')
    link.setAttribute('type','text/css')
    document.getElementsByTagName('head')[0].appendChild(link)
}
dynamicAddCss('a','http://www.baidu.com/app/a/')
dynamicAddCss('b','http://www.baidu.com/app/b/')
```