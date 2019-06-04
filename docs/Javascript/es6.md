# ES6总结

## 第1节：ES6的开发环境搭建
1. 建立工程目录：
- 先建立一个项目的工程目录，并在目录下边建立两个文件夹：src和dist

    - src：书写ES6代码的文件夹，写的js程序都放在这里。
    - dist：利用Babel编译成的ES5代码的文件夹，在HTML页面需要引入的时这里的js文件。
2. 编写index.html：
- 文件夹建立好后，我们新建一个index.html文件。


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="./dist/index.js"></script>
    </head>
    <body>
        Hello ECMA Script 6
    </body>
</html>
```

3. 编写index.js
- 在src目录下，新建index.js文件。这个文件很简单，我们只作一个a变量的声明，并用console.log()打印出来。

4. 初始化项目
- 在安装Babel之前，需要用npm init先初始化我们的项目。打开终端或者通过cmd打开命令行工具，进入项目目录，输入下边的命令：


```
npm i -y
```

4. 全局安装Babel-cli
```
npm install -g babel-cli
```

5. 本地安装babel-preset-es2015 和 babel-cli

```
npm install --save-dev babel-preset-es2015 babel-cli
```

6. 新建.babelrc
- 在根目录下新建.babelrc文件，并打开录入下面的代码

```
{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}
```
- 这个文件我们建立完成后，现在可以在终端输入的转换命令了，这次ES6成功转化为ES5的语法。


```
babel src/index.js -o dist/index.js
```

## 第2节：新的声明方式
1. var声明：
- var在ES6里是用来声明全局变量的，我们可以先作一个最简单的实例，用var声明一个变量a,然后用console.log进行输出。

2. let局部声明
- 通过两个简单的例子，我们对var的全局声明有了一定了解。那跟var向对应的是let，它是局部变量声明。let是局部变量声明，let声明只在区块内起作用，外部是不可以调用的。

3. const声明常量
- 在程序开发中，有些变量是希望声明后在业务层就不再发生变化了，简单来说就是从声明开始，这个变量始终不变，就需要用const进行声明。


## 第3节：变量的解构赋值
1. 数组的解构赋值：
- 简单的数组解构：

- 以前，为变量赋值，我们只能直接指定值。比如下面的代码：

```
let a=0;
let b=1;
let c=2;
```
- 而现在我们可以用数组解构的方式来进行赋值。


```
let [a,b,c]=[1,2,3];
```
2. 数组模式和赋值模式统一：

- 可以简单的理解为等号左边和等号右边的形式要统一，如果不统一解构将失败。

```
let [a,[b,c],d]=[1,[2,3],4];
```
- 如果等号两边形式不一样，很可能获得undefined或者直接报错。

3. 解构的默认值：

- 解构赋值是允许你使用默认值的，先看一个最简单的默认是的例子。



```
let [foo = true] =[];
console.log(foo); //控制台打印出true
```
- 需要注意的是undefined和null的区别。

```js
let [a,b="JSPang"]=['技术胖',undefined];
console.log(a+b); //控制台显示“技术胖JSPang”

//undefined相当于什么都没有，b是默认值。

let [a,b="JSPang"]=['技术胖',null];
console.log(a+b); //控制台显示“技术胖null”
```

4. 对象的解构赋值
- 解构不仅可以用于数组，还可以用于对象。
```
let {foo,bar} = {foo:'JSPang',bar:'技术胖'};
console.log(foo+bar); //控制台打印出了“JSPang技术胖”
```
- 注意：对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

- 圆括号的使用：如果在解构之前就定义了变量，这时候你再解构会出现问题。下面是错误的代码，编译会报错。



```
let foo;
{foo} ={foo:'JSPang'};
console.log(foo);
```
- 要解决报错，使程序正常，我们这时候只要在解构的语句外边加一个圆括号就可以了。



```
let foo;
({foo} ={foo:'JSPang'});
console.log(foo); //控制台输出jspang
```

5. 字符串解构
- 字符串也可以解构，这是因为，此时字符串被转换成了一个类似数组的对象。

```
const [a,b,c,d,e,f]="JSPang";
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
```


## 第4节：扩展运算符和rest运算符
- 它们可以很好的为我们解决参数和对象数组未知情况下的编程，让我们的代码更健壮和简洁。

1. 对象扩展运算符（…）：
- 当编写一个方法时，我们允许它传入的参数是不确定的。这时候可以使用对象扩展运算符来作参数，看一个简单的列子：

```js
function jspang(...arg){
    console.log(arg[0]);
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);
 
}
jspang(1,2,3);
<!--这时我们看到控制台输出了 1,2,3，undefined，这说明是可以传入多个值，并且就算方法中引用多了也不会报错。-->
```

2. 扩展运算符的用处：

- 我们先用一个例子说明，我们声明两个数组arr1和arr2，然后我们把arr1赋值给arr2，然后我们改变arr2的值，你会发现arr1的值也改变了，因为我们这是对内存堆栈的引用，而不是真正的赋值。

```js
let arr1=['www','jspang','com'];
let arr2=arr1;
console.log(arr2);
arr2.push('shengHongYu');
console.log(arr1);

