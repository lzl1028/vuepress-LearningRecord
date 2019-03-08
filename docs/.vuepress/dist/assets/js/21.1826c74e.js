(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{188:function(s,n,a){"use strict";a.r(n);var t=a(0),r=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"笛卡尔心型曲线"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#笛卡尔心型曲线","aria-hidden":"true"}},[s._v("#")]),s._v(" 笛卡尔心型曲线")]),s._v(" "),a("h2",{attrs:{id:"_1-canvas-平面直角坐标系画法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-canvas-平面直角坐标系画法","aria-hidden":"true"}},[s._v("#")]),s._v(" 1. canvas:平面直角坐标系画法")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('<!doctype html>\n<html lang="en">\n <head>\n  <meta charset="UTF-8">\n </head>\n <body>\n    <canvas width="400" height="400"></canvas>\n\n    <script>\n        var canvas = document.querySelector(\'canvas\');\n        var context = canvas.getContext(\'2d\');  \n        context.lineWidth = 3;\n        // 将画布的原点（0,0），移动到(200,200)\n        // 移动原点是为了能让整个心形显示出来\n        context.translate(200,200); \n\n        // t 代表弧度\n        var t=0;\n        // maxt 代表 t 的最大值\n        var maxt = 2*Math.PI;\n        // vt 代表 t 的增量\n        var vt = 0.01;\n        // 需要循环的次数\n        var maxi = Math.ceil(maxt/vt);\n        // 保存所有点的坐标的数组\n        var pointArr=[];\n        // x 用来暂时保存每次循环得到的 x 坐标\n        var x=0;\n        // y 用来暂时保存每次循环得到的 y 坐标\n        var y=0;\n\n        // 根据方程得到所有点的坐标\n        for(var i=0;i<=maxi;i++){\n            // x=a*(2*sin(t)+sin(2*t))\n            x=50*(2*Math.sin(t)+Math.sin(2*t));\n\n            // y=a*(2*cos(t)+cos(2*t))\n            y=50*(2*Math.cos(t)+Math.cos(2*t));\n            t+=vt;\n            pointArr.push([x,y]); \n        }\n\n        // 根据点的坐标，画出心形线\n\t\tcontext.moveTo(pointArr[0][0],pointArr[0][1]);\n        draw();\n        function draw(){\n             context.fillStyle=\'#c00\';\n             // 把每个点连接起来\n            for(var i=1;i<pointArr.length;i++){\n                x = pointArr[i][0];\n                y = pointArr[i][1];\n                context.lineTo(x,y);\n            }\n            context.fill();\n        }\n    <\/script>\n </body>\n</html>\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br")])]),a("h2",{attrs:{id:"_2-平面直角坐标系-画法-（空心心形）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-平面直角坐标系-画法-（空心心形）","aria-hidden":"true"}},[s._v("#")]),s._v(" 2. 平面直角坐标系 画法 （空心心形）")]),s._v(" "),a("ul",[a("li",[s._v("只需要改改 draw( ) 函数就好，把原来的 fill( ) 方法，改为 stroke( ) 方法，并且把 strokeStyle 设置了颜色就行了。")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("function draw(){\n     //context.fillStyle='#c00';\n     context.strokeStyle='#c00';\n     // 把每个点连接起来\n    for(var i=1;i<pointArr.length;i++){\n        x = pointArr[i][0];\n        y = pointArr[i][1];\n        context.lineTo(x,y);\n    }\n     //context.fill();\n     context.stroke();\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("h2",{attrs:{id:"_3-极坐标系画法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-极坐标系画法","aria-hidden":"true"}},[s._v("#")]),s._v(" 3. 极坐标系画法")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("根据极坐标方程 r=a(1+sinθ) ，得到 r ，以 r 作为半径，根据 r 连续的去画圆弧，画完一圈后，心形就出来了。")])]),s._v(" "),a("li",[a("p",[s._v("心形线 极坐标方程：\nr=a(1+sinθ)")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('\n<!doctype html>\n<html lang="en">\n\n<head>\n  <meta charset="UTF-8">\n</head>\n\n<body>\n  <canvas width="400" height="400"></canvas>\n\n  <script>\n     var canvas = document.querySelector(\'canvas\');\n     var context = canvas.getContext(\'2d\');\n     // 将画布的原点（0,0），移动到(200,100)\n     // 移动原点是为了能让整个心形显示出来\n     context.translate(200, 100);\n\n     // 画心形\n     draw();\n     function draw() {\n      // 画圆弧时，圆的半径\n      var r = 0;\n     //  start 代表画弧线时的 起始角\n      var start = 0;\n      //  end 代表画弧线时的 结束角\n      var end = 0;\n      //  一个常数，用来控制心形的大小\n      var a = 100;\n\n      context.fillStyle = \'#e21f27\';\n      //连续的画圆弧\n      for (var q = 0; q < 500; q++) {\n         start += Math.PI * 2 / 500;\n         // 当 结束角 是 Math.PI * 2 时也就是已经画了一圈了,心形就出来了\n         end = start + Math.PI * 2 / 500;\n         // 根据极坐标方程 r=a(1+sinθ)，得到 r（半径）\n         r = a * (1 + Math.sin(start)); \n         // 画弧线\n         context.arc(0, 0, r, start, end, false);\n      }\n      context.fill();\n    }\n  <\/script>\n</body>\n</html>\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/6/10/163e9325cdb7c727?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('<!doctype html>\n<html lang="en">\n <head>\n  <meta charset="UTF-8">\n </head>\n <body>\n    <canvas width="400" height="400"></canvas>\n\n\t<script>\n\t\tvar canvas = document.querySelector(\'canvas\');\n\t\tvar context = canvas.getContext(\'2d\');  \n\t\tcontext.lineWidth = 3;\n\t\t// 将画布的原点（0,0），移动到(200,200)\n\t\t// 移动原点是为了能让整个心形显示出来\n\t\tcontext.translate(200,200); \n\n\t\t// t 代表弧度\n\t\tvar t=0;\n\t\t// vt 代表 t 的增量\n\t\tvar vt = 0.01;\n\t\t// maxt 代表 t 的最大值\n\t\tvar maxt = 2*Math.PI;\n\t\t// 需要循环的次数\n\t\tvar maxi = Math.ceil(maxt/vt);\n\t\t// 保存所有点的坐标的数组\n\t\tvar pointArr=[];\n\t\t// 控制心形大小\n\t\tvar size = 10;\n\t\t// x 用来暂时保存每次循环得到的 x 坐标\n\t\tvar x=0;\n\t\t// y 用来暂时保存每次循环得到的 y 坐标\n\t\tvar y=0;\n\n\t\t// 根据方程得到所有点的坐标\n\t\tfor(var i=0;i<=maxi;i++){\n\t\t\t// x=16 * (sin(t)) ^ 3;\n\t\t\tvar x = 16 * Math.pow(Math.sin(t),3);\n\t\t\t// y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)\n\t\t\tvar y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) -2 * Math.cos(3 * t)- Math.cos(4 * t);\n\t\t\tt+=vt;\n\t\t\tpointArr.push([x*size,-y*size]); \n\t\t}\n\n\t\t// 根据点的坐标，画出心形线\n\t\tcontext.moveTo(pointArr[0][0],pointArr[0][1]);\n\t\tdraw();\n\t\tfunction draw(){\n\t\t\tcontext.fillStyle=\'#c00\';\n\t\t\t// 把每个点连接起来\n\t\t\tfor(var i=1;i<pointArr.length;i++){\n\t\t\t\tx = pointArr[i][0];\n\t\t\t\ty = pointArr[i][1];\n\t\t\t\tcontext.lineTo(x,y);\n\t\t\t}\n\t\t\tcontext.fill();\n\t\t}\n\t<\/script>\n </body>\n</html>\n\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/6/10/163e93273209968d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"image"}})]),s._v(" "),a("h2",{attrs:{id:"_4-极坐标系-画法-（空心心形）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-极坐标系-画法-（空心心形）","aria-hidden":"true"}},[s._v("#")]),s._v(" 4. 极坐标系 画法  （空心心形）")]),s._v(" "),a("ul",[a("li",[s._v("用极坐标系 画法，画空心心形，也是一样的需要改改 draw( )  函数，把原来的  fill( )  方法，改为 stroke( ) 方法，并且把 strokeStyle  设置了颜色就行了。")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("function draw() {\n  var r = 0;\n  var start = 0;\n  var end = 0;\n  var a = 100;\n\n  //context.fillStyle = '#e21f27';\n  context.strokeStyle = '#e21f27';\n  for (var i = 0; i < 500; i++) {\n    start += Math.PI * 2 / 500;\n    end = start + Math.PI * 2 / 500;\n    r = a * (1 + Math.sin(start)); \n    context.arc(0, 0, r, start, end, false);\n  }\n  //context.fill();\n  // 改用 stroke() 方法\n  context.stroke();   \n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])])])}],!1,null,null,null);n.default=r.exports}}]);