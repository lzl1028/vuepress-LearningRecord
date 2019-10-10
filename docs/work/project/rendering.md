# 高性能渲染十万条数据

1. 时间分片

2. 虚拟列表

## 时间分片

### 1. 原始做法： 一次性渲染
```h
<ul id="container"></ul>
```

```js
// 记录任务开始时间
let now = Date.now();
// 插入十万条数据
const total = 100000;
// 获取容器
let ul = document.getElementById('container');
// 将数据插入容器中
for (let i = 0; i < total; i++) {
    let li = document.createElement('li');
    li.innerText = ~~(Math.random() * total)
    ul.appendChild(li);
}

console.log('JS运行时间：',Date.now() - now);
setTimeout(()=>{
  console.log('总运行时间：',Date.now() - now);
},0)
// print: JS运行时间： 187
// print: 总运行时间： 2844
```

- 在 JS 的Event Loop中，当JS引擎所管理的执行栈中的事件以及所有微任务事件全部执行完后，才会触发渲染线程对页面进行渲染

- 第一个console.log的触发时间是在页面进行渲染之前，此时得到的间隔时间为JS运行所需要的时间

- 第二个console.log是放到 setTimeout 中的，它的触发时间是在渲染完成，在下一次Event Loop中执行的

- 所以对于大量数据渲染的时候，JS运算并不是性能的瓶颈，性能的瓶颈主要在于渲染阶段

### 2. 使用定时器

- 页面的卡顿是由于同时渲染大量DOM所引起的，所以我们考虑将渲染过程分批进行。在这里，我们使用setTimeout来实现分批渲染

```js
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total/once
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    setTimeout(()=>{
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount,curIndex + pageCount)
    },0)
}
loop(total,index);
```

- setTimeout的执行时间并不是确定的。在JS中，setTimeout任务被放进事件队列中，只有主线程执行完才会去检查事件队列中的任务是否需要执行，因此setTimeout的实际执行时间可能会比其设定的时间晚一些。

- 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的刷新频率可能会不同，而setTimeout只能设置一个固定时间间隔，这个时间不一定和屏幕的刷新时间相同。

- 在setTimeout中对dom进行操作，必须要等到屏幕下次绘制时才能更新到屏幕上，如果两者步调不一致，就可能导致中间某一帧的操作被跨越过去，而直接更新下一帧的元素，从而导致丢帧现象。

### 3. 使用 requestAnimationFrame

- requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。

- 如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象。

```js
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total/once
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    window.requestAnimationFrame(function(){
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            ul.appendChild(li)
        }
        loop(curTotal - pageCount,curIndex + pageCount)
    })
}
loop(total,index);
```

### 4. 使用 [DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)

- DocumentFragment，文档片段接口，表示一个没有父级文件的最小文档对象。它被作为一个轻量版的Document使用，用于存储已排好版的或尚未打理好格式的XML片段。最大的区别是因为DocumentFragment不是真实DOM树的一部分，它的变化不会触发DOM树的（重新渲染) ，且不会导致性能等问题。

- 可以使用document.createDocumentFragment方法或者构造函数来创建一个空的DocumentFragment

- DocumentFragments是DOM节点，但并不是DOM树的一部分，可以认为是存在内存中的，所以将子元素插入到文档片段时不会引起页面回流。

- 当append元素到document中时，被append进去的元素的样式表的计算是同步发生的，此时调用 getComputedStyle 可以得到样式的计算值。而append元素到documentFragment 中时，是不会计算元素的样式表，所以documentFragment 性能更优。当然现在浏览器的优化已经做的很好了，当append元素到document中后，没有访问 getComputedStyle 之类的方法时，现代浏览器也可以把样式表的计算推迟到脚本执行之后。

```js
//需要插入的容器
let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total/once
//每条记录的索引
let index = 0;
//循环加载数据
function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    window.requestAnimationFrame(function(){
        let fragment = document.createDocumentFragment();
        for(let i = 0; i < pageCount; i++){
            let li = document.createElement('li');
            li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
            fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        loop(curTotal - pageCount,curIndex + pageCount)
    })
}
loop(total,index);
```





