<!--控制台输出：-->
["www", "jspang", "com"]
["www", "jspang", "com", "shengHongYu"]
```

- 这是我们不想看到的，可以利用对象扩展运算符简单的解决这个问题，现在我们对代码进行改造。

```js
let arr1=['www','jspang','com'];
//let arr2=arr1;
let arr2=[...arr1];
console.log(arr2);
arr2.push('shengHongYu');
console.log(arr2);
console.log(arr1);

<!--现在控制台预览时，你可以看到我们的arr1并没有改变，简单的扩展运算符就解决了这个问题。-->
["www", "jspang", "com"]
["www", "jspang", "com", "shengHongYu"]
["www", "jspang", "com"]
```

3. rest运算符

- 如果你已经很好的掌握了对象扩展运算符，那么理解rest运算符并不困难，它们有很多相似之处，甚至很多时候你不用特意去区分。它也用…（三个点）来表示，我们先来看一个例子。

```js
function jspang(first,...arg){
    console.log(arg.length);
}

jspang(0,1,2,3,4,5,6,7);

<!--这时候控制台打印出了7，说明我们arg里有7个数组元素，这就是rest运算符的最简单用法。-->
```
- 如何循环输出rest运算符

```js
function jspang(first,...arg){
    for(let val of arg){
        console.log(val);
    }
}

