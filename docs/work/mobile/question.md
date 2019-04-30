
# 移动端填坑

## 一、文字输入限制问题

- 1、非直接的文字输入

    - 当输入汉字时必然会是非直接输入，需要我们点选才能正式输入。
    - 当我们字数限制为16个字，需要实时检查是否到16字。输入文字时，当有非直接的文字输入时，监听keydown事件和input事件都会直接触发判断字数逻辑，会截断我们正在输入的文字。解决办法：
    - 监听compositionend（当直接的文字输入时触发）这时，当没选中中文的时候不会进行字数判断。

```js
$('#input').on('compositionend', function(e) {
    var len = $(this).val().length;
    if (len > 16) {
        // 提示超过16字
    }
});
```

- 2、emoji表情的输入

    - 当输入emoji的时候，但是，当输入emoji表情的时候，js中判断emoji表情的length为2，因此emoji正常应该最多只能输入8个，但是ios端却把emoji的length算为1，可以输入16个emoji。这样就导致了两端的体验不同。因此需要在js中来进行字数限制。
    - 再加上汉字输入问题，那么就加入一个标记位，来判断是否是直接的文字输入。然后监听input，限制字数，当超过字数限制的时候，把前16个字截断显示出来就ok了。

```js
var cpLock;
$('#input').on('compositionstart', function(e) {
    cpLock = true；
});
$('#input').on('compositionend', function(e) {
    cpLock = false;
});
$('#input').on('input', function(e) {
    if (!cpLock) {
        if (e.target.value.length - 17 >=0) {
            var txt = $(e.target).val().substring(0, 16);
            $(e.target).val(txt);
            // 超过16字提示
        }
    }
});
```


## 二、textarea置底展示问题

- ios中的输入体验永远伴随着一个问题，就是当唤起键盘后，整个页面会被键盘压缩，也就是说页面的高度变小，并且所有的fixed全部变为了absolute。

- 可以使用div模拟一个假的输入框，使用定位将真正的输入框隐藏掉，当点击假的输入框的时候，将真正的输入框定位到键盘上方，并且手动获取输入框焦点。

- 在实现过程中需要注意下面几个问题：
    - 1、真正的输入框的位置计算：首先记录无键盘时的window.innerHeight，当键盘弹出后再获取当前的window.innerHeight，两者的差值即为键盘的高度，那么定位真输入框自然就很容易了
    - 2、在ios下手动获取焦点不可以用click事件，需要使用tap事件才可以手动触发

    ```js
        $('#fake-input').on($.os.ios?'tap' : 'click', function() {
            initHeight = window.innerHeight;
            $('#input').focus();
        });
    ```
    - 3、当键盘收起的时候我们需要将真输入框再次隐藏掉，除了使用失去焦点（blur）方法，还有什么方法可以判断键盘是否收起呢？这里可以使用setInterval监听，当当前window.innerHeight和整屏高度相等的时候判断为键盘收起。注意：键盘弹起需要一点时间，所以计算当前屏幕高度也需要使用setInterval
    
    - 4、因为textarea中的文字不能置底显示，当输入超过一行textarea需要自动调整高度，因此将scrollHeight赋值给textarea的height。当删除文字的时候需要height也有变化，因此每次input都先将height置0，然后再赋值。
    ```js
        $('#textarea').css('height', 0);
        $('#textarea').css('height', $('#textarea')[0].scrollHeight);
    ```


    
