(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{201:function(s,e,n){"use strict";n.r(e);var r=n(0),i=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"promise"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#promise","aria-hidden":"true"}},[s._v("#")]),s._v(" Promise")]),s._v(" "),n("h2",{attrs:{id:"一、-promise概念"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、-promise概念","aria-hidden":"true"}},[s._v("#")]),s._v(" 一、 Promise概念")]),s._v(" "),n("ul",[n("li",[n("p",[s._v("Promise是一个包含三种状态的对象（pending、fulfilled、rejected），可以链式的处理异步请求（then方法）并能很好地处理异常问题， 是解决回调地狱的良好方案之一。")])]),s._v(" "),n("li",[n("p",[s._v("Promise 中文翻译为“承诺”， 是 JavaScript 的一种对象，表示承诺终将返回一个结果，无论成功还是失败。")])]),s._v(" "),n("li",[n("p",[s._v("Promise 有三个状态：等待中（pending），完成（fullfilled），失败（rejected）, Promise 的设计具有原子性，状态一旦从 pending 状态转换为 fullfilled 状态或者 rejected 状态后，将不能被改变。")])])]),s._v(" "),n("p",[n("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/2/24/1691e84dc7850464?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('var promise1 = new Promise((resolve, reject) => {\n    console.log("Promise 构造器会立即执行");\n    setTimeout(function (){\n        if(true) {\n            resolve("完成");\n        } else {\n            reject("失败");\n        }\n    }, 1000);\n})\npromise1\n.then((result) => {\n    // do something\n    console.log(result);\n    return 1\n    \n    // return Promise.resolve(1);  // 返回一个决议为成功的 promise 实例\n    // return Promise.reject("error");  // 返回一个决议为拒绝的 Promise 实例\n})\n.then((result) => {\n    // .then() 方法会返回一个 promise, 完成调用的参数为前一个 promise 的返回值或者决议值。\n    // do other things\n    console.log(result);\n    throw new Error("错误")  // 抛出错误是隐式拒绝\n})\n.catch((error) => {\n    // 捕捉错误\n    console.log(error)\n})\n.then(() => {\n    // 还能继续执行！\n})\n.finally(() => {\n    // always do somethings\n    console.log("finally!")\n})\n\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br")])]),n("h2",{attrs:{id:"二、promise-的优势"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、promise-的优势","aria-hidden":"true"}},[s._v("#")]),s._v(" 二、Promise 的优势")]),s._v(" "),n("ol",[n("li",[n("p",[s._v("链式调用")]),s._v(" "),n("ul",[n("li",[s._v("Promise 使用 then 方法后还会返回一个新的 Promise 对象，便于我们传递状态数据，同时链式写法接近于同步写法，更符合线性思维。")])])]),s._v(" "),n("li",[n("p",[s._v("错误捕捉")]),s._v(" "),n("ul",[n("li",[s._v("相比回调函数的错误无法在外部捕捉的问题，Promise 能够为一连串的异步调用提供错误处理。")])])]),s._v(" "),n("li",[n("p",[s._v("控制反转再反转")]),s._v(" "),n("ul",[n("li",[s._v("由于第三方提供的异步函数，无法保证回调函数如何被执行，但是 Promise 的特点，能够保证异步函数只能被 resolve 一次，以及始终以异步的形式执行代码。")])])]),s._v(" "),n("li",[n("p",[s._v("可以利用 Promise.all 和 Promise.race 来解决 Promise 始终未决议和并行 Promise 嵌套的问题")])])]),s._v(" "),n("h2",{attrs:{id:"三、promise-的不足"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、promise-的不足","aria-hidden":"true"}},[s._v("#")]),s._v(" 三、Promise 的不足")]),s._v(" "),n("ul",[n("li",[n("p",[s._v("每个 .then() 都是一个独立的作用域")]),s._v(" "),n("ul",[n("li",[s._v("加入有很多个 .then() 方法，就会创建很多个独立的作用域，那么将只能通过外面包裹一层函数作用域的闭包来共享状态数据")])])]),s._v(" "),n("li",[n("p",[s._v("无法取消单个 .then()")]),s._v(" "),n("ul",[n("li",[s._v("当 Promise 链中任意一个 .then() 方法中有语句执行错误后，尽管经过 catch 方法的错误处理，还是并不会中断整个 Promise 链的执行。")])])]),s._v(" "),n("li",[n("p",[s._v("无法得知进度")]),s._v(" "),n("ul",[n("li",[s._v("由于 Promise 只能从 pending 到 fullfilled 或 rejected 状态，无法得知 pending 阶段的进度。")])])])])])}],!1,null,null,null);e.default=i.exports}}]);