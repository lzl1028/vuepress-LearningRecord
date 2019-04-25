# 前端项目问题总结

## 1. 计算

### 浮点数计算错误，精度丢失：0.1+0.2=0.30000000000000004

#### js中数字范围：

1. 在JS中能否表示的数字的绝对值范围是5e-324 ~ 1.7976931348623157e+308，这一点可以通过Number.MAX_VALUE和Number.MIN_VALUE来得到证实

2. 在JS中能够表示的最大安全整数的范围是：-9007199254740991 ~ 9007199254740991，这一点可以通过Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER来求证


#### 原因：
    
1. 把这个浮点数转成对应的二进制数，并用科学计数法表示：
```
(0.1)10 => (00011001100110011001(1001)...)2

(0.2)10 => (00110011001100110011(0011)...)2
```

2. 把这个数值通过IEEE 754标准表示成真正会在计算机中存储的值：
```
// 尾数位只能存储最多53位有效数字，这时候就必须来进行四舍五入了
// 而这个取舍的规则就是在IEEE 754中定义的，0.1最终能被存储的有效数字是
0001(1001)(1001)(1001)(1001)(1001)(1001)(1001)(1001)(1001)(1001)(1001)(1001)101
+
(0011)(0011)(0011)(0011)(0011)(0011)(0011)(0011)(0011)(0011)(0011)(0011)(0011)01
=
0100(1100)(1100)(1100)(1100)(1100)(1100)(1100)(1100)(1100)(1100)(1100)(1100)111

// 最终的这个二进制数转成十进制就是0.30000000000000004（不信的话可以找一个在线进制转换工具试一下。
```

- 总结： 计算机中用二进制来存储小数，而大部分小数转成二进制之后都是无限循环的值，因此存在取舍问题，也就是精度丢失。


#### 解决

1. 方法一： [mathjs](https://github.com/josdejong/mathjs)：math.js是JavaScript和Node.js的一个广泛的数学库。支持数字，大数，复数，分数，单位和矩阵等数据类型的运算。
```
var math = require('mathjs')
console.log(math.add(0.1,0.2))//0.30000000000000004
console.log(math.format((math.add(math.bignumber(0.1),math.bignumber(0.2)))))//'0.3'
```

2. 方法二： [decimal.js](mikemcl.github.io/decimal.js/)：为 JavaScript 提供十进制类型的任意精度数值。
```
var Decimal = require('decimal.js')
x = new  Decimal(0.1)
y = 0.2
console.log(x.plus(y).toString())//'0.3'
```

3. 方法三： [bignumber.js](http://mikemcl.github.io/bignumber.js/)：用于任意精度算术的JavaScript库。
```
var BigNumber = require("bignumber.js")
x = new BigNumber(0.1)
y = 0.2
console.log(x.plus(y).toString())//'0.3'
```

4. 方法四： [big.js](http://mikemcl.github.io/big.js/): 用于任意精度十进制算术的小型快速JavaScript库。

```
var Big = require("big.js")
x = new Big(0.1)
y = 0.2
console.log(x.plus(y).toString())//'0.3'
```

5. 原生方法：toFixed()
```
parseFloat((数学表达式).toFixed(digits))； // toFixed() 精度参数须在 0 与20 之间
// 运行
parseFloat((0.1 + 0.2).toFixed(10))//结果为0.3
parseFloat((0.3 / 0.1).toFixed(10)) // 结果为 3  
parseFloat((0.7 * 180).toFixed(10))//结果为126
parseFloat((1.0 - 0.9).toFixed(10)) // 结果为 0.1   
parseFloat((9.7 * 100).toFixed(10)) // 结果为 970 
parseFloat((2.22 + 0.1).toFixed(10)) // 结果为 2.32
```

## 2. 用attr 修改多选框状态会失效
- 选中：$("input[type='checkbox']").attr("checked",true);

- 取消选中：$("input[type='checkbox']").attr("checked",false);

- 应该使用
- 选中：　　

$("input[type='checkbox']").prop("checked",true);

$("input[type='checkbox']").prop({checked:true}); //map键值对

$("input[type='checkbox']").prop("checked",function(){return true;});//函数返回true或false

$("input[type='checkbox']").prop("checked","checked");

- 取消选中：

$("input[type='checkbox']").prop("checked",false);

## 3. IE浏览器兼容问题

1. 时间戳兼容
- safari、IE、360浏览器兼容模式 js 中若想将普通时间格式转换为时间戳，需要将‘-’转换为‘/’
```
new Date(time.replace(/-/g, '/')).getTime();
```

2. input光标不居中问题
- 将input中的padding去掉






















