# 回到页面指定位置

## 1. a 标签

```html
<body>
    <contain class="test1">
        <a name="topAnchor"></a>
        <div id="top">我是顶部</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </contain>
    <footer>
        <button id="backTop1">第一种方式回到顶部</button>
        <button id="backTop2">第二种方式回到顶部</button>
        <button id="backTop3">第三种方式回到顶部</button>
    </footer>
</body>
```

1. 将a标签放到指定元素的附近

2. 然后通过点击事件生成 a 标签

3. 触发a标签事件

4. 删除a标签

```js
    const backTop1 = document.getElementById("backTop1")

    backTop1.addEventListener("click", function (e) {
        let a = document.createElement("a")
        a.href = "#topAnchor"
        e.target.appendChild(a)
        a.onclick = function (e) {
            e.stopPropagation()
        }
        a.click()
        e.target.removeChild(a)
    })
```

> 效果很明显，在事件触发之后，页面立马跑到的顶部，在交互性没啥要求的时候，这种做法确实没啥问题，不过要求高了之后就不行了，会显得有些突兀。

## scrollTo()

此 api 需要传递 DOM元素相对于window的 left 和 top 的距离，此例子仅展示简单demo，只考虑 top 坐标

当然它还有一个 behavior 参数，将其设置为 smooth 后，将会出现滑动效果 步骤如下：

1. 计算目标元素距离顶部的距离

2. 通过事件触发

```js
    const backTop2 = document.getElementById("backTop2")
    const TOP = document.getElementById("top")
    const y = TOP.offsetTop
    const backTop3 = document.getElementById("backTop3")
    backTop3.addEventListener("click", function (e) {
        window.scrollTo({ top: y, left: 0, behavior: 'smooth' })
    })
```

> 从效果上来看，相较于a标签，该api支持动画，使得页面更丝滑

## Element.scrollIntoView()

该 api 相较于上一个，节点信息更加的明确，操作方法也更加的简洁，更利于后续的维护

```js
    const backTop2 = document.getElementById("backTop2")
    const TOP = document.getElementById("top")
    backTop2.addEventListener("click", function (e) {
        TOP.scrollIntoView({ behavior: "smooth" })
    })
```

> 从效果上来看，该api和scrollTo的作用是一致的，但是从代码结构上来说，scrollIntoView会更加的简洁


