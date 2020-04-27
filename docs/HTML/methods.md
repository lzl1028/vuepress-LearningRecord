# 常用HTML元素方法

## 1.table 的方法

- 原始的 table 元素（时至今日仍然是网站布局方法里的第一名）本身自带许多精巧的方法，使用这些方法创建表格就像搭建宜家里的桌子一样简单。
- 实用方法：

```js
const tableEl = document.querySelector('table');
<!--插入thead-->
const headRow = tableEl.createHead().insertRow();
headerRow.insertCell().textContent = 'Make';
headerRow.insertCell().textContent = 'Model';
headerRow.insertCell().textContent = 'Color';

<!--插入tbody-->
const newRow = tableEl.insertRow();
newRow.insertCell().textContent = 'Yes';
newRow.insertCell().textContent = 'No';
newRow.insertCell().textContent = 'Thank you';
```

## 2.scrollIntoView()

- 当页面的 URL 中包含 #something 元素时，一旦页面加载，浏览器就会自动滚动至具有这个 ID 的元素之处。
这确实是一项很贴心的功能，但如果你在页面加载之后再渲染元素，这项功能就不起作用了。

- 也可以通过以下方式，手动地让这项功能重新生效：

```js
document.querySelector(document.location.hash).scrollIntoView();
```

## 3.hidden

- 只需调用 myElement.hidden = true ，即可实现元素隐藏的功能。


## 4.toggle()

- toggle 也不算是元素的方法，它实际上是元素属性上的一个方法。严格来说，这是一种为元素添加或删除某个 class 的方法，具体做法是 myElement.classList.toggle('some-class') 。

- 如果你曾经通过 if 条件语句为元素添加 class，那就应该赶紧改用这种做法。正确的方式是为 toggle 方法传入第二个参数，如果该参数返回 true ，则指定的 class 就会添加至元素上。

```js
el.classList.toggle('some-orange-class', theme === 'orange');
```

## 5.querySelector()

- 该方法可以使用在任意元素上。

- 打个比方，myElement.querySelector('.my-class') 的作用是返回在 myElement 的子代中包含 my-class 这个 class 的所有元素。


## 6.closest

- 该方法可在任意元素上使用，它能够向上查找元素的树型结构，可以理解为 与 querySelector() 相反的方法。因此，我可以通过以下方法获取当前内容的对应标头：

- 这段方法首先向上找到最近的==article==元素，然后再向下找到最近的h1元素。

```js
myElement.closest('article').querySelector('h1');
```

## 7.getBoundingClientRect()

- 在对 DOM 元素调用该方法时，将返回一个包含其空间结构详细信息的简单对象。

```css
{
  x: 604.875,
  y: 1312,
  width: 701.625,
  height: 31,
  top: 1312,
  right: 1306.5,
  bottom: 1343,
  left: 604.875
}
```

- 在调用该方法时需要注意两点：
    1. 调用该方法会导致元素的重绘，根据设备与页面复杂程度的不同，重绘的时间可能会占用几毫秒。因此，如果你需要重复地调用该方法，例如在使用动画的场景下，需要特别注意这一点。
    2. 并非所有的浏览器都会返回这些值，他们有这个责任么？

## 8.matches()
 
- 假设我需要检查某个元素是否包括一个特定的 class。

```js
if (myElement.className.indexOf('some-class') > -1) {
  // do something
}
```

- 最佳方式：

```js
if (myElement.matches('.some-class')) {
  // do something
}
```

## 9.insertAdjacentElement()

- 它的作用类似于 appendChild() ，但能够更好地控制插入子元素的具体位置。

- parentEl.insertAdjacentElement('beforeend', newEl) 与 parentEl.appendChild(newEl) 的作用是一样的，但除此之外，你还可以指定 beforebegin、afterbegin 或 afterend 这几个参数值，元素将按这些值的名称所示插入相应的位置。

## 10.contains()

- 需要知道某个元素是否被包含在另一个元素中？打个比方，假设我在处理一个鼠标点击事件时，需要知道它是发生在一个模态窗口中还是发生在外面（这样我才能够关闭这个窗口），我大概会这么做：

