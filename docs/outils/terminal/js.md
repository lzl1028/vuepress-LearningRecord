# JS常用工具方法

## 动态添加 js文件

::: tip
有时候，我们前端开发中，有些数据文件是存到我们的服务器上，需要我们去获取这个数据再去做一些操作，比如 banner 配置数据，或是一些其他数据。
:::

- 服务器上存放的 banner.js

```js
const Config = {
    banner:[
        {img:'www.baidu.com/1.png',id:"1"},
        {img:'www.baidu.com/2.png',id:"2"},
        {img:'www.baidu.com/3.png',id:"3"},
        {img:'www.baidu.com/4.png',id:"4"},
    ]
}
```

- 服务器上存放的 json.js

```js
var list = [1,2,3,4,5]
```

- 方法

```js
 /**
 * @param {Array} scriptUrlArr : 需求动态添加的脚本URL数组
 * @param {Function} callback : 回调函数
 */
function dynamicAddScript(scriptUrlArr,callback){
    scriptUrlArr.forEach(scriptUrl=>{
        let script = document.createElement('script')
        script.setAttribute('src',scriptUrl)
        document.body.appendChild(script) 
    })
    window.onload = function(){
        callback && callback()
    }
}
```

- 使用

```js
 dynamicAddScript(['http://moxiaofei.com/banner.js','http://moxiaofei.com/json.js'],() =>{
    console.log(Config)  //{banner: Array(3)}
    console.log(list)    //[1, 2, 3, 4, 5]
})
```

::: warn
存在服务器上的数据文件变量，建议用 let 或是 const 声明，用 var会覆盖前面脚本中相同变量
:::

## 主动触发DOM身上存在的方法

```js
function trigger(Node,EventType) {
    if(EventType in Node) Node[EventType]()
}
```

## 主动触发自定义方法

```js
let oDiv = document.querySelector('#div');
document.body.addEventListener('DefineMethod', function(){
    alert('自定义方法生效了')
})
function fireEvent(node,type) {
    var event = document.createEvent('Event');
    event.initEvent(type, true, true);
    node.dispatchEvent(event)
}
fireEvent(oDiv,'DefineMethod')
```





