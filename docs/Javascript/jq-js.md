# jQuery-JavaScript一览表

```html
<ul>
  <li id="first">テキストテキストテキスト</li>
  <li id="second">テキストテキストテキスト</li>
  <li id="third">テキストテキストテキスト</li>
  <li id="fourth">テキストテキストテキスト</li>
</ul>

<ul>
  <li class="first">テキスト<strong>テキスト</strong>テキスト</li>
  <li class="second">テキスト<em>テキスト</em>テキスト</li>
  <li class="third">テキスト<span>テキスト</span>テキスト</li>
  <li class="fourth">テキストテキストテキスト</li>
</ul>

<ul>
  <li lang="en">テキストテキストテキスト</li>
  <li></li>
  <li><span>テキスト</span>テキスト<span>テキスト</span></li>
  <li></li>
</ul>

<dl>
  <dt>dt. テキストテキストテキスト</dt>
  <dd>dd. テキストテキストテキスト</dd>
  <dt>dt. テキストテキストテキスト</dt>
  <dd>dd. テキストテキストテキスト</dd>
  <dt>dt. テキストテキストテキスト</dt>
  <dd>dd. テキストテキストテキスト</dd>
</dl>

<dl>
  <dt>dt. テキストテキストテキスト</dt>
  <dd>dd. テキストテキストテキスト</dd>
  <dt>dt. テキストテキストテキスト</dt>
  <dd>dd. テキストテキストテキスト</dd>
  <dt>dt. テキストテキストテキスト</dt>
  <dd>dd. テキストテキストテキスト</dd>
</dl>
```

## 1. CSS选择器

### 元素选择

```js
// jQuery
$("li").css("color", "red");
// JavaScript
document.querySelectorAll('li').forEach(el => {
  el.style.color = 'red';
});
```

### ID选择

```js
// jQuery
$('li#first').css('color', 'red');
// JavaScript
document.querySelector('li#first').style.color = 'red';
```

### 类选择

```js
// jQuery
$('li.first').css('color', 'red');
// JavaScript
document.querySelectorAll('li.first').foreach(el => {
  el.style.color = 'red';
});
```

### 子元素选择

```js
// jQuery
$('.first strong').css('color', 'red');
// JavaScript
document.querySelectorAll('.first strong').forEach(el => {
  el.style.color = 'red';
});
```

### 通配符选择

```js
// jQuery
$('li *').css('color', 'red');
// JavaScript
document.querySelectorAll('li *').forEach(el => {
  el.style.color = 'red';
});
```

### 分组选择

```js
// jQuery
$('#first, #third').css('color', 'red');
// JavaScript
document.querySelectorAll('#first, #third').forEach(el => {
  el.style.color = 'red';
});
```

### 伪类选择

```js
// jQuery
$('li:first-child').css('color', 'red');
// JavaScript
document.querySelectorAll('li:first-child').forEach(el => {
  el.style.color = 'red';
});
```

### 匹配选择

```js
// jQuery
$('#second ~ li').css('color', 'red');
// JavaScript
document.querySelectorAll('#second ~ li').forEach(el => {
  el.style.color = 'red';
});
```

### 属性选择

```js
// jQuery
$('[id], [class="first"]').css('color', 'red');
// [attribute!="..."]                 -> 选择指定属性不等于这个值的元素
// [attribute^="..."]                 -> 选择指定属性是以给定字符串开始的元素
// [attribute$="..."]                 -> 选择指定属性是以给定字符串结尾的元素
// [attribute*="..."]                 -> 选择指定属性具有包含给定字符串的元素
// [attribute="..."][attribute="..."] -> 设置多个指定属性
// JavaScript
document.querySelectorAll('[id], [class="first"]').forEach(el => {
  el.style.color = 'red';
});
```

### jQuery自带选择

```js
// jQuery
$('li:first, li:last').css('color', 'red');
$('li:even, li:odd').css('color', 'red');
$('li:lt(2)').css('color', 'red');
$('li:eq(2)').css('color', 'red');
$('li:gt(2)').css('color', 'red');
$(':header').css('color', 'red');
$('li:contains("テキスト")').css('color', 'red');
$('li:has(strong)').css('color', 'red');
$('li:parent').css('color', 'red');
```

## 2. HTML/CSS操作

### 修改文本

```js
<p id="first">修改前</p>
// jQuery
$('p#first').text('Hello Rizu');
// JavaScript
document.querySelector('#first').textContent = 'Hello Rizu'
```

### 获取文本

```js
<p id="first">获取的字符串</p>
<p id="second">修改前</p>

// jQuery
$('p#second').text($('p#first').text());
// JavaScript
var text = document.querySelector('#first').textContent;
document.querySelector('#second').textContent = text ;
```

### 修改html

```js
<p id="first">修改前</p>

// jQuery
$('p#first').html('<strong>Hello Rizu</strong>');
// JavaScript
document.querySelector('#first').innerHTML = '<strong>Hello Rizu</strong>';
```

### 获取html

```js
<p id="first"><strong>获取的HTML</strong></p>
<p id="second">变更前</p>

// jQuery
$('p#second').html($('p#first').html());
// JavaScript
var html = document.querySelector('#first').innerHTML;
document.querySelector('#second').innerHTML = html;
```

### 向html元素中的头部、尾部插入

