# 笛卡尔心型曲线

## 1. canvas:平面直角坐标系画法

```
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
 </head>
 <body>
    <canvas width="400" height="400"></canvas>

    <script>
        var canvas = document.querySelector('canvas');
        var context = canvas.getContext('2d');  
        context.lineWidth = 3;
        // 将画布的原点（0,0），移动到(200,200)
        // 移动原点是为了能让整个心形显示出来
        context.translate(200,200); 

        // t 代表弧度
        var t=0;
        // maxt 代表 t 的最大值
        var maxt = 2*Math.PI;
        // vt 代表 t 的增量
        var vt = 0.01;
        // 需要循环的次数
        var maxi = Math.ceil(maxt/vt);
        // 保存所有点的坐标的数组
        var pointArr=[];
        // x 用来暂时保存每次循环得到的 x 坐标
        var x=0;
        // y 用来暂时保存每次循环得到的 y 坐标
        var y=0;

        // 根据方程得到所有点的坐标
        for(var i=0;i<=maxi;i++){
            // x=a*(2*sin(t)+sin(2*t))
            x=50*(2*Math.sin(t)+Math.sin(2*t));

            // y=a*(2*cos(t)+cos(2*t))
            y=50*(2*Math.cos(t)+Math.cos(2*t));
            t+=vt;
            pointArr.push([x,y]); 
        }

        // 根据点的坐标，画出心形线
		context.moveTo(pointArr[0][0],pointArr[0][1]);
        draw();
        function draw(){
             context.fillStyle='#c00';
             // 把每个点连接起来
            for(var i=1;i<pointArr.length;i++){
                x = pointArr[i][0];
                y = pointArr[i][1];
                context.lineTo(x,y);
            }
            context.fill();
        }
    </script>
 </body>
</html>
```

## 2. 平面直角坐标系 画法 （空心心形）

- 只需要改改 draw( ) 函数就好，把原来的 fill( ) 方法，改为 stroke( ) 方法，并且把 strokeStyle 设置了颜色就行了。

```
function draw(){
     //context.fillStyle='#c00';
     context.strokeStyle='#c00';
     // 把每个点连接起来
    for(var i=1;i<pointArr.length;i++){
        x = pointArr[i][0];
        y = pointArr[i][1];
        context.lineTo(x,y);
    }
     //context.fill();
     context.stroke();
}
```

## 3. 极坐标系画法

- 根据极坐标方程 r=a(1+sinθ) ，得到 r ，以 r 作为半径，根据 r 连续的去画圆弧，画完一圈后，心形就出来了。

- 心形线 极坐标方程：
	r=a(1+sinθ)



```

<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
</head>

<body>
  <canvas width="400" height="400"></canvas>

  <script>
     var canvas = document.querySelector('canvas');
     var context = canvas.getContext('2d');
     // 将画布的原点（0,0），移动到(200,100)
     // 移动原点是为了能让整个心形显示出来
     context.translate(200, 100);

     // 画心形
     draw();
     function draw() {
      // 画圆弧时，圆的半径
      var r = 0;
     //  start 代表画弧线时的 起始角
      var start = 0;
      //  end 代表画弧线时的 结束角
      var end = 0;
      //  一个常数，用来控制心形的大小
      var a = 100;

      context.fillStyle = '#e21f27';
      //连续的画圆弧
      for (var q = 0; q < 500; q++) {
         start += Math.PI * 2 / 500;
         // 当 结束角 是 Math.PI * 2 时也就是已经画了一圈了,心形就出来了
         end = start + Math.PI * 2 / 500;
         // 根据极坐标方程 r=a(1+sinθ)，得到 r（半径）
         r = a * (1 + Math.sin(start)); 
         // 画弧线
         context.arc(0, 0, r, start, end, false);
      }
      context.fill();
    }
  </script>
</body>
</html>

```
 ![image](https://user-gold-cdn.xitu.io/2018/6/10/163e9325cdb7c727?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
 </head>
 <body>
    <canvas width="400" height="400"></canvas>

	<script>
		var canvas = document.querySelector('canvas');
		var context = canvas.getContext('2d');  
		context.lineWidth = 3;
		// 将画布的原点（0,0），移动到(200,200)
		// 移动原点是为了能让整个心形显示出来
		context.translate(200,200); 

		// t 代表弧度
		var t=0;
		// vt 代表 t 的增量
		var vt = 0.01;
		// maxt 代表 t 的最大值
		var maxt = 2*Math.PI;
		// 需要循环的次数
		var maxi = Math.ceil(maxt/vt);
		// 保存所有点的坐标的数组
		var pointArr=[];
		// 控制心形大小
		var size = 10;
		// x 用来暂时保存每次循环得到的 x 坐标
		var x=0;
		// y 用来暂时保存每次循环得到的 y 坐标
		var y=0;

		// 根据方程得到所有点的坐标
		for(var i=0;i<=maxi;i++){
			// x=16 * (sin(t)) ^ 3;
			var x = 16 * Math.pow(Math.sin(t),3);
			// y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
			var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) -2 * Math.cos(3 * t)- Math.cos(4 * t);
			t+=vt;
			pointArr.push([x*size,-y*size]); 
		}

		// 根据点的坐标，画出心形线
		context.moveTo(pointArr[0][0],pointArr[0][1]);
		draw();
		function draw(){
			context.fillStyle='#c00';
			// 把每个点连接起来
			for(var i=1;i<pointArr.length;i++){
				x = pointArr[i][0];
				y = pointArr[i][1];
				context.lineTo(x,y);
			}
			context.fill();
		}
	</script>
 </body>
</html>


```
 ![image](https://user-gold-cdn.xitu.io/2018/6/10/163e93273209968d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


## 4. 极坐标系 画法  （空心心形）

- 用极坐标系 画法，画空心心形，也是一样的需要改改 draw( )  函数，把原来的  fill( )  方法，改为 stroke( ) 方法，并且把 strokeStyle  设置了颜色就行了。
```
function draw() {
  var r = 0;
  var start = 0;
  var end = 0;
  var a = 100;

  //context.fillStyle = '#e21f27';
  context.strokeStyle = '#e21f27';
  for (var i = 0; i < 500; i++) {
    start += Math.PI * 2 / 500;
    end = start + Math.PI * 2 / 500;
    r = a * (1 + Math.sin(start)); 
    context.arc(0, 0, r, start, end, false);
  }
  //context.fill();
  // 改用 stroke() 方法
  context.stroke();   
}
```