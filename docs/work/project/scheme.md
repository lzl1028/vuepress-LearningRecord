# 项目中遇到的一些问题的解决方案

## 不借助后台和 JS ，只用 CSS 让一个列表编号倒序

1. HTML中的reversed 属性

```js
<ol reversed>
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>

/* 
3. C
2. B
1. A
*/
```

2. HTML中的value属性

```js
<ol>
  <li value="3">C</li>
  <li value="2">B</li>
  <li value="1">A</li>
</ol>
```

3. CSS 自定义的 counter()

    - 第三种方式就是使用CSS的 counter 计算器， 要倒序计数器的顺序，我们有两件事要做：将计数器重置为非0的值，并以负数递增计数器。

```js
<ol>
    <li>C</li>
    <li>B</li>
    <li>A</li>
</ol>
```
```CSS
ol {
  counter-reset: my-custom-counter 4;
  list-style: none;
}

ol li {
  counter-increment: my-custom-counter -1;
}

ol li::before {
  content: counter(my-custom-counter) ". ";
  color: #f23c50;
  font-size: 2.5rem;
  font-weight: bold;
}
```

- 如果我们不知道确切的列表数量，则可以将counter-reset属性移到HTML中：

```html
<ol style="counter-reset: my-custom-counter {{ items.length + 1 }}">
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>
```

```css
ol {
  list-style: none;
}

ol li {
  counter-increment: my-custom-counter -1;
}

ol li::before {
  content: counter(my-custom-counter) ". "
}
```