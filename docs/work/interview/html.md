# HTML

## 1. DOM和BOM：

- **DOM**：DOM（文档对象模型）是 HTML 和XML 的应用程序接口（API）。是一个使程序和脚本有能力动态地访问和更新文档的内容、结构以及样式的平台和语言中立的接口。
- DOM 是 W3C 的标准； [所有浏览器公共遵守的标准]
    1. 访问节点
        - `varoHtml = document.documentElement;`//返回存在于 XML 以及 HTML 文档中的文档根节点，oHtml包含了一个表示html />的HTMLElement对象
        - `document.body` //是对 HTML 页面的特殊扩展，提供了对 body> 标签的直接访问/span>span>/span>/span>
        - `document.getElementById("ID")`//通过指定的 ID 来返回元素，getElementById() 无法工作在 XML 中，IE6还会返回name为指定ID的元素
        - `document.getElementByName("name")`//获取所有name特性等于指定值的元素，不过在IE6和Opera7.5上还会返回id为给定名称的元素且仅检查input/>和img/>
        - `varx=document.getElementsByTagName("p");`//使用指定的标签名返回所有的元素列表NodeList，索引号从0开始。当参数是一个星号的时候，IE6并不返回所有的元素，必须用document.all来替代

    2. Node节点的特性和方法
        
        - firstChild //Node，指向在childNodes列表中的第一个节点
        - lastChild //Node，指向在childNodes列表中的最后一个节点
        - parentNode //Node，指向父节
        - ownerDocument //Document，指向这个节点所属的文档
        - firstChild //Node，指向在childNodes列表中的第一个节点 
        - lastChild //Node，指向在childNodes列表中的最后一个节点 
        - parentNode //Node，指向父节点 
        - childNodes //NodeList，所有子节点的列表
        - previousSibling//Node，/指向前一个兄弟节点：如果这个节点就是第一个节点，那么该值为null
        - `nextSibling`//Node，指向后一个兄弟节点：如果这个节点就是最后一个节点，那么该值为null
        - `hasChildNodes()`//Boolean，当childNodes包含一个或多个节点时，返回真值
    3. DOM事件
    
    ```
    DOM同时两种事件模型：冒泡型事件和捕获型事件
    冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标的顺序触发
    body onclick="handleClick()">
      div onclick="handleClick()">Click Me/div>
    /body>
    触发的顺序是：div、body、html(IE 6.0和Mozilla 1.0)、document、window(Mozilla 1.0)
     
    捕获型事件：与冒泡事件相反的过程，事件从最不精确的对象开始触发，然后到最精确
    上面例子触发的顺序是：document、div
    DOM事件模型最独特的性质是，文本节点也触发事件(在IE中不会)。
    
    阻止冒泡有以下方法：

    e.cancelBubble=true;
    e.stopPropagation();
    return false;

    ```
    
    4. 事件处理函数/监听函数
    
    ```
    **事件处理函数/监听函数**
    在JavaScript中：
    var oDiv = document.getElementById("div1");
    oDiv.onclick = function(){ //onclick只能用小写，默认为冒泡型事件
      alert("Clicked!");
    }
     
    在HTML中：
    div onclick="javascript: alert("Clicked!")">/div> //onclick大小写任意

    ```
    - IE事件处理程序attachEvent()和detachEvent()
    - 在IE中，每个元素和window对象都有两个方法：attachEvent()和detachEvent()，这两个方法接受两个相同的参数，事件处理程序名称和事件处理程序函数，如：
    ```
    [object].attachEvent("name_of_event_handler","function_to_attach")
    [object].detachEvent("name_of_event_handler","function_to_remove")
    var fnClick = function(){
      alert("Clicked!");
    }
    oDiv.attachEvent("onclick", fnClick);//添加事件处理函数
    oDiv.attachEvent("onclick", fnClickAnother);// 可以添加多个事件处理函数
    oDiv.detachEvent("onclick", fnClick);//移除事件处理函数
    ```
    - 在使用attachEvent()方法的情况下，事件处理程序会在全局作用域中运行，因此this等于window。