```js
<p id="first">Hello Rizu</p>

// jQuery
$('p#first').prepend('<strong>在头部插入</strong>');
$('p#first').append('<strong>在尾部插入</strong>');
// JavaScript
var target    = document.querySelector('#first');
var a         = document.createElement('strong');
a.textContent = '在头部插入';
var b         = document.createElement('strong');
b.textContent = '在尾部插入';
target.insertBefore(a, target.firstChild);
target.appendChild(b);
```

### 在html元素的前、后插入

```js
<p id="first">Hello Rizu</p>

// jQuery
$('p#first').before('<h1>前面插入</h1>');
$('p#first').after('<h1>后面插入</h1>');
// JavaScript
var before         = document.createElement('h1');
var after          = document.createElement('h1');
before.textContent = '前面插入';
after.textContent  = '后面插入';
var target         = document.querySelector('#first');
var parent         = target.parentNode;
parent.insertBefore(before, target);
parent.appendChild(after);
```

### 向html元素内的头部、尾部移动

```js
<p id="first">Hello Rizu</p>
<strong id="prepend">向头部移动</strong>
<strong id="append">向尾部移动</strong>

// jQuery
$('strong#prepend').prependTo('p');
$('strong#append').appendTo('p');
// JavaScript
var prepend = document.querySelector('#prepend');
var append  = document.querySelector('#append');
var target  = document.querySelector('#first');
target.insertBefore(prepend, target.firstChild);
target.appendChild(append);
```

### 在html元素的前、后移动

```js
<strong id="after">向后移动</strong>
<p id="first">Hello Rizu</p>
<strong id="before">向前移动</strong>

// jQuery
$('strong#before').insertBefore('p');
$('strong#after').insertAfter('p');
// JavaScript
var before = document.querySelector('#before');
var after  = document.querySelector('#after');
var target = document.querySelector('#first');
var parent = target.parentNode;
parent.insertBefore(before, target);
parent.appendChild(after);
```

### 使用指定元素包裹各元素

```js
<p id="first">Hello Rizu</p>
<p id="second">Hello yrq</p>

// jQuery
$('p').wrap('<h1></h1>');
// JavaScript
var target = document.querySelector('#first');
var parent = target.parentNode;
document.querySelectorAll('p').forEach((value, index) => {
  var wrap       = document.createElement('h1');
  wrap.innerHTML = value.outerHTML;
  if (index === 0) { parent.innerHTML = '';}
  parent.appendChild(wrap);
});
```

### 将所有元素包裹在一个元素中

```js
<div>
  <p id="first">Hello Rizu</p>
  <p id="second">Hello yrq</p>
</div>

// jQuery
$('p').wrapAll('<h1></h1>');
// JavaScript
var target       = document.querySelector('div');
var p            = target.innerHTML;
var h1           = document.createElement('h1');
h1.innerHTML     = p;
target.innerHTML = '';
target.innerHTML = h1.outerHTML;
```

### 使用指定元素包裹各元素的子元素

```js
<div>
  <p id="first">Hello Rizu</p>
  <p id="second">Hello yrq</p>
</div>

// jQuery
$('p').wrapInner('<strong></strong');
// JavaScript
var p = document.querySelectorAll('p');
p.forEach((value, index) => {
  var target         = value.textContent;
  var strong         = document.createElement('strong');
  strong.textContent = target;
  p[index].innerHTML = strong.outerHTML;
});
```

### 去除父元素

```js
<strong><p id="first">Hello Rizu</p></strong>

// jQuery
$('p').unwrap();
// JavaScript
var target      = document.querySelector('#first');
var parent      = target.parentNode;
var grand       = parent.parentNode;
grand.innerHTML = target.outerHTML;
```

### 使用其他元素替换指定元素

```js
<p id="first">Hello Rizu</p>

// jQuery
$('p').replaceWith('<h1>替换后</h1>');
// JavaScript
document.querySelector('#first').outerHTML = '<h1>替换后</h1>';
```

### 删除元素

```js
<p id="first"><strong>删除的元素</strong>Hello Rizu</p>

// jQuery
$('p strong').remove();
// JavaScript
var target = document.querySelector('#first');
var nest   = document.querySelector('#first strong');
target.removeChild(nest);
```

### 获取与修改属性值

```js
<a href="http://yrq110.me/">blog</a>

// jQuery
$('a').attr('href', "http://developer.mozilla.org ");
$('a').text($('a').attr('href'));
// JavaScript
document.querySelector('a').setAttribute('href', "http://developer.mozilla.org ");
var target         = document.querySelector('a');
target.textContent = target.getAttribute('href');
```

### 删除属性值

```js
<a href="http://yrq110.me/" target="_blank">blog</a>

// jQuery
$('a').removeAttr('target');
// JavaScript
document.querySelector('a').removeAttribute('target');
```

### class值的添加与删除

```js
<p>Hello Rizu</p>

// jQuery
$('p').addClass('red');
$('p').removeClass('red');
// JavaScript
var target = document.querySelector('p');
target.classList.add('red');
target.classList.remove('red');
```

### 设置多个CSS属性值(CSS in JS)

```js
<p>Hello Rizu</p>

// jQuery
$('p').css({
  'color': 'red',
  'border': '1px solid black'
});
// JavaScript
document.querySelector('p').style.color  = 'red';
document.querySelector('p').style.border = '1px solid black';
```

### 点击事件

```js
<p>Hello Rizu</p>

// jQuery
$('p').click(function() {
  $(this).css('color', 'red');
});
// JavaScript
document.addEventListener('click', () => {
  document.querySelector('p').style.color = 'red';
}, false);
```