```js
const handleClick = e => {
  if (!modalEl.contains(e.target)) modalEl.hidden = true;
};
```
- 代码中的 modalEl 是模态窗口的引用，而 e.target 则代表各种发生点击事件的元素。


## 11.getAttribute()

- 对象的属性 property 通常也会映射到它的特性 attribute 中（我在上文中特别用粗体强调了这一点，注意不是斜体）？

- 但在某一个场景中，这种假设并不成立，这就是某个元素的 href 特性，例如:
```js
<a href="/animals/cat">Cat</a> 
```

- 调用 el.href 不会返回 /animals/cat，这可能与你的猜测不符。

- 原因在于 元素实现了 HTMLHyperlinkElementUtils 接口，该接口提供了一系列辅助属性，例如 prototol 与 hash 等等，以展现与链接的目标相关的值。

- href 就是其中一个实用的属性，它将返回完整的 URL，并去掉无用的空格，而不是返回在特性中所指定的相对 URL。
- 如果你需要获取 href 特性中的字符串字面值，就只能使用 el.getAttribute('href') 方法了。


## 12.dialog 元素的三大法宝

- dialog 是一个相对较新的元素，它带来了两个还算能用的方法，和一个非常棒的方法。其中 show() 和 close() 方法的功能与你所想象的一样

- 而 showModal() 方法能够将 dialog 元素显示在页面的顶层，居中对齐，这正是所期望的模态窗口行为。你无需指定 z-index，或者手动添加一个灰色的背景，也不需要监听 esc 按键以关闭此窗口。浏览器能够理解模态窗口的工作方式，并自动完成你所期望的行为。

## 13.forEach()

- 某些情况下，当你获取到一个元素列表的引用时，可以通过 forEach() 方法进行迭代式调用。

- 假设你需要记录页面中所有链接的 URL，可以输入以下代码，只要你不介意看到报错。
```js
document.getElementsByTagName('a').forEach(el ==> {
  console.log(el.href);
});
```
或
```js
document.querySelectorAll('a').forEach(el ==> {
  console.log(el.href);
});
```
- 问题出在 getElementsByTagName 与其他类似的 get... 方法返回的是一个 HTMLCollection 接口，而 querySelectorAll 返回的是一个 NodeList 接口。
- 而 NodeList 接口为我们提供了 forEach() 方法（此外还包括 keys()、values()，和 entries() 等方法 ）。
- 理想的情况下，最好是每个方法都只返回简单的数组，而不是返回一些类似数组的对象。不过别担心，ECMA 大神为我们提供了 Array.from() 方法，它能够把所有这些类数组对象转化为一个真正的数组。
- 所以，这样的代码就能够正常工作：
```js
Array.from(document.getElementsByTagName('a')).forEach(el ==> {
  console.log(el.href);
});
```
- 创建了一个数组之后，你就能够对其使用 map() 、filter() 和 reduce() 以及其他各种数组方法了。
```js
Array.from(document.querySelectorAll('a'))
  .map(el => el.origin)
  .filter(origin => origin !== document.origin)
  .filter(Boolean);
```

## 14. 表单

- form 有一个 submit() 方法。但或许你不知道表单还有一个 reset() 方法，而且当你需要对表单元素进行验证时，还可以调用 reportValidity() 方法。

- 你也可以通过对表单的 elements 属性加上元素的 name 特性 的方式调用它的属性。
- 假设你有三个单选按钮，每个都有相同的名称 animal
    - 那么 formEl.elements.animal 将返回一个单选按钮集的引用（一个控件，三个元素）。
    - 而 formEl.elements.animal.value 将返回所选中的单选按钮的值。
- 让我们来分解一下看看：
    - formEl 是一个元素。
    - elements 则对应 HTMLFormControlsCollection 接口，这并非一个真正的数组，其中的每一项内容也未必代表一个 HTML 元素。
    - animal 是多个单选按钮的集合，只是因为他们具有相同的 name 特性才聚集在一起（RadioNodeList 接口就是为此而生的），而 value 则返回该集合中所选中的那个单选按钮的 value 特性。

## 15.select()

- .select() 方法会将你指定的元素中的所有内容全选。


