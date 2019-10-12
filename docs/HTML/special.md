# 特殊标签

## 1. 加粗标签

- B标签：物理加粗，页面呈现加粗状态.

- Strong标签：不仅能加粗，还利于搜索引擎优化.
 

## 2. 滚动标签：marquee
- marquee:

属性| 描述               
---|---
direction | 滚动方向
behivior | 行为

- behivior

值 | 描述
---|---
alternate | 交替滚动
scroll | 滚动
slide | 滑落

## 3. 字体标签：Font

属性 | 描述
---|---
color | 颜色
size |  0~7
face | 字体


## 5. <base> 标签:为页面上的所有链接规定默认地址或默认目标。

- 通常情况下，浏览器会从当前文档的 URL 中提取相应的元素来填写相对 URL 中的空白。

```html
使用 <base> 标签可以改变这一点。
浏览器随后将不再使用当前文档的 URL，而使用指定的基本 URL 来解析所有的相对 URL。
这其中包括 <a>、<img>、<link>、<form> 标签中的 URL。
```

## 6. del 标签 与 ins 标签

- HTML的 del 标签表示一些被从文档中删除的文字内容。比如可以在需要显示修改记录或者源代码差异的情况使用这个标签。

```html
<p><del>这段文本已被删除。 </del>, 请浏览其它部分</p>
```

- HTML ins 元素定义已经被插入文档中的文本。

```html
<ins>这一段文本是新插入至文档的。</ins>
```

## 7. sub 标签 与 sup 标签

- HTML sub 元素定义了一个文本区域，出于排版的原因，与主要的文本相比，应该展示得更低并且更小。

```html
<!-- H₂O -->
<p>水的化学公式: H<sub>2</sub>O</p> 
```

- HTML sup 元素定义了一个文本区域，出于排版的原因，与主要的文本相比，</sup> 中的内容将会以当前文本流中字符高度的一半来显示。

```html
<!-- 2 + 3² = 11 -->
<p>2 + 3<sup>2</sup>= 11</p>
```

## 8.ruby 标签

- HTML ruby 元素 被用来展示东亚文字注音或字符注释。

```html
<ruby>
  曲 <rp>(</rp><rt>qu</rt><rp>)</rp>
  小 <rp>(</rp><rt>xiao</rt><rp>)</rp>
  强 <rp>(</rp><rt>qiang</rt><rp>)</rp>
</ruby>
```

## 9. bdo 标签

- 指定子元素的文本方向 ，显式地覆盖默认的文本方向。

- bdo 元素 ( HTML双向覆盖元素 )用于覆盖当前文本的朝向，它使得字符按给定的方向排列。

```html
<p>这段文本是从左到右的</p>
<p><bdo dir="rtl">这段文本是从右到左的</bdo></p>
```

## 10. track

- HTML track 元素 被当作媒体元素 audio 和 video 的子元素来使用。它允许指定计时字幕（或者基于时间的数据），例如自动处理字幕。

- track 给媒体元素添加的数据的类型在 kind 属性中设置，属性值可以是 subtitles, captions, descriptions, chapters 或 metadata。该元素指向当用户请求额外的数据时浏览器公开的包含定时文本的源文件。

```html
<!-- 一个media 元素的任意两个 track 子元素不能有相同的 kind, srclang, 和 label属性。 -->
<video controls width="250" src="xxx.mp4">
    <track default kind="captions"
       srclang="en"
       src="xxxxx.vtt"/>
Sorry, your browser doesn't support embedded videos.
</video>
```

## 11. optgroup: 定义选项组

- optgroup 元素用于组合选项。当您使用一个长的选项列表时，对相关的选项进行组合会使处理更加容易。

```html
<select>
    <optgroup label="Group 1">
      <option>Option 1.1</option>
    </optgroup> 
    <optgroup label="Group 2">
      <option>Option 2.1</option>
      <option>Option 2.2</option>
    </optgroup>
    <optgroup label="Group 3" disabled>
      <option>Option 3.1</option>
      <option>Option 3.2</option>
    </optgroup>
 </select>
```

## 12. output: IE不支持

- HTML output 标签是HTML 5 中的新标签，表示计算或用户操作的结果,执行计算然后在 output 元素中显示结果。

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="number" name="b" value="40" /> +
  <input type="number" name="a" value="10" /> =
  <output name="result"></output>
</form>
```

## 13. progress: IE9及以下不支持

- HTML中的progress (progress) 元素用来显示一项任务的完成进度.

```html
进度条：<progress value="70" max="100">70 %</progress> <br />
进度条：<progress></progress>
```

## 14. meter

- 同progress 相比 meter 元素来度量给定范围（gauge）内的数据：

```html 
<p>显示度量值：</p>
<meter value="3" min="0" max="10">3/10</meter><br>
<meter value="0.6">60%</meter>
```

## 15. details: IE不支持

- HTML details 元素可创建一个挂件，仅在被切换成展开状态时，它才会显示内含的信息。summary 元素可为该部件提供概要或者标签。

```html
<details>
  <summary>点击展开</summary>
  <p>世间万物，为我所用，非我所得。</p>
</details>
```