- **跨浏览器的事件处理程序**: addHandler()和removeHandler()
    - addHandler()方法属于一个叫EventUntil()的对象，这两个方法均接受三个相同的参数，要操作的元素，事件名称和事件处理程序函数。

- **事件类型**
    - 鼠标事件：click、dbclick、mousedown、mouseup、mouseover、mouseout、mousemove
    - 键盘事件：keydown、keypress、keyup
    - HTML事件：load、unload、abort、error、select、change、submit、reset、
resize、scroll、focus、blur

- **事件处理器**
    - 执行JavaScript 代码的程序在事件发生时会对事件做出响应。为了响应一个特定事件
而被执行的代码称为事件处理器。
    - HTML标签 事件处理器="JavaScript代码''> 

- **事件处理程序**

    - 事件就是用户或浏览器自身执行的某种动作。比如click,mouseup,keydown,mouseover等都是事件的名字。而响应某个事件的函数就叫事件处理程序（事件监听器），事件处理程序以on开头，因此click的事件处理程序就是onclick

- **innerText、innerHTML、outerHTML、outerText**
    - innerHTML: 表示元素的所有元素和文本的HTML代码
    - innerHTML为Hello world
    ```
    如：div> b> Hello /b> world /div>的innerText为Hello world，
    ```
    - outerText: 与前者的区别是替换的是整个目标节点，问题返回和innerText一样的内容
    - outerHTML: 与前者的区别是替换的是整个目标节点，返回元素完整的HTML代码，包括元素本身

- **DOM 0级事件处理程序**
    - DOM 0级事件处理程序：把一个函数赋值给一个事件的处理程序属性
    ```
    input type="button"value="按钮2"id="ben2"/>
         varbtn2=document.getElementById('btn2');获得btn2按钮对象
         btn2.onclick     //给btn2添加onclick属性，属性又触发了一个事件处理程序
     
    btn2.onclick=function(){
    }                   //添加匿名函数
     
    btn2.onclick=null     //删除onclick属性
    ```

- **DOM 2级事件处理程序**
    - DOM 2级事件定义了两个方法，用于指定和删除事件处理程序的操作。addEventListener()和removeEventListener()
    - 在DOM中，addEventListener()和removeEventListener()用来分配和移除事件处理函数，与IE不同的是，这些方法需要三个参数：事件名称，要分配的函数和处理函数是用于冒泡阶段(false)还是捕获阶段(true)，默认为冒泡阶段false
    
    ```
    [object].addEventListener("name_of_event",fnhander,bcapture)
 
    [object].removeEventListener("name_of_event",fnhander,bcapture)
     
    var fnClick = function(){
      alert("Clicked!");
    }
    oDiv.addEventListener("onclick", fnClick, false); //添加事件处理函数
     
    oDiv.addEventListener("onclick", fnClickAnother, false); // 与IE一样，可以添加多个事件处理函数
     
    oDiv.removeEventListener("onclick", fnClick, false); //移除事件处理函数
     
    如果使用addEventListener()将事件处理函数加入到捕获阶段，则必须在removeEventListener()中指明是捕获阶段，才能正确地将这个事件处理函数删除
     
    oDiv.onclick = fnClick;
     
    oDiv.onclick = fnClickAnother; //使用直接赋值，后续的事件处理函数会覆盖前面的处理函数
     
    oDiv.onclick = fnClick;
     
    oDiv.addEventListener("onclick", fnClickAnother, false); //会按顺序进行调用，不会覆盖
    ```


- **BOM**：主要处理浏览器窗口和框架，不过通常浏览器特定的JavaScript 扩展都被看做 BOM 的一部分。定义了JavaScript可以进行操作的浏览器的各个功能部件的接口。
    - 弹出新的浏览器窗口
    - 移动、关闭浏览器窗口以及调整窗口大小
    - 提供 Web 浏览器详细信息的定位对象
    - 提供用户屏幕分辨率详细信息的屏幕对象
    - 对 cookie 的支持
    - IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 - - - ActiveX 对象
