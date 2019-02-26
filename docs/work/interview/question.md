# 面试题

## 操作计算题

### 1. ['1','2','3'].map(parseInt)

- 答案：[1,NaN,NaN]

- 解析：
    - map的参数：
        1. currentValue
        callback 数组中正在处理的当前元素。
        
        2. **index可选 ** 看到这里先注意起来这个参数，思考一下
        callback 数组中正在处理的当前元素的索引。
        
        3. array可选
        callback  map 方法被调用的数组。
    - parseInt参数：
        - ![parseInt](https://user-gold-cdn.xitu.io/2019/2/22/1691435685020630?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
        - string: 必须，要被解析的字符串
        - radix：可选。表示要解析的数字的基数。

- 实际调用情况：

```
parseInt('1',0,theArray);
parseInt('2',1,theArray);
parseInt('3',2,theArray);
```
- 第一次，当我我们第一次调用的时候 是这样的：parseInt('1',0) 这个是没问题的 转十进制的 看我红框的图片
返回 1

- 第二次，调用第二个index参数是1,也是说1作为数值的基础。规范里说的很清楚了，如果基础是非0或者小于2，函数都不会查询字符串直接返回NaN。

- 第三次，2作为基数。这就意味着字符串将被解析成字节数，也就是仅仅包含数值0和1。parseInt的规范第十一步指出，它仅尝试分析第一个字符的左侧，这个字符还不是要求基数的有效数字。这个字符串的第一个字符是“3”，它并不是基础基数2的一个有效数字。所以这个子字符串将被解析为空。第十二步说了：如果子字符串被解析成空了，函数将返回为NaN。

- 解决：

```
['1','2','3'].map(function(value){
        return parseInt(value)
})
<!--或-->
['1','2','3'].map(Number)
```
