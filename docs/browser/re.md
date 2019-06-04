# 浏览器的回流和重绘

- 回流必将引起重绘，重绘不一定会引起回流。

## 1. 回流 (Reflow)

- 当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

- 会导致回流的操作：

    - 页面首次渲染
    - 浏览器窗口大小发生改变
    
    - 元素尺寸或位置发生改变
    - 元素内容变化（文字数量或图片大小等等）
    - 元素字体大小变化
    - 添加或者删除可见的DOM元素
    - 激活CSS伪类（例如：:hover）
    - 查询某些属性或调用某些方法

- 一些常用且会导致回流的属性和方法：

    - clientWidth、clientHeight、clientTop、clientLeft
    
    - offsetWidth、offsetHeight、offsetTop、offsetLeft
    - scrollWidth、scrollHeight、scrollTop、scrollLeft
    - scrollIntoView()、scrollIntoViewIfNeeded()
    - getComputedStyle()
    - getBoundingClientRect()
    - scrollTo()

## 2. 重绘 (Repaint)

- 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

- 当你访问以下属性或方法时，浏览器会立刻清空队列：

    - clientWidth、clientHeight、clientTop、clientLeft
    
    - offsetWidth、offsetHeight、offsetTop、offsetLeft
    
    - scrollWidth、scrollHeight、scrollTop、scrollLeft
    
    - width、height
    
    - getComputedStyle()
    
    - getBoundingClientRect()




































