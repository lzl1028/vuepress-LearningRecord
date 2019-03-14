(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{187:function(s,a,t){"use strict";t.r(a);var n=t(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"css居中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css居中","aria-hidden":"true"}},[s._v("#")]),s._v(" CSS居中")]),s._v(" "),t("h2",{attrs:{id:"水平居中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#水平居中","aria-hidden":"true"}},[s._v("#")]),s._v(" 水平居中")]),s._v(" "),t("h3",{attrs:{id:"_1-使用inline-block-text-align"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用inline-block-text-align","aria-hidden":"true"}},[s._v("#")]),s._v(" 1. 使用inline-block+text-align")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。")])]),s._v(" "),t("li",[t("p",[s._v("用法：对子框设置display:inline-block，对父框设置text-align:center。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div class="parent">\n    <div class="child>DEMO</div>\n</div>\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".child{\n    display:inline-block;\n}\n.parent{\n    text-align:center;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h3",{attrs:{id:"_2-使用table-margin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-使用table-margin","aria-hidden":"true"}},[s._v("#")]),s._v(" 2. 使用table+margin")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：先将子框设置为块级表格来显示（类似 table），再设置子框居中以达到水平居中。")])]),s._v(" "),t("li",[t("p",[s._v("用法：对子框设置display:table，再设置margin:0 auto。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div class="parent">\n    <div class="child>DEMO</div>\n</div>\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".child {\n    display:table;\n    margin:0 auto;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"_3-使用absolute-transform"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用absolute-transform","aria-hidden":"true"}},[s._v("#")]),s._v(" 3. 使用absolute+transform")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：将子框设置为绝对定位，移动子框，使子框左侧距离相对框左侧边框的距离为相对框宽度的一半，再通过向左移动子框的一半宽度以达到水平居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。")])]),s._v(" "),t("li",[t("p",[s._v("用法：对父框设置position:relative，对子框设置position:absolute，left:50%，transform:translateX(-50%)。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div class="parent">\n    <div class="child>DEMO</div>\n</div>\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    position:relative;\n}\n.child {\n    position:absolute;\n    left:50%;\n    transform:translateX(-50%);\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h3",{attrs:{id:"_4-使用flex-justify-content"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用flex-justify-content","aria-hidden":"true"}},[s._v("#")]),s._v(" 4. 使用flex+justify-content")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。")])]),s._v(" "),t("li",[t("p",[s._v("用法：先将父框设置为display:flex，再设置justify-content:center。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div class="parent">\n    <div class="child>DEMO</div>\n</div>\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    display:flex;\n    justify-content:center;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"_5-使用flex-margin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-使用flex-margin","aria-hidden":"true"}},[s._v("#")]),s._v(" 5. 使用flex+margin")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：通过CSS3中的布局利器flex将子框转换为flex item，再设置子框居中以达到居中。")])]),s._v(" "),t("li",[t("p",[s._v("用法：先将父框设置为display:flex，再设置子框margin:0 auto。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div class="parent">\n    <div class="child>DEMO</div>\n</div>\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    display:flex;\n}\n.child {\n    margin:0 auto;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h2",{attrs:{id:"垂直居中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#垂直居中","aria-hidden":"true"}},[s._v("#")]),s._v(" 垂直居中")]),s._v(" "),t("h3",{attrs:{id:"_1-采用伪元素实现垂直居中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-采用伪元素实现垂直居中","aria-hidden":"true"}},[s._v("#")]),s._v(" 1. 采用伪元素实现垂直居中")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("通过在父元素上添加一个高度 100%、vertical-align: middle的伪元素实现垂直居中")])]),s._v(" "),t("li",[t("p",[s._v("原理：利用content: ''; height: 100% 得到一个宽度为 0 的伪元素，即它不会显示出来；高度 100%，所以它最高，是所在行的基准元素；利用 vertical-align: middle 将父元素的基线设置为伪元素的中线，然后其他行内元素采用中线对齐时，自然就是要对齐伪元素的中线了。而伪元素的高度为 100%，所以它的中线就是整个父元素的中线，这就实现了其他行内元素的垂直居中。")])])]),s._v(" "),t("div",{staticClass:"language-html line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-html"}},[t("code",[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("parent"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("child"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("child"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language-css line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-css"}},[t("code",[t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".parent")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 300px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("height")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 300px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("border")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1px solid red"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("text-align")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" center"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".child")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" blue"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 100px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("height")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 40px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("vertical-align")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" middle"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".parent::before")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("content")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("height")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 100%"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v("vertical-align")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" middle"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("            \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br")])]),t("h3",{attrs:{id:"_2-使用table-cell-vertical-align"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-使用table-cell-vertical-align","aria-hidden":"true"}},[s._v("#")]),s._v(" 2. 使用table-cell+vertical-align")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：通过将父框转化为一个表格单元格显示（类似 td 和 th），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。")])]),s._v(" "),t("li",[t("p",[s._v("用法：先将父框设置为display:table-cell，再设置vertical-align:middle。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div class="parent">\n    <div class="child>DEMO</div>\n</div>\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    display:table-cell;\n    vertical-align:middle;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"_3-使用absolute-transform-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用absolute-transform-2","aria-hidden":"true"}},[s._v("#")]),s._v(" 3. 使用absolute+transform")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：类似于水平居中时的absolute+transform原理。将子框设置为绝对定位，移动子框，使子框上边距离相对框上边边框的距离为相对框高度的一半，再通过向上移动子框的一半高度以达到垂直居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。")])]),s._v(" "),t("li",[t("p",[s._v("用法：先将父框设置为position:relative，再设置子框position:absolute，top:50%，transform:translateY(-50%)。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    position:relative;\n}\n.child {\n    position:absolute;\n    top:50%;\n    transform:translateY(-50%);\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h3",{attrs:{id:"_4-使用flex-align-items"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用flex-align-items","aria-hidden":"true"}},[s._v("#")]),s._v(" 4. 使用flex+align-items")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("原理：通过设置CSS3中的布局利器flex中的属性align-times，使子框垂直居中。")])]),s._v(" "),t("li",[t("p",[s._v("用法：先将父框设置为position:flex，再设置align-items:center。")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    position:flex;\n    align-items:center;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h2",{attrs:{id:"水平垂直居中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#水平垂直居中","aria-hidden":"true"}},[s._v("#")]),s._v(" 水平垂直居中")]),s._v(" "),t("h3",{attrs:{id:"_1-使用inline-block-text-align-table-cell-vertical-align"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用inline-block-text-align-table-cell-vertical-align","aria-hidden":"true"}},[s._v("#")]),s._v(" 1. 使用inline-block+text-align+table-cell+vertical-align")]),s._v(" "),t("ul",[t("li",[s._v("原理：使用inline-block+text-align水平居中，再用table-cell+vertical-align垂直居中，将二者结合起来。。")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    text-align:center;\n    display:table-cell;\n    vertical-align:middle;\n}\n.child {\n    display:inline-block;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h3",{attrs:{id:"_2-使用absolute-transform"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-使用absolute-transform","aria-hidden":"true"}},[s._v("#")]),s._v(" 2. 使用absolute+transform")]),s._v(" "),t("ul",[t("li",[s._v("原理：将水平居中时的absolute+transform和垂直居中时的absolute+transform相结合。")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    position:relative;\n}\n.child {\n    position:absolute;\n    left:50%;\n    top:50%;\n    transform:tranplate(-50%,-50%);\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("h3",{attrs:{id:"_3-使用flex-justify-content-align-items"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用flex-justify-content-align-items","aria-hidden":"true"}},[s._v("#")]),s._v(" 3. 使用flex+justify-content+align-items")]),s._v(" "),t("ul",[t("li",[s._v("原理：通过设置CSS3布局利器flex中的justify-content和align-items，从而达到水平垂直居中。")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".parent {\n    display:flex;\n    justify-content:center;\n    align-items:center;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])])])}],!1,null,null,null);a.default=e.exports}}]);