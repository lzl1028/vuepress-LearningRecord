# Vue中生命周期回顾

## 单一组件

> activated, deactivated 是组件keep-alive时独有的钩子

> 钩子的执行顺序是beforeCreate-> created -> mounted->... ->destroyed

1. beforeCreate

2. created

3. beforeMount

4. mounted

5. beforeUpdate

6. updated

7. activated

8. deactivated

9. beforeDestroy

10. destroyed

11. errorCaptured

### 总结

- beforeCreate执行时：data和el均未初始化，值为undefined

- created执行时：Vue 实例观察的数据对象data已经配置好，已经可以得到data的值，但Vue 实例使用的根 DOM 元素el还未初始化

- beforeMount执行时：data和el均已经初始化，但此时el并没有渲染进数据，el的值为“虚拟”的元素节点

- mounted执行时：此时el已经渲染完成并挂载到实例上

- beforeUpdate和updated触发时，el中的数据都已经渲染完成，但只有updated钩子被调用时候，组件dom才被更新。

- 在created钩子中可以对data数据进行操作，这个时候可以进行数据请求将返回的数据赋给data

- 在mounted钩子对挂载的dom进行操作，此时，DOM已经被渲染到页面上。

- 虽然updated函数会在数据变化时被触发，但却不能准确的判断是那个属性值被改变，所以在实际情况中用computed或watch函数来监听属性的变化，并做一些其他的操作。

- 所有的生命周期钩子自动绑定 this 上下文到实例中，所以不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos()),会导致this指向父级。

- 在使用vue-router时有时需要使用来缓存组件状态，这个时候created钩子就不会被重复调用了，如果我们的子组件需要在每次加载或切换状态的时候进行某些操作，可以使用activated钩子触发。

- 父子组件的钩子并不会等待请求返回，请求是异步的，VUE设计也不能因为请求没有响应而不执行后面的钩子。所以，我们必须通过v-if来控制子组件钩子的执行时机


## 父子组件

> 组件，分别在他们的钩子函数中打印日志，观察执行顺序。得到的结果如图所示，父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载。

```js
父beforeCreate-> 父create -> 子beforeCreate-> 子created -> 子mounted -> 父mounted
```

> 子组件挂载完成后，父组件还未挂载。所以组件数据回显的时候，在父组件mounted中获取api的数据，子组件的mounted是拿不到的。

> 仔细看看父子组件生命周期钩子的执行顺序，会发现created这个钩子是按照从外内顺序执行，所以父子组件传递接口数据的解决方案是：

- 在created中发起请求获取数据，依次在子组件的created或者mounted中会接收到这个数据。

### 父子组件生命周期执行顺序

```js
父create->子created->子mounted->父mounted
```

#### 加载渲染过程

```js
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
```

```js
home beforeCreate --> home created --> home beforeMount --> list beforeCreate --> list created --> list beforeMount --> list mounted --> listMounted --> home mounted
```

#### 更新过程

```js
父beforeUpdate->子beforeUpdate->子updated->父updated
```

#### 销毁过程

```js
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```

```js
home beforeDestroy --> list beforeDestroy --> list destroyed --> home destroyed
```