jspang(0,1,2,3,4,5,6,7);
```

- for…of的循环可以避免我们开拓内存空间，增加代码运行效率，所以建议大家在以后的工作中使用for…of循环。有的小伙伴会说了，反正最后要转换成ES5，没有什么差别，但是至少从代码量上我们少打了一些单词，这就是开发效率的提高。

## 第5节：字符串模版
1. 字符串模版

- 先来看一个在ES5下我们的字符串拼接案例:

```js
let jspang='技术胖';
let blog = '非常高兴你能看到这篇文章，我是你的老朋友'+jspang+'。这节课我们学习字符串模版。';
document.write(blog);
```
- ES5下必须用+jspang+这样的形式进行拼接，这样很麻烦而且很容易出错。ES6新增了字符串模版，可以很好的解决这个问题。字符串模版不再使用‘xxx’这样的单引号，而是换成了xxx这种形式，也叫连接号。这时我们再引用jspang变量就需要用${jspang}这种形式了，我们对上边的代码进行改造。

```js
let jspang='技术胖';
let blog = `非常高兴你能看到这篇文章，我是你的老朋友${jspang}。这节课我们学习字符串模版。`;
document.write(blog);
```
- 可以看到浏览器出现了和上边代码一样的结果。而且这里边支持html标签，可以试着输入一些。

```js
let jspang='技术胖';
let blog = `<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${jspang}。<br/>这节课我们学习字符串模版。`;
document.write(blog);
```

2. 字符串查找

- ES6还增加了字符串的查找功能，而且支持中文哦，小伙伴是不是很兴奋。还是拿上边的文字作例子，进行操作。

- 查找是否存在:先来看一下ES5的写法，其实这种方法并不实用，给我们的索引位置，我们自己还要确定位置。

```js
let jspang='技术胖';
let blog = '非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。';
document.write(blog.indexOf(jspang));
<!--这是网页中输出了20，我们还要自己判断。-->
```

- ES6直接用includes就可以判断，不再返回索引值，这样的结果我们更喜欢，更直接。

```js
let jspang='技术胖';
let blog = '非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。';
document.write(blog.includes(jspang));
```

- 判断开头是否存在：

```
blog.startsWith(jspang);
```

- 判断结尾是否存在：

```
blog.endsWith(jspang);
```
- 需要注意的是：starts和ends 后边都要加s，我开始时经常写错，希望小伙伴们不要采坑。

3. 复制字符串

- 我们有时候是需要字符串重复的，比如分隔符和特殊符号，这时候复制字符串就派上用场了，语法很简单。

```
document.write('jspang|'.repeat(3));
```

## 第6节：ES6数字操作
1. 二进制和八进制

    - 二进制声明：二进制的英文单词是Binary,二进制的开始是0（零），然后第二个位置是b（注意这里大小写都可以实现），然后跟上二进制的值就可以了。
        
        ```js
        let binary = 0B010101;
        console.log(binary);
        <!--这时候浏览器的控制台显示出了21。-->
        ```
    - 八进制声明：八进制的英文单词是Octal，也是以0（零）开始的，然后第二个位置是O（欧），然后跟上八进制的值就可以了。
        
        ```js
        let b=0o666;
        console.log(b);
        <!--这时候浏览器的控制台显示出了438。-->
        ```
2. 数字判断和转换

    - 数字验证Number.isFinite( xx ):可以使用Number.isFinite( )来进行数字验证，只要是数字，不论是浮点型还是整形都会返回true，其他时候会返回false。
    
        ```
        let a= 11/4;
        console.log(Number.isFinite(a));//true
        console.log(Number.isFinite('jspang'));//false
        console.log(Number.isFinite(NaN));//false
        console.log(Number.isFinite(undefined));//false
        ```
    - NaN验证:NaN是特殊的非数字，可以使用Number.isNaN()来进行验证。下边的代码控制台返回了true。

        ```
        console.log(Number.isNaN(NaN));
        ```
    
    - 判断是否为整数Number.isInteger(xx)

        ```
        let a=123.1;
        console.log(Number.isInteger(a)); //false
        ```
   
    - 整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)

        ```
        let a='9.18';
        console.log(Number.parseInt(a)); 
        console.log(Number.parseFloat(a));
        ```

3. 整数取值范围操作

    - 整数的操作是有一个取值范围的，它的取值范围就是2的53次方。我们先用程序来看一下这个数字是什么.
        ```
        let a = Math.pow(2,53)-1;
        console.log(a); //9007199254740991
        ```
    - 最大安全整数:在我们计算时会经常超出这个值，所以我们要进行判断，ES6提供了一个常数，叫做最大安全整数，以后就不需要我们计算了。
        ```
        console.log(Number.MAX_SAFE_INTEGER);
        ```
    - 最小安全整数
        ```
        console.log(Number.MIN_SAFE_INTEGER);
        ```
    - 安全整数判断isSafeInteger( )
        ```
        let a= Math.pow(2,53)-1;
        console.log(Number.isSafeInteger(a));//false
        ```

## 第7节：ES6中新增的数组知识（1）
1. JSON数组格式转换
    - JSON的数组格式就是为了前端快速的把JSON转换成数组的一种格式，我们先来看一下JSON的数组格式怎么写。
        ```
        let  json = {
            '0': 'jspang',
            '1': '技术胖',
            '2': '大胖逼逼叨',
            length:3
        }
        ```
    - 这就是一个标准的JSON数组格式，跟普通的JSON对比是在最后多了一个length属性。只要是这种特殊的json格式都可以轻松使用ES6的语法转变成数组。在ES6中绝大部分的Array操作都存在于Array对象里。我们就用Array.from(xxx)来进行转换。我们把上边的JSON代码转换成数组，并打印在控制台。

        ```
        let  json = {
            '0': 'jspang',
            '1': '技术胖',
            '2': '大胖逼逼叨',
            length:3
        }
         
        let arr=Array.from(json);
        console.log(arr)
        ```
2. Array.of()方法：

    - 它负责把一堆文本或者变量转换成数组。在开发中我们经常拿到了一个类似数组的字符串，需要使用eval来进行转换，如果你一个老手程序员都知道eval的效率是很低的，它会拖慢我们的程序。这时候我们就可以使用Array.of方法。我们看下边的代码把一堆数字转换成数组并打印在控制台上：
        
        ```
        let arr =Array.of(3,4,5,6);
        console.log(arr);
        ```
    - 当然它不仅可以转换数字，字符串也是可以转换的，看下边的代码：

        ```
        let arr =Array.of('技术胖','jspang','大胖逼逼叨');
        console.log(arr);
        ```
3. find( )实例方法:

    - 所谓的实例方法就是并不是以Array对象开始的，而是必须有一个已经存在的数组，然后使用的方法，这就是实例方法（不理解请看下边的代码，再和上边的代码进行比对，你会有所顿悟）。这里的find方法是从数组中查找。在find方法中我们需要传入一个匿名函数，函数需要传入三个参数：
        1. value：表示当前查找的值。
        2. index：表示当前查找的数组索引。
        3. arr：表示当前数组。
    
    - 在函数中如果找到符合条件的数组元素就进行return，并停止查找。你可以拷贝下边的代码进行测试，就会知道find作用。

        ```js
        let arr=[1,2,3,4,5,6,7,8,9];
        console.log(arr.find(function(value,index,arr){
            return value > 5;
        }))
        //控制台输出了6，说明找到了符合条件的值，并进行返回了，如果找不到会显示undefined。
        ```

## 第8节：ES6中新增的数组知识（2）
1. fill( )实例方法：

    - fill()也是一个实例方法，它的作用是把数组进行填充，它接收三个参数，
        - 第一个参数是填充的变量，
        - 第二个是开始填充的位置，
        - 第三个是填充到的位置。

        ```
        let arr=[0,1,2,3,4,5,6,7,8,9];
        arr.fill('jspang',2,5);
        console.log(arr);
        <!--上边的代码是把数组从第二位到第五位用jspang进行填充。-->
        ```
2. 数组的遍历

    - for…of循环：这种形式比ES5的for循环要简单而且高效。先来看一个最简单的for…of循环。
        
        ```
        let arr=['jspang','技术胖','大胖逼逼叨']
         
        for (let item of arr){
            console.log(item);
        }
        ```
    - for…of数组索引:有时候开发中是需要数组的索引的，那我们可以使用下面的代码输出数组索引。
        
        ```
        let arr=['jspang','技术胖','大胖逼逼叨']
        for (let index of arr.keys()){
            console.log(index);
        }
        <!--可以看到这时的控制台就输出了0,1,2，也就是数组的索引。-->
        ```
    - 同时输出数组的内容和索引：我们用entries()这个实例方法，配合我们的for…of循环就可以同时输出内容和索引了。

        ```
        let arr=['jspang','技术胖','大胖逼逼叨']
        for (let [index,val] of arr.entries()){
            console.log(index+':'+val);
        }
        ```
3. entries( )实例方法：

    - entries()实例方式生成的是Iterator形式的数组，那这种形式的好处就是可以让我们在需要时用next()手动跳转到下一个值。我们来看下面的代码：
        
        ```
        let arr=['jspang','技术胖','大胖逼逼叨']
        let list=arr.entries();
        console.log(list.next().value);
        console.log(list.next().value);
        console.log(list.next().value);
        ```


## 第9节：ES6中的箭头函数和扩展
1. 默认值

    - 在ES6中给我们增加了默认值的操作，我们修改上边的代码，可以看到现在只需要传递一个参数也是可以正常运行的。

        ```
        function add(a,b=1){
            return a+b;
        }
        console.log(add(1));
        ```
    
    - 主动抛出错误
        - 在使用Vue的框架中，可以经常看到框架主动抛出一些错误，比如v-for必须有:key值。那尤大神是如何做到的那？其实很简单，ES6中我们直接用throw new Error( xxxx ),就可以抛出错误。
            ```	
            function add(a,b=1){
               
                if(a == 0){
                    throw new Error('This is error')
                }
                 return a+b;
            }
             
            console.log(add(0));
            ```
2. 函数中的严谨模式

    - 我们在ES中就经常使用严谨模式来进行编程，但是必须写在代码最上边，相当于全局使用。在ES6中我们可以写在函数体中，相当于针对函数来使用。
        ```
        function add(a,b=1){
            'use strict'
            if(a == 0){
                throw new Error('This is error');
            }
             return a+b;
        }
         
        console.log(add(1));
        ```
    - 上边的代码如果运行的话，你会发现浏览器控制台报错，这是ES6中的一个坑，如果没人指导的话，可能你会陷进去一会。这个错误的原因就是如果你使用了默认值，再使用严谨模式的话，就会有冲突，所以我们要取消默认值的操作，这时候你在运行就正常了。
        ```	
        function add(a,b){
            'use strict'
            if(a == 0){
                throw new Error('This is error');
            }
             return a+b;
        }
         
        console.log(add(1,2));
        ```
3. 获得需要传递的参数个数

    - 如果你在使用别人的框架时，不知道别人的函数需要传递几个参数怎么办？ES6为我们提供了得到参数的方法(xxx.length).我们用上边的代码看一下需要传递的参数个数。
        ```
        function add(a,b){
            'use strict'
            if(a == 0){
                throw new Error('This is error');
            }
             return a+b;
        }
         
        console.log(add.length);
        ```
    - 这时控制台打印出了2，但是如果我们去掉严谨模式，并给第二个参数加上默认值的话，这时候add.length的值就变成了1， 也就是说它得到的是必须传入的参数。

4. 箭头函数

    - 在学习Vue的时候，我已经大量的使用了箭头函数，因为箭头函数真的很好用，我们来看一个最简单的箭头函数。也就是上边我们写的add函数，进行一个改变，写成箭头函数。
        ```
        var add =(a,b=1) => a+b;
        console.log(add(1));
        ``` 
    - {}的使用
        - 在箭头函数中，方法体内如果是两句话，那就需要在方法体外边加上{}括号。例如下边的代码就必须使用{}.
        ```
        var add =(a,b=1) => {
            console.log('jspang')
            return a+b;
        };
        console.log(add(1));
        ```
    - 箭头函数中不可加new，也就是说箭头函数不能当构造函数进行使用。

## 第10节：ES6中的函数和数组补漏
1. 对象的函数解构

    - 我们在前后端分离时，后端经常返回来JSON格式的数据，前端的美好愿望是直接把这个JSON格式数据当作参数，传递到函数内部进行处理。ES6就为我们提供了这样的解构赋值。

        ```
        let json = {
            a:'jspang',
            b:'技术胖'
        }
        function fun({a,b='jspang'}){
            console.log(a,b);
        }
        fun(json)
        ```
2. 数组的函数解构

    - 函数能解构JSON，那解构我们的数组就更不在话下了，我们看下边的代码。我们声明一个数组，然后写一个方法，最后用…进行解构赋值。

        ```
        let arr = ['jspang','技术胖','免费教程'];
        function fun(a,b,c){
            console.log(a,b,c);
        }
         
        fun(...arr);
        ```
3. in的用法

- in是用来判断对象或者数组中是否存在某个值的。我们先来看一下用in如何判断对象里是否有某个值。
    
    1. 对象判断

        ```
        let obj={
            a:'jspang',
            b:'技术胖'
        }
        console.log('a' in obj);  //true
        ```
    
    2. 数组判断
        - 先来看一下ES5判断的弊端，以前会使用length属性进行判断，为0表示没有数组元素。但是这并不准确，或者说真实开发中有弊端。

        ```
        let arr=[,,,,,];
        console.log(arr.length); //5
        ```
        - 上边的代码输出了5，但是数组中其实全是空值，这就是一个坑啊。那用ES6的in就可以解决这个问题。

        ```
        let arr=[,,,,,];
        console.log(0 in arr); //false
         
        let arr1=['jspang','技术胖'];
        console.log(0 in arr1);  // true
        
        <!--注意：这里的0指的是数组下标位置是否为空。-->
        ```

4. 数组的遍历方法

    1. forEach

        ```
        let arr=['jspang','技术胖','前端教程'];
         
        arr.forEach((val,index)=>console.log(index,val));
        ```
        
        - forEach循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。当是有时候也会给我们帮倒忙。
    
    2. filter
        ```
        let arr=['jspang','技术胖','前端教程'];
         
        arr.filter(x=>console.log(x));
        ```
        - 这种方法在Vue实战里我讲过，他其实也有循环的功能，这里我们在复习一遍。

    3. some

        ```
        let arr=['jspang','技术胖','前端教程'];
         
        arr.some(x=>console.log(x));
        ```

    4. map

        ```
        let arr=['jspang','技术胖','前端教程'];
         
        console.log(arr.map(x=>'web'));
        <!--map在这里起到一个替换的作用-->
        ```

5. 数组转换字符串

- 在开发中我们经常会碰到把数组输出成字符串的形式，我们今天学两种方法，你要注意两种方法的区别。
    
    1. join()方法

    ```
    let arr=['jspang','技术胖','前端教程'];
     
    console.log(arr.join('|'));
    <!--join()方法就是在数组元素中间，加了一些间隔，开发中很有用处。-->
    ```
    2. toString()方法

        ```
        let arr=['jspang','技术胖','前端教程'];
         
        console.log(arr.toString());
        
        <!--转换时只是是用逗号隔开了。-->
        ```
    
## 第11节：ES6中对象

1. 对象赋值

    - ES6允许把声明的变量直接赋值给对象，我们看下面的例子。
        ```
        let name="jspang";
        let skill= 'web';
        var obj= {name,skill};
        console.log(obj);  //Object {name: "jspang", skill: "web"}
        ```


2. 对象Key值构建

    - 有时候我们会在后台取出key值，而不是我们前台定义好的，这时候我们如何构建我们的key值那。比如我们在后台取了一个key值，然后可以用[ ] 的形式，进行对象的构建。

        ```
        let key='skill';
        var obj={
            [key]:'web'
        }
        console.log(obj.skill);
        ```

3. Object.is(  ) 对象比较

    - 对象的比较方法,以前进行对象值的比较，经常使用===来判断，比如下面的代码：

        ```
        var obj1 = {name:'jspang'};
        var obj2 = {name:'jspang'};
        console.log(obj1.name === obj2.name);//true
        ```
    
    - 那ES6为我们提供了is方法进行对比。

        ```
        var obj1 = {name:'jspang'};
        var obj2 = {name:'jspang'};
        console.log(obj1.name === obj2.name);//true
        console.log(Object.is(obj1.name,obj2.name)); //true
        ```
    
    - 区分=== 和 is方法的区别是什么，看下面的代码输出结果。

        ```
        console.log(+0 === -0);  //true
        console.log(NaN === NaN ); //false
        console.log(Object.is(+0,-0)); //false
        console.log(Object.is(NaN,NaN)); //true
        ```
    
    - 这太诡异了，我要怎么记忆，那技术胖在这里告诉你一个小妙招，===为同值相等，is()为严格相等。

4. Object.assign(  )合并对象

    - 操作数组时我们经常使用数组合并，那对象也有合并方法，那就是assgin(  )。看一下啊具体的用法。

        ```
        var a={a:'jspang'};
        var b={b:'技术胖'};
        var c={c:'web'};
         
        let d=Object.assign(a,b,c)
        console.log(d);
        ```

## 第12节：Symbol在对象中的作用

1. 声明Symbol

    - 我们先来回顾一下我们的数据类型，在最后在看看Symbol如何声明，并进行一个数据类型的判断。

        ```
        var a = new String;
        var b = new Number;
        var c = new Boolean;
        var d = new Array;
        var e = new Object; 
        var f= Symbol();
        console.log(typeof(d));
        ```

2. Symbol的打印

    - 我们先声明一个Symbol，然后我们在控制台输出一下。

        ```
        var g = Symbol('jspang');
        console.log(g);
        console.log(g.toString());
        ```
    
    - 这时候我们仔细看控制台是有区别的，没有toString的是红字，toString的是黑字。

3. Symbol在对象中的应用

    - 看一下如何用Symbol构建对象的Key，并调用和赋值。

        ```
        var jspang = Symbol();
        var obj={
            [jspang]:'技术胖'
        }
        console.log(obj[jspang]);
        obj[jspang]='web';
        console.log(obj[jspang]);
        ```


4. Symbol对象元素的保护作用

    - 在对象中有很多值，但是循环输出时，并不希望全部输出，那我们就可以使用Symbol进行保护。
    
    - 没有进行保护的写法：
        
        ```
        var obj={name:'jspang',skill:'web',age:18};
         
        for (let item in obj){
            console.log(obj[item]);
        }
        ```
    - 现在我不想别人知道我的年龄，这时候我就可以使用Symbol来进行循环保护。

        ```
        let obj={name:'jspang',skill:'web'};
        let age=Symbol();
        obj[age]=18;
        for (let item in obj){
            console.log(obj[item]);
        } 
        console.log(obj);
        ```
        
5. Symbol产生的原因：
    - 添加向后兼容的新的内核特性：JavaScript 开发者和 ECMAScript 委员会（TC39）需要一种可以添加新的对象属性的方式，而不打破已有的方法，比如循环中的 for 或者 Object.keys 。
    - 避免命名冲突：他们内部创建了唯一值，可以让你创建添加属性而不用担心命名冲突。
    - 通过“众所周知（Well-known）” 的 Symbols 允许钩子（hooks）调用到内核方法

6. Symbols 具有唯一性
    
```
const mySymbol1 = Symbol('some text');
const mySymbol2 = Symbol('some text');
mySymbol1 == mySymbol2 // false
```
7. 使用 “Symbol.for” 方法，Symbols 表现的像单例模式

```
var mySymbol1 = Symbol.for('some key'); 
//creates a new symbol
var mySymbol2 = Symbol.for('some key');
// **returns the same symbol
mySymbol1 == mySymbol2 //true
```
- 使用 .for 的实际运用就是在一个地方创建一个 Symbol ，然后在其他地方访问相同的 Symbol 。

8. Symbols 可以是一个对象属性键

- 使用 Symbols 的主要方式——作为对象属性

```
const mySymbol = Symbol('some car description');
const myObject = {name: 'bmw'};
myObject[mySymbol] = 'this is a car';
```
9. 因为点操作符只能用于字符串属性，在这你不能使用点操作符，因此你应该使用括号操作符。

```
let mycar = {name: 'BMW'};
let type = Symbol('store car type');
mycar[type] = 'A_luxury_Sedan';
let honk = Symbol('store honk function');
mycar[myfunction] = () => 'honk';

