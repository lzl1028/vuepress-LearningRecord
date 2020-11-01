# Js对象操作

## 1. js遍历对象

1. for ... in 语句

```js
    var obj = {a: 1, b: 2};  
    for (let i in obj) {  
        console("key:" + i + ", value:" + obj[i]);  
    }  
```    

## 2. JQ遍历对象
jquery有两个函数共计两种方法可以使用[$.each(obj,function(i,item){}),$.map(obj,function(i,item){})]
- 两种方法的区别：$.each()没有返回值。$.map()有返回值，可以return 出来。

- $.each(obj,function(i,item){})

```js
var obj={name:"abc",type:"p"};
$.each(obj,function(k,v){
    //这里是处理 obj 的函数
    document.writeln(k+':'+v);
})
//$.each($("div"),function(k,v){})
//$("div").each(function(index, element) { });
//我知道的就这两种用法
```

- $.map(obj,function(i,item){})

```js
    /* 
    jquery中的each是用来遍历数组的而map则是用来映射生成一个新数组的 
    each方法中的return false相当于循环中的break,return true相当于循环中的continue 
    map方法中的return 相当于个新数组映射成的一个元素，没有return就相当于新的数组中忽略掉了这个元素 
     
     
    */  
      
    /*遍历数组*/  
    var arr=["a","b","c"];  
    console.log("js遍历数组1");  
    for(var i=0;i<arr.length;i++){  
        console.log(i+"--"+arr[i]);  
    }  
    console.log("js遍历数组2");  
    for(var i in arr){  
        console.log(i+"--"+arr[i]);  
    }  
    console.log("jquery.each遍历数组");  
    $.each(arr,function(i,item){  
        console.log(i+"--"+item);  
    });  
    console.log("jquery.each遍历数组2");  
    $(arr).each(function(i,item){  
        console.log(i+"--"+item);  
    });  
    console.log("jquery.map遍历数组1，注意这里回调函数中第一个参数是元素，第二个是索引");  
    $.map(arr,function(i,item){  
        console.log(i+"--"+item);  
    });  
    console.log("jqery.map遍历数组2");  
    console.log($(arr).map(function(i,item){  
        console.log(i+"--"+item);  
    }).length);  
      
    /*遍历对象*/  
    var obj={name:"xiaoming",age:20,addr:"tianminglu"};  
    console.log("js遍历对象")  
    for(var i in obj){  
        console.log(i+"--"+obj[i]);  
    }  
      
    console.log("jquery.each遍历对象1");  
    $.each(obj,function(i,item){  
        console.log(i+"--"+item);  
    });  
    console.log("jquery.each遍历对象2")  
    $(obj).each(function(i,item){  
        console.log(i+"--"+item);  
    });  
    console.log("jquery.map遍历对象1，注意这里回调函数中第一个参数是元素，第二个是索引");  
      
    $.map(obj,function(i,item){  
        console.log(i+"--"+item);  
    });   
    console.log("jquery.map遍历对象2");  
    $(obj).map(function(i,item){  
        console.log(i+"--"+item);  
    });  
```

## 3. 对象的深浅拷贝
- 浅拷贝：就是把对象的属性遍历一遍，赋给一个新的对象。
- 浅拷贝： 如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以修改新拷贝的对象会影响原对象。所谓的浅拷贝就是无论你拷贝多少个对象，这些拷贝的对象里面的属性还是指向原来对象里面的属性。

```js
var a={name:'yy',age:26};
var b=new Object();


b.name=a.name;
b.age=a.age;
a.name='xx';
console.log(b);//Object { name="yy", age=26}
console.log(a);//Object { name="xx", age=26}
```

- 深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。
1. 把原来对象的属性遍历一遍，赋给一个新的对象。深拷贝一个对象，就是创建一个与之前对象完全无关的对象

```js
    //深复制对象方法    
    var cloneObj = function (obj) {  
        var newObj = {};  
        if (obj instanceof Array) {  
            newObj = [];  
        }  
        for (var key in obj) {  
            var val = obj[key];  
            //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。  
            newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
        }  
        return newObj;  
    };  
    //测试    
    var obj = {a:function(){console.log(this.b.c)},b:{c:1}},//设置一个对象  
    newObj = cloneObj(obj);//复制对象  
    newObj.b.c=2;//给新对象赋新值  
    obj.a();//1，不受影响  
    newObj.a();//2  
```

2. 将对象序列化再解析回来，对象中如果有函数function则不能正确复制

```js
    var obj = {a:1,b:2}  
    var newObj = JSON.parse(JSON.stringify(obj));  
    newObj.a=3;  
    console.log(obj);  
    console.log(newObj);  
```

3. 针对数组对象的方法，用数组方法concat一个空数组

```js
ar a=[1,2,3];  
var b=a;  
var c=[].concat(a);  
a.push(4);  
console.log(b);  
console.log(c); 
```

