# 移动端navigator判断

## 判断是否是安卓

```js
var isAndroid = /Android/i.test(navigator.userAgent);
```
## 判断是否是IOS系统

```js
var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
```
## 判断是否是手机浏览器
```js
var isMobile = /mobi/i.test(navigator.userAgent.toLowerCase());
```
## 判断是否正常联网

```js
navigator.onLine // true
```
## 让手机震动

```js
<!--振动1秒-->
navigator.vibrate(1000);
<!--震动多次还可以传数组-->
navigator.vibrate([3000, 2000, 1000]);
<!--如果想停止震动，你只需要向navigator.vibrate方法里传入0，或一个空数组：-->
navigator.vibrate(0);
navigator.vibrate([]);
```

## 获取地理位置信息

```js
navigator.geolocation.getCurrentPosition();

// <!--可以通过配置enableHighAcuracy设置为高经度模式，默认为false。-->
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {

    enableHighAcuracy: true,
    
    timeout: 5000,
    
    maximumAge: 3000 
    
});
```