mycar.type;// error
mycar[type]; //store car type

mycar.honk();// error
mycar[honk]();// 'honk'

```

10. Symbol的特性：
- 对于循环和其他的方法来说，Symbols 是不可见的。Object.keys 和 Object.getOwnPropertyNames 方法忽略了 Symbols 的特性名称。
- Symbol 是唯一的
    - 假设你想要一个叫做 Array.prototype.includes 的全局 Array 对象。它将与 JavaScript（ES2018）开箱即用的 includes 方法冲突。你该如何添加它才能不冲突呢？

    - 首先，用 Symbol 创建一个名为 includes 变量，给它分配一个 Symbol 。然后使用括号表示法添加此变量（现在是一个 Symbol ）到全局 Array 中。分配任何一个你想要的功能。
    
    - 最后使用括号表示法调用这个函数。但是请注意，你必须在括号里传递真实的 Symbol 而不是一个字符串，类似于：arr[includes] ()；
    
    ```js
    var includes = Symbol('will store custom includes method');
    <!--Add it to the Global Array.prototype-->
    Array.prototype[includes] = () => console.log('inside includes func');
    
    // Usage
    var arr = [1,2,3];
    
    // ES2018 includes method
    arr.includes(1);// true
    arr['includes'](1);// true
    
    // The following calls the custom includes  method
    arr[includes]();// 'inside includes func';here includes is a symbol
    ```



    


## 第13节：Set和WeakSet数据结构

1. Set的声明

```
let setArr = new Set(['jspang','技术胖','web','jspang']);
console.log(setArr);//Set {"jspang", "技术胖", "web"}
```
- Set和Array 的区别是Set不允许内部有重复的值，如果有只显示一个，相当于去重。虽然Set很像数组，但是他不是数组。

2. Set值的增删查

    - 追加add：在使用Array的时候，可以用push进行追加值，那Set稍有不同，它用更语义化的add进行追加。

        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        console.log(setArr);//Set {"jspang", "技术胖", "web"}
         
        setArr.add('前端职场');
        console.log(setArr);
        ```
    
    - 删除delete：

        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        console.log(setArr);//Set {"jspang", "技术胖", "web"}
         
        setArr.add('前端职场');
        console.log(setArr); //Set {"jspang", "技术胖", "web", "前端职场"}
         
        setArr.delete('前端职场');
        console.log(setArr); //Set {"jspang", "技术胖", "web"}
        ```
    
    - 查找has：用has进行值的查找，返回的是true或者false。

        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        console.log(setArr);//Set {"jspang", "技术胖", "web"}
         
        console.log(setArr.has('jspang'));//true
        ```
    
    - 删除clear:

        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        console.log(setArr);//Set {"jspang", "技术胖", "web"}
        setArr.clear();
         
        console.log(setArray);//true
        ```


3. set的循环

    - for…of…循环：
        
        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        for (let item of setArr){
            console.log(item);
        }
        ```
    - size属性: size属性可以获得Set值的数量。

        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        for (let item of setArr){
            console.log(item);
        }
         
        console.log(setArr.size);
        ```
    
    - forEach循环
        
        ```
        let setArr = new Set(['jspang','技术胖','web','jspang']);
        setArr.forEach((value)=>console.log(value));
        ```


4. WeakSet的声明
```
let weakObj=new WeakSet();
let obj={a:'jspang',b:'技术胖'}
weakObj.add(obj);
 
