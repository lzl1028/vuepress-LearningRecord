# Vue开发中遇到的问题

## 1. Vue数据更新后页面不更新不刷新

### Ques:

在开发过程中，我们时常会遇到这样一种情况：当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，如果更新此属性的值，是不会更新视图的。

- 根据官方文档定义：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。

- 受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

```html
<template>
     <div>
    <p @click="addd(obj)">{{obj.d}}</p>
    <p @click="adde(obj)"> {{obj.e}}</p>
</div>
</template>

 <script>
  export default {
      data(){
            return {
                obj:{}
            }
      },
      mounted() {
        this.obj = {d: 0};
        this.obj.e = 0;
        console.log('after--', this.obj);
      },
     methods: {
        addd(item) {
            item.d = item.d + 1;
            console.log('item--',item);
        },
        adde(item) {
            item.e = item.e + 1;
            console.log('item--',item);
        }
       }
  }
 </scirpt> 
```

- 可以看出d属性是有get 和 set方法的，而新增的e属性是没有的。

- 点击触发3次addd，点击触发3次adde,页面效果及控制台信息如下:

```js
3
0
item {d: 4, e: 3}
```

 由此可以看出，更新新增属性e，是不会更新视图，但是会改变其值，当更新原有属性d时会更新视图，同时将新增的属性e的值也更新到视图里边

### Ans:

#### 方法一：官方定义：

- Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：

- Vue.set(vm.obj, ‘e’, 0)

- 您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：

```js
this.$set(this.obj,‘e’,02)
```

- 有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
// 代替 Object.assign(this.obj, { a: 1, e: 2 })
this.obj= Object.assign({}, this.obj, { a: 1, e: 2 })
```

eg: 上述实例解决方法为：

```js
mounted () {
    this.obj = {d: 0};
    this.$set(this.obj, 'e', 0);
    console.log('after---', this.obj);
}
```

#### 方法二：强制更新视图 （this.$forceUpdate()）

## 2. 数据不响应

### Ques
```js
<template>
  <div>
    <div>
      <span>用户名: {{ userInfo.name }}</span>
      <span>用户性别: {{ userInfo.sex }}</span>
      <span v-if="userInfo.officialAccount">
        公众号: {{ userInfo.officialAccount }}
      </span>
    </div>
    <button @click="handleAddOfficialAccount">添加公众号</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        name: '子君',
        sex: '男'
      }
    }
  },
  methods: {
    // 在这里添加用户的公众号
    handleAddOfficialAccount() {
      this.userInfo.officialAccount = '前端有的玩'
    }
  }
}
</script>
```

- 我们希望给用户信息里面添加公众号属性，但是通过this.userInfo.officialAccount = '前端有的玩' 添加之后，并没有生效

### Ans

- 因为在Vue内部，数据响应是通过使用Object.definePrototype监听对象的每一个键的getter,setter方法来实现的，但通过这种方法只能监听到已有属性，新增的属性是无法监听到的

1. 将本来要新增的属性提前在data中定义好

    - 比如上面的公众号，我可以提前在userInfo里面定义好，这样就不是新增属性了，就像下面这样

    ```js
    data() {
        return {
        userInfo: {
            name: '子君',
            sex: '男',
            // 我先提前定义好
            officialAccount: ''
        }
        }
    }
    ```

2. 直接替换掉userInfo

    - 虽然无法给userInfo里面添加新的属性，但是因为userInfo已经定义好了，所以我直接修改userInfo的值不就可以了么，所以也可以像下面这样写

    ```js
    this.userInfo = {
        // 将原来的userInfo 通过扩展运算法复制到新的对象里面
        ...this.userInfo,
        // 添加新属性
        officialAccount: '前端有的玩'
    }
    ```

3. 使用Vue.set

    - 其实上面两种方法都有点取巧的嫌疑，其实对于新增属性，Vue官方专门提供了一个新的方法Vue.set用来解决新增属性无法触发数据响应。

    ```js
    <!-- Vue.set 方法定义 -->
    /**
    * target 要修改的对象
    * prpertyName 要添加的属性名称
    * value 要添加的属性值
    */
    Vue.set( target, propertyName, value )
    ```
    ```js
    // 上面的代码使用Vue.set可以修改为
    import Vue from 'vue'

    // 在这里添加用户的公众号
    handleAddOfficialAccount() {
        Vue.set(this.userInfo,'officialAccount', '前端有的玩')
    }
    ```

    - 但是每次要用到set方法的时候，还要把Vue引入进来，好麻烦，所以为了简便起见，Vue又将set方法挂载到了Vue的原型链上了，即Vue.prototype.$set = Vue.set,所以在Vue组件内部可以直接使用this.$set代替Vue.set
    ```js
    this.$set(this.userInfo,'officialAccount', '前端有的玩')
    ```

    - 其实只有当你要赋值的属性还没有定义的时候需要使用Vue.set

4. 使用$forceUpdate
    
    - 实际上这个方法并不建议使用，因为它会引起许多不必要的性能消耗。

### 扩展：针对数组的特定方式

其实不仅仅是对象，数组也存在数据修改之后不响应的情况，比如下面这段代码

```js
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item">
        {{ item }}
      </li>
    </ul>
    <button @click="handleChangeName">修改名称</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['张三', '李四']
    }
  },
  methods: {
    // 修改用户名称
    handleChangeName() {
      this.list[0] = '王五'
    }
  }
}
</script>
```

上面的代码希望将张三的名字修改为王五，实际上这个修改并不能生效，这是因为Vue不能检测到以下变动的数组:

1. 当你利用索引直接设置一个项时，例如: this.list\[index]\ = newValue

2. 修改数组的length属性,例如: this.list.length = 0

Vue.set和$forceUpdate都可以解决这个问题

```js
Vue.set(this.list,0,'王五')
```

实际上，如果Vue仅仅依赖getter与setter，是无法做到在数组调用push,pop等方法时候触发数据响应的，因此Vue实际上是通过劫持这些方法，对这些方法进行包装变异来实现的。

Vue对数组的以下方法进行的包装变异:

- push

- pop

- shift

- unshift

- splice

- sort

- reverse

所以在操作数组的时候，调用上面这些方法是可以保证数据可以正常响应，下面是Vue源码中包装数组方法的代码:

```js
var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    // 将 arguments 转换为数组
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var result = original.apply(this, args);
    // 这儿的用法同dependArray(value)，就是为了取得dep
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    // 如果有新的数据插入，则插入的数据也要进行一个响应式
    if (inserted) { ob.observeArray(inserted); }
   // 通知依赖进行更新
    ob.dep.notify();
    return result
  });
```