- BOM 是 各个浏览器厂商根据 DOM
在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]
- window 是 BOM 对象，而非 js 对象；
- javacsript是通过访问BOM（Browser Object Model）对象来访问、控制、修改客户端(浏览器)，由于BOM的window包含了document，window对象的属性和方法是直接可以使用而且被感知的，因此可以直接使用window对象的document属性，通过document属性就可以访问、检索、修改XHTML文档内容与结构。因为document对象又是DOM（Document Object Model）模型的根节点。可以说，BOM包含了DOM(对象)，浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。其中DOM包含：window
    
    1. Window对象包含属性：document、location、navigator、screen、history、frames
    2. Document根节点包含子节点：forms、location、anchors、images、links
    
- 从window.document已然可以看出，DOM的最根本的对象是BOM的window对象的子对象。
    - 区别：DOM描述了处理网页内容的方法和接口，BOM描述了与浏览器进行交互的方法和接口。  

- BOM的核心是window，而window对象又具有双重角色，它既是通过js访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都以window作为其global对象。
```

window.close(); //关闭窗口
 
window.alert("message");//弹出一个具有OK按钮的系统消息框，显示指定的文本
 
window.confirm("Are you sure?");//弹出一个具有OK和Cancel按钮的询问对话框，返回一个布尔值
 
window.prompt("What's your name?","Default");//提示用户输入信息，接受两个参数，即要显示给用户的文本和文本框中的默认值，将文本框中的值作为函数值返回
 
window.status //可以使状态栏的文本暂时改变
 
window.defaultStatus//默认的状态栏信息，可在用户离开当前页面前一直改变文本
 
window.setTimeout("alert('xxx')", 1000);//设置在指定的毫秒数后执行指定的代码，接受2个参数，要执行的代码和等待的毫秒数
 
window.clearTimeout("ID");//取消还未执行的暂停，将暂停ID传递给它
 
window.setInterval(function, 1000);//无限次地每隔指定的时间段重复一次指定的代码，参数同setTimeout()一样
 
window.clearInterval("ID");//取消时间间隔，将间隔ID传递给它
 
window.history.go(-1);//访问浏览器窗口的历史，负数为后退，正数为前进
 
window.history.back();//同上
 
window.history.forward();//同上
 
window.history.length//可以查看历史中的页面数 

```

- document对象

```

document对象：实际上是window对象的属性，document == window.document为true，是唯一一个既属于BOM又属于DOM的对象
 
document.lastModified//获取最后一次修改页面的日期的字符串表示
 
document.referrer //用于跟踪用户从哪里链接过来的
 
document.title //获取当前页面的标题，可读写
 
document.URL //获取当前页面的URL，可读写
 
document.anchors[0]或document.anchors["anchName"]//访问页面中所有的锚
 
document.forms[0]或document.forms["formName"]//访问页面中所有的表单
 
document.images[0]或document.images["imgName"]// 访问页面中所有的图像
 
document.links [0]或document.links["linkName"]//访问页面中所有的链接
 
document.applets [0]或document.applets["appletName"]//访问页面中所有的Applet
 
document.embeds [0]或document.embeds["embedName"]//访问页面中所有的嵌入式对象
 
document.write(); 或document.writeln();//将字符串插入到调用它们的位置

```

- **location对象**