console.log(weakObj);
```

- 这里需要注意的是，如果你直接在new 的时候就放入值，将报错。

- WeakSet里边的值也是不允许重复的，我们来测试一下。

```js
let weakObj=new WeakSet();
let obj={a:'jspang',b:'技术胖'}
let obj1=obj;
 
weakObj.add(obj);
weakObj.add(obj1);
 
console.log(weakObj);
```

## 第14节：map数据结构
1. Json和map格式的对比

    - map的效率和灵活性更好
    
    - 先来写一个JSON，这里我们用对象进行模拟操作。

        ```
        let json = {
            name:'jspang',
            skill:'web'
        }
        console.log(json.name);
        ```
    
    - 但是这种反应的速度要低于数组和map结构。而且Map的灵活性要更好，你可以把它看成一种特殊的键值对，但你的key可以设置成数组，值也可以设置成字符串，让它不规律对应起来。

        ```
        let json = {
            name:'jspang',
            skill:'web'
        }
        console.log(json.name);
         
        var map=new Map();
        map.set(json,'iam');
        console.log(map);
        ```
    
    - 当然也可key字符串，value是对象。我们调换一下位置，依然是符合map的数据结构规范的。

        ```
        map.set('jspang',json);
        console.log(map);
        ```

 
2. map的增删查

    - 取值get: 现在取json对应的值。
        
        ```
        console.log(map.get(json));
        ```
    - 删除delete: 删除delete的特定值

        ```
        map.delete(json);
        console.log(map)
        ```
    
    - size属性

        ```
        console.log(map.size);
        ```
    
    - 查找是否存在has

        ```
        console.log(map.has('jspang'))
        ```
    
    - 清楚所有元素clear

        ```
        map.clear()
        ```

## 第15节：用Proxy进行预处理

1. 声明Proxy

    - 我们用new的方法对Proxy进行声明。可以看一下声明Proxy的基本形式。

        ```js
        new Proxy（{},{}）;
        ```
    
    - 需要注意的是这里是两个花括号，第一个花括号就相当于我们方法的主体，后边的花括号就是Proxy代理处理区域，相当于我们写钩子函数的地方。
    现在把上边的obj对象改成我们的Proxy形式。

        ```js
        var pro = new Proxy({
            add: function (val) {
                return val + 10;
            },
            name: 'I am Jspang'
        }, {
                get:function(target,key,property){
                    console.log('come in Get');
                    return target[key];
                }
            });
         
        console.log(pro.name);
        ```
    
    - 可以在控制台看到结果，先输出了come in Get。相当于在方法调用前的钩子函数。

2. get属性: get属性是在你得到某对象属性值时预处理的方法，他接受三个参数
    1. target：得到的目标值
    2. key：目标的key值，相当于对象的属性
    3. property：这个不太常用，用法还在研究中，还请大神指教。


3. set属性: set属性是值你要改变Proxy属性值时，进行的预先处理。它接收四个参数。

    1.target:目标值。
    2. key：目标的Key值。
    3. value：要改变的值。
    4. receiver：改变前的原始值。


```js
var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
        get:function(target,key){
            console.log('come in Get');
            return target[key];
        },
        set:function(target,key,value,receiver){
            console.log(`    setting ${key} = ${value}`);
            return target[key] = value;
        }
 
    });
 
