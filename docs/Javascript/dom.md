# DOM事件机制

## 一、 DOM事件级别

- DOM级别一共可以分为4个级别：
    - DOM0级「通常把DOM1规范形成之前的叫做DOM0级」
    - DOM1级
    - DOM2级
    - DOM3级

- DOM事件分为3个级别：
    - DOM0级事件处理
    - DOM2级事件处理
    - DOM3级事件处理

![DOM级别与DOM事件](https://user-gold-cdn.xitu.io/2019/2/24/1691cf34777f644b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- HTML事件处理程序，也是最早的这一种的事件处理方式：

```html
<button type="button" onclick="fn()" id="btn">点我试试</button>

<script>
    function fn() {
        alert('Hello World');
    }
</script>
```
- 上面的代码我们通过直接在HTML代码当中定义了一个onclick的属性触发fn方法，这样的事件处理程序:
    - 最大的缺点就是HTML与JS强耦合，当我们一旦需要修改函数名就得修改两个地方。
    - 优点就是不需要操作DOM来完成事件的绑定。

### 1.DOM 0级事件

- DOM0事件绑定，给元素的事件行为绑定方法，这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的。

- 如何实现HTML与JS低耦合?

```html
<button id="btn" type="button"></button>

<script>
    var btn = document.getElementById('btn');
    
    btn.onclick = function() {
        alert('Hello World');
    }
    
    // btn.onclick = null; 解绑事件 
</script>
```

- 上面的代码:我们给button定义了一个id，然后通过JS获取到了这个id的按钮，并将一个函数赋值给了一个事件处理属性onclick，这样的方法便是DOM0级处理事件的体现。
- 我们可以通过给事件处理属性赋值null来解绑事件。
- DOM 0级的事件处理的步骤：先找到DOM节点，然后把处理函数赋值给该节点对象的事件属性。

- DOM0级事件处理程序的缺点: 在于一个处理程序「事件」无法同时绑定多个处理函数


### 2.DOM2级事件
- DOM2级事件在DOM0级事件的基础上弥补了一个处理程序无法同时绑定多个处理函数的缺点，允许给一个处理程序添加多个处理函数。也就是说，使用DOM2事件可以随意添加多个处理函数
- 移除DOM2事件要用removeEventListener。
```
<button type="button" id="btn">点我试试</button>

<script>
    var btn = document.getElementById('btn');

    function fn() {
        alert('Hello World');
    }
    btn.addEventListener('click', fn, false);
    // 解绑事件，代码如下
    // btn.removeEventListener('click', fn, false);  
</script>
```

- DOM2级事件定义了addEventListener和removeEventListener两个方法，分别用来绑定和解绑事件


```
target.addEventListener(type, listener[, useCapture]);
target.removeEventListener(type, listener[, useCapture]);
/*
	方法中包含3个参数，分别是绑定的事件处理属性名称（不包含on）、事件处理函数、是否在捕获时执行事件处理函数（关于事件冒泡和事件捕获下面会介绍）
*/
```
注：

- IE8级以下版本不支持addEventListener和removeEventListener，需要用attachEvent和detachEvent来实现：
```
// IE8级以下版本只支持冒泡型事件,不支持事件捕获所以没有第三个参数
// 方法中包含2个参数，分别是绑定的事件处理属性名称（不包含on）、事件处理函数
btn.attachEvent('onclick', fn); // 绑定事件 
btn.detachEvent('onclick', fn); // 解绑事件 
```

### 3.DOM3级事件

- DOM3级事件在DOM2级事件的基础上添加了更多的事件类型，全部类型如下：

    1. UI事件，当用户与页面上的元素交互时触发，如：load、scroll
    2. 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
    3. 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
    4. 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
    5. 文本事件，当在文档中输入文本时触发，如：textInput
    6. 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
    7. 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
    
    8. 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified

## 二、Event对象常见的方法和属性

### 1.event. preventDefault()

- 调用这个方法，默认事件行为将不再触发。
- 什么是默认事件呢？例如表单一点击提交按钮(submit)刷新页面、a标签默认页面跳转或是锚点定位等。

- 方法一：

```
<a href="javascript:;">链接</a>
```

- 方法二：
使用JS方法来阻止，给其click事件绑定方法，当我们点击A标签的时候，先触发click事件，其次才会执行自己的默认行为

```
<a id="test" href="http://www.google.com">链接</a>
<script>
    test.onclick = function(e){
        e = e || window.event;
        return false;
    }
</script>
```

- 方法三：

```
<a id="test" href="http://www.google.com">链接</a>
<script>
    test.onclick = function(e){
        e = e || window.event;
        e.preventDefault();
    }
</script>
```

### 2.event.stopPropagation() & event.stopImmediatePropagation()

- event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。demo代码如下：
```
// 在事件冒泡demo代码的基础上修改一下
child1.addEventListener('click',function fn1(e){
    console.log('儿子');
    e.stopPropagation()
},false)
```
- stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发。而 stopPropagation 只能实现前者的效果。

### 3.event.target & event.currentTarget
![image](https://user-gold-cdn.xitu.io/2019/2/24/1691cf56cfd423cf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- e.target 指向触发事件监听的对象「事件的真正发出者」。
- e.currentTarget 指向添加监听事件的对象「监听事件者」。