```

location对象：表示载入窗口的URL，也可用window.location引用它
 
location.href //当前载入页面的完整URL，如http://www.somewhere.com/pictures/index.htm
 
location.portocol //URL中使用的协议，即双斜杠之前的部分，如http
 
location.host //服务器的名字，如www.wrox.com
 
location.hostname //通常等于host，有时会省略前面的www
 
location.port //URL声明的请求的端口，默认情况下，大多数URL没有端口信息，如8080
 
location.pathname //URL中主机名后的部分，如/pictures/index.htm
 
location.search //执行GET请求的URL中的问号后的部分，又称查询字符串，如?param=xxxx
 
location.hash //如果URL包含#，返回该符号之后的内容，如#anchor1
 
location.assign("http:www.baidu.com");//同location.href，新地址都会被加到浏览器的历史栈中
 
location.replace("http:www.baidu.com");//同assign()，但新地址不会被加到浏览器的历史栈中，不能通过back和forward访问
 
location.reload(true|false);//重新载入当前页面，为false时从浏览器缓存中重载，为true时从服务器端重载，默认为false

```

- **navigator对象**

```

`navigator`对象：包含大量有关Web浏览器的信息，在检测浏览器及操作系统上非常有用，也可用window.navigator引用它
 
`navigator.appCodeName`//浏览器代码名的字符串表示
 
navigator.appName //官方浏览器名的字符串表示
 
navigator.appVersion//浏览器版本信息的字符串表示
 
navigator.cookieEnabled//如果启用cookie返回true，否则返回false
 
navigator.javaEnabled//如果启用java返回true，否则返回false
 
navigator.platform//浏览器所在计算机平台的字符串表示
 
navigator.plugins //安装在浏览器中的插件数组
 
navigator.taintEnabled//如果启用了数据污点返回true，否则返回false
 
navigator.userAgent//用户代理头的字符串表示 

```

- **screen对象**

```

screen对象：用于获取某些关于用户屏幕的信息，也可用window.screen引用它
 
screen.width/height //屏幕的宽度与高度，以像素计
 
screen.availWidth/availHeight//窗口可以使用的屏幕的宽度和高度，以像素计
 
screen.colorDepth //用户表示颜色的位数，大多数系统采用32位
 
window.moveTo(0, 0);
 
window.resizeTo(screen.availWidth, screen.availHeight);//填充用户的屏幕 

```


---

## 2. 页面重绘和回流以及优化

- **浏览器对页面的呈现的处理流程。**

