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






## 时间函数

### 时间显示1：

需求：
发布1小时以内的评论：x分钟前

发布1小时~24小时的评论：x小时前

发布24小时~30天的评论：x天前

发布30天以上的评论：月/日

去年发布并且超过30天的评论：年/月/日

- 原始代码
```js
function formatDate(timeStr){
    //获取当前时间戳
    let _now=+new Date();
    //求与当前的时间差
    let se=_now-timeStr;
    let _text='';
    //去年
    if(new Date(timeStr).getFullYear()!==new Date().getFullYear()&&se>2592000000){
      _text=new Date(timeStr).getFullYear()+'年'+(new Date(timeStr).getMonth()+1)+'月'+new Date(timeStr).getDate()+'日';
    }
    //30天以上
    else if(se>2592000000){
      _text=(new Date(timeStr).getMonth()+1)+'月'+new Date(timeStr).getDate()+'日';
    }
    //一天以上
    else if(se>86400000){
      _text=Math.floor(se/86400000)+'天前';
    }
    //一个小时以上
    else if(se>3600000){
      _text=Math.floor(se/3600000)+'小时前';
    }
    //一个小时以内
    else{
      //如果小于1分钟，就显示1分钟前
      if(se<60000){se=60000}
      _text=Math.floor(se/60000)+'分钟前';
    }
    return _text;
}
```

- 数字常量化

```js
function formatDate(timeStr){
    //获取当前时间戳
    let _now=+new Date();
    //求与当前的时间差
    let se=_now-timeStr;
    const DATE_LEVEL={
      month:2592000000,
      day:86400000,
      hour:3600000,
      minter:60000,
    }
    let _text='';
    //去年
    if(new Date(timeStr).getFullYear()!==new Date().getFullYear()&&se>DATE_LEVEL.month){
      _text=new Date(timeStr).getFullYear()+'年'+(new Date(timeStr).getMonth()+1)+'月'+new Date(timeStr).getDate()+'日';
    }
    //一个月以上
    else if(se>DATE_LEVEL.month){
      _text=(new Date(timeStr).getMonth()+1)+'月'+new Date(timeStr).getDate()+'日';
    }
    //一天以上
    else if(se>DATE_LEVEL.day){
      _text=Math.floor(se/DATE_LEVEL.day)+'天前';
    }
    //一个小时以上
    else if(se>DATE_LEVEL.hour){
      _text=Math.floor(se/DATE_LEVEL.hour)+'小时前';
    }
    //一个小时以内
    else{
      //如果小于1分钟，就显示1分钟前
      if(se<DATE_LEVEL.minter){se=DATE_LEVEL.minter}
      _text=Math.floor(se/DATE_LEVEL.minter)+'分钟前';
    }
    return _text;
}
```

- look-up方式
> 这里也顺便提一下，如果硬要把上面的需求改成look-up的方式，代码就是下面这样。这样代码的修改的扩展性会强一些，成本会小一些，但是可读性不如上面。取舍关系，实际情况，实际分析。
```js
function formatDate(timeStr){
    //获取当前时间戳
    let _now=+new Date();
    //求与当前的时间差
    let se=_now-timeStr;
    let _text='';
	//求上一年最后一秒的时间戳
	let lastYearTime=new Date(new Date().getFullYear()+'-01-01 00:00:00')-1;
	//把时间差添加进去（当前时间戳与上一年最后一秒的时间戳的差）添加进去，如果时间差（se）超过这个值，则代表了这个时间是上一年的时间。
	//DATE_LEVEL.unshift(_now-lastYearTime);
	const DATE_LEVEL={
      month:2592000000,
      day:86400000,
      hour:3600000,
      minter:60000,
    }
	let handleFn=[
        {
			time:DATE_LEVEL.month,
            fn:function(timeStr){
                return (new Date(timeStr).getMonth()+1)+'月'+new Date(timeStr).getDate()+'日';
            }
		},
        {
			time:DATE_LEVEL.day,
            fn:function(timeStr){
                return Math.floor(se/DATE_LEVEL.day)+'天前';
            }
		},
		{
			time:DATE_LEVEL.hour,
            fn:function(timeStr){
                return Math.floor(se/DATE_LEVEL.hour)+'小时前';
            }
		},
        {
			time:DATE_LEVEL.minter,
            fn:function(timeStr){
                return Math.ceil(se/DATE_LEVEL.minter)+'分钟前';
            }
		} 
    ];
    //求上一年最后一秒的时间戳
	let lastYearTime=new Date(new Date().getFullYear()+'-01-01 00:00:00')-1;
	//把时间差（当前时间戳与上一年最后一秒的时间戳的差）和操作函数添加进去，如果时间差（se）超过这个值，则代表了这个时间是上一年的时间。
	handleFn.unshift({
		time:_now-lastYearTime,
		fn:function(timeStr){
		    if(se>DATE_LEVEL.month){
		        return new Date(timeStr).getFullYear()+'年'+(new Date(timeStr).getMonth()+1)+'月'+new Date(timeStr).getDate()+'日';
		        
		    }
		},
	});
    let result='';
    for(let i=0;i<handleFn.length;i++){
        if(se>=handleFn[i].time){
            result=handleFn[i].fn(timeStr);
            if(result){
                return result;
            }
        }
    }
	//如果发布时间小于1分钟，之际返回1分钟
	return result='1分钟前'
}
```