console.log(pro.name);
pro.name='技术胖';
console.log(pro.name);
```


4. apply的使用: apply的作用是调用内部的方法，它使用在方法体是一个匿名函数时。看下边的代码。

```js
let target = function () {
    return 'I am JSPang';
};
var handler = {
    apply(target, ctx, args) {
        console.log('do apply');
        return Reflect.apply(...arguments);
    }
}
 
var pro = new Proxy(target, handler);
 
console.log(pro());
```

## 第16节：promise对象的使用
1. promise的基本用法: promise执行多步操作非常好用，那我们就来模仿一个多步操作的过程，那就以吃饭为例吧。要想在家吃顿饭，是要经过三个步骤的。

    - 洗菜做饭。
    - 坐下来吃饭。
    - 收拾桌子洗碗。

- 这个过程是有一定的顺序的，你必须保证上一步完成，才能顺利进行下一步。我们可以在脑海里先想想这样一个简单的过程在ES5写起来就要有多层的嵌套。那我们现在用promise来实现。

    ```js
    let state=1;
     
    function step1(resolve,reject){
        console.log('1.开始-洗菜做饭');
        if(state==1){
            resolve('洗菜做饭--完成');
        }else{
            reject('洗菜做饭--出错');
        }
    }
     
     
    function step2(resolve,reject){
        console.log('2.开始-坐下来吃饭');
        if(state==1){
            resolve('坐下来吃饭--完成');
        }else{
            reject('坐下来吃饭--出错');
        }
    }
     
     
    function step3(resolve,reject){
        console.log('3.开始-收拾桌子洗完');
         if(state==1){
            resolve('收拾桌子洗完--完成');
        }else{
            reject('收拾桌子洗完--出错');
        }
    }
     
    new Promise(step1).then(function(val){
        console.log(val);
        return new Promise(step2);
     
    }).then(function(val){
         console.log(val);
        return new Promise(step3);
    }).then(function(val){
        console.log(val);
        return val;
    });
    ```

## 第17节：class类的使用

1. 类的声明

- 先声明一个最简单的coder类，类里只有一个name方法，方法中打印出传递的参数。

```js
class coder{
    name(val){
        console.log(val);
    }
}
        ```


2. 类的使用

- 我们已经声明了一个类，并在类里声明了name方法，现在要实例化类，并使用类中的方法。

```js
class Coder{
    name(val){
        console.log(val);
    }
}
 