![image](http://newimg88.b0.upaiyun.com/newimg88/2014/08/8_1.jpg)

1.  浏览器把获取到的HTML代码解析成1个DOM树，HTML中的每个tag都是DOM树中的1个节点，根节点就是我们常用的document对象。DOM树里包含了所有HTML标签，包括display:none隐藏，还有用JS动态添加的元素等。

2. 浏览器把所有样式(用户定义的CSS和用户代理)解析成样式结构体，在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉-moz开头的样式，而FF会去掉_开头的样式。

3. DOM Tree 和样式结构体组合后构建render tree, render tree类似于DOM tree，但区别很大，render tree能识别样式，render tree中每个NODE都有自己的style，而且 render tree不包含隐藏的节点 (比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。注意 visibility:hidden隐藏的元素还是会包含到 render tree中的，因为visibility:hidden 会影响布局(layout)，会占有空间。根据CSS2的标准，render tree中的每个节点都称为Box (Box dimensions)，理解页面元素为一个具有填充、边距、边框和位置的盒子。

4. 一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。

- **回流与重绘**
    1. 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为**回流(reflow)**。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为**重绘**。
    
    2. 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。
    
    3. 回流必将引起重绘，而重绘不一定会引起回流。

- **回流何时发生：当页面布局和几何属性改变时就需要回流**。

    1、添加或者删除可见的DOM元素；
    
    2、元素位置改变；
    
    3、元素尺寸改变——边距、填充、边框、宽度和高度
    
    4、内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
    
    5、页面渲染初始化；
    
    6、浏览器窗口尺寸改变——resize事件发生时；

    ```
    var s = document.body.style;
    s.padding = "2px"; // 回流+重绘
    s.border = "1px solid red"; // 再一次 回流+重绘
    s.color = "blue"; // 再一次重绘
    s.backgroundColor = "#ccc"; // 再一次 重绘
    s.fontSize = "14px"; // 再一次 回流+重绘
    // 添加node，再一次 回流+重绘
    document.body.appendChild(document.createTextNode('abc!'));
    ```
- **浏览器优化：**
    
    - 从上个实例代码中可以看到几行简单的JS代码就引起了6次左右的回流、重绘。而且我们也知道回流的花销也不小，如果每句JS操作都去回流重绘的话，浏览器可能就会受不了。所以很多浏览器都会优化这些操作，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。
    
    - 虽然有了浏览器的优化，但有时候我们写的一些代码可能会强制浏览器提前flush队列，这样浏览器的优化可能就起不到作用了。当你请求向浏览器请求一些 style信息的时候，就会让浏览器flush队列，比如：
        1. offsetTop, offsetLeft, offsetWidth, offsetHeight

        2. scrollTop/Left/Width/Height
        
        3. clientTop/Left/Width/Height
        
        4. width,height
        
        5. 请求了getComputedStyle(), 或者 IE的 currentStyle
    
    - 当你请求上面的一些属性的时候，浏览器为了给你最精确的值，需要flush队列，因为队列中可能会有影响到这些值的操作。即使你获取元素的布局和样式信息跟最近发生或改变的布局信息无关，浏览器都会强行刷新渲染队列。

- **如何减少回流、重绘**
    - 减少回流、重绘其实就是需要减少对render tree的操作（合并多次多DOM和样式的修改），并减少对一些style信息的请求，尽量利用好浏览器的优化策略。
    
        1. 直接改变className，如果动态改变样式，则使用cssText（考虑没有优化的浏览器）
        
        ```
        // 不好的写法
        var left = 1;
        var top = 1;
        el.style.left = left + "px";
        el.style.top = top + "px";// 比较好的写法
        el.className += " className1";
         
        // 比较好的写法
        el.style.cssText += "; 
        left: " + left + "px; 
        top: " + top + "px;";
        ```
        
        2. 让要操作的元素进行”离线处理”，处理完后一起更新
    
            1) 使用DocumentFragment进行缓存操作,引发一次回流和重绘；
            
            2) 使用display:none技术，只引发两次回流和重绘；
            
            3) 使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；
        
        3. 不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，利用缓存
        
        ```js
        // 别这样写，大哥
        for(循环) {
        el.style.left = el.offsetLeft + 5 + "px";
        el.style.top = el.offsetTop + 5 + "px";
        }
         
        // 这样写好点
        var left = el.offsetLeft,
        top = el.offsetTop,
        s = el.style; 
        for (循环) { 
        left += 10; 
        top += 10; 
        s.left = left + "px"; 
        s.top = top + "px"; 
        }
        ```
        
        4. 让元素脱离动画流，减少回流的Render Tree的规模
        
        ```js
        $("#block1").animate({left:50});
        $("#block2").animate({marginLeft:50});
        ```

## 3. href和src的区别你知道吗？

1. **请求资源类型不同**

（1）href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。

（2）在请求 src 资源时会将其指向的资源下载并应用到文档中，比如 JavaScript 脚本，img 图片；

2. **作用结果不同**

（1）href 用于在当前文档和引用资源之间确立联系；

（2）src 用于替换当前内容；

3. **浏览器解析方式不同**

（1）若在文档中添加 ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

（2）当浏览器解析到 ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

## 4. link和import的区别

（1）link是XHTML标签，除了能够加载CSS，还可以定义RSS等其他事务；而@import属于CSS范畴，只可以加载CSS。

（2）link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后再加载。

（3）link是XHTML标签，无兼容问题；@import则是在CSS2.1提出的，低版本的浏览器不支持。

（4）link支持使用Javascript控制DOM改变样式；而@import不支持。

## 5. html语义化标签的理解; 结构化的理解; 能否写出简洁的html结构; SEO优化

## 6. h5中新增的属性; 如自定义属性data, 类名className等, 新增表单元素, 拖拽Drag

## 7. h5中新增的API, 修改的API, 废弃的API 稍作了解 (离线存储, audio, video)


