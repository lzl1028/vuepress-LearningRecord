# H5 键盘兼容性

## 1. 键盘弹出的不同表现

- IOS：IOS 的键盘处在窗口的最上层，当键盘弹起时，webview 的高度 height 并没有改变，只是 scrollTop 发生变化，页面可以滚动。且页面可以滚动的最大限度为弹出的键盘的高度，而只有键盘弹出时页面恰好也滚动到最底部时，scrollTop 的变化值为键盘的高度，其他情况下则无法获取。这就导致在 IOS 情况下难以获取键盘的真实高度。

- Android: webview 中留出空间，该空间小于等于的键盘空间，变化的高度差会随着布局而不同，有的认为 ==键盘高度 + 页面高度 = 原页面高度；== 是错误的误导，只有在某种很巧合的布局情况下才可套用此公式。


## 2. 键盘收起的不同表现

- IOS：触发键盘上的按钮收起键盘或者输入框以外的页面区域时，输入框会失去焦点，因此会触发输入框的 blur 事件。

- Android: 触发键盘上的按钮收起键盘时，输入框并不会失去焦点，因此不会触发页面的 blur 事件；触发输入框以外的区域时，输入框会失去焦点，触发输入框的 blur 事件。


## 3. 监听键盘的弹出与收起

在 h5 中目前没有接口可以直接监听键盘事件，但我们可以通过分析键盘弹出、收起的触发过程及表现形式，来判断键盘是弹出还是收起的状态。

- 键盘弹出：输入框获取焦点时会自动触发键盘的弹起动作，因此，我们可以监听输入框的 focus 事件，在里面实现键盘弹出后所需的页面逻辑。这在 ios 及 android 中表现一致。

- 键盘收起：从第 2 部分可知，触发键盘收起的不同形式会存在差异化表现，当触发其他页面区域收起键盘时，我们可以监听输入框的 blur 事件，在里面实现键盘收起后所需的页面逻辑。而在通过键盘按钮收起键盘时在 ios 与 android 端存在差异化表现，下面具体分析：

    - IOS：触发了输入框 blur 事件，仍然通过该办法监听。
    
	- Android：没有触发输入框的 blur 事件。但通过第 1、2 部分我们可以知道，在 android 中，键盘的状态切换（弹出、收起）不仅和输入框关联，同时还会影响到 webview 高度的变化，那我们不妨通过监听 webview height 的变化来判断键盘是否收起。

下面举例说明，其中页面中含有一个输入框：

```js
<div class="txd"> 
	Welcome to TXD!  
</div>
<div class="input">
	<input id="input" type="tel" />
</div>
```

- ios & android 键盘弹出：

```js
const $input = document.getElementById('input');
$input.addEventListener('focus', () => {
	// 处理键盘弹出后所需的页面逻辑
}, false);
```

- ios 键盘收起：

```js
const $input = document.getElementById('input');
$input.addEventListener('blur', () => {
	// 处理键盘收起后所需的页面逻辑
}, false);
```

- android 键盘弹出与收起：

```js
/*键盘弹起后页面高度变小*/
const originHeight = document.documentElement.clientHeight || document.body.clientHeight;
window.addEventListener('resize', () => {
	const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
	if (resizeHeight < originHeight) {
		// 键盘弹起所后所需的页面逻辑
	} else {
		// 键盘弹起所后所需的页面逻辑
	}
}, false);
```
- 在实践中通过判断 userAgent 来决定使用哪种方法：
```
const ua = window.navigator.userAgent.toLocaleLowerCase();
const isIOS = /iphone|ipad|ipod/.test(ua);
const isAndroid = /android/.test(ua);、
```
## 4. 小结

1. 在 ios 中，无论何种布局，为了使输入框展示在可视区域中，键盘弹出时，页面会向上滚动，该过程与 Element.scrollIntoViewIfNeeded() 方法（将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域）产生的效果一致；且高度始终不变，页面可滚动。
2. 在 android 中，键盘唤起后，页面可滚动与否由其处在正常文档流中的元素决定：如果正常文档流中的元素可全量展示，页面不可滚动，否则页面支持滚动；
3. 在 android 中，键盘唤起后，fixed 元素的基准会发生变化：根据 bottom 定位的元素，其基线变为键盘上部；根据 top 定位的元素，仍然根据页面顶部，因此为照顾正常文档流及 fixed 元素的用户体验，有的元素可根据顶部定位，有的可以根据底部定位。