let jspang= new Coder;
jspang.name('jspang');
```

3. 类的多方法声明

```js
class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('jspang')+':'+'Skill:'+val);
    }
}
 
let jspang= new Coder;
jspang.name('jspang');
jspang.skill('web');
```
- 这里需要注意的是两个方法中间不要写逗号了，还有这里的this指类本身，还有要注意return 的用法。

4. 类的传参

- 在类的参数传递中我们用constructor( )进行传参。传递参数后可以直接使用this.xxx进行调用。

```js
class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('jspang')+':'+'Skill:'+val);
    }
 
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
 
    add(){
        return this.a+this.b;
    }
}
 
let jspang=new Coder(1,2);
console.log(jspang.add());
```


- 我们用constructor来约定了传递参数，然后用作了一个add方法，把参数相加。这和以前我们的传递方法有些不一样，所以需要小伙伴们多注意下。

5. class的继承

- 如果你学过java，一定知道类的一大特点就是继承。ES6中也就继承，在这里我们简单的看看继承的用法。

```js
class htmler extends Coder{
 
}
 
let pang=new htmler;
pang.name('技术胖');
```
- 声明一个htmler的新类并继承Coder类，htmler新类里边为空，这时候我们实例化新类，并调用里边的name方法。结果也是可以调用到的。


## 第18节：模块化操作
- 在ES5中我们要进行模块华操作需要引入第三方类库，随着前后端分离，前端的业务日渐复杂，ES6为我们增加了模块话操作。模块化操作主要包括两个方面。

    1. export :负责进行模块化，也是模块的输出。
    2. import : 负责把模块引，也是模块的引入操作。

1. export的用法：

- export可以让我们把变量，函数，对象进行模块话，提供外部调用接口，让外部进行引用。先来看个最简单的例子，把一个变量模块化。我们新建一个temp.js文件，然后在文件中输出一个模块变量。

```
export var a = 'jspang';
```
- 然后可以在index.js中以import的形式引入。

```
import {a} from './temp.js';
 
console.log(a);
```

- 这就是一个最简单的模块的输出和引入。

2. 多变量的输出

- 这里声明了3个变量，需要把这3个变量都进行模块化输出，这时候我们给他们包装成对象就可以了。

```
var a ='jspang';
var b ='技术胖';
var c = 'web';
 
export {a,b,c}
```


3. 函数的模块化输出


```
export function add(a,b){
    return a+b;
}
```

4. as的用法

- 有些时候我们并不想暴露模块里边的变量名称，而给模块起一个更语义话的名称，这时候我们就可以使用as来操作。

```
var a ='jspang';
var b ='技术胖';
var c = 'web';
 
export {
    x as a,
    y as b,
    z as c
}
```

5. export default的使用

- 加上default相当是一个默认的入口。在一个文件里export default只能有一个。我们来对比一下export和export   default的区别

1. export
    1. 可导入多个
    
    ```
    export var a ='jspang';
     
    export function add(a,b){
        return a+b;
    }
    ```
    2. 对应的导入方式

    ```
    import {a,add} form './temp';//也可以分开写
    ```


2.export defalut

    
- 一个文件里export default只能有一个
    
```
export default var a='jspang';
```

- 对应的引入方式：可以自定义引入的名字

```
import str from './temp';
```