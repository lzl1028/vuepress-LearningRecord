
## localStorage 监听

localStorage.setItem监听：自定义事件 setItemEvent
localStorage.getItem监听：自定义事件 getItemEvent
localStorage.removeItem监听：自定义事件 removeItemEvent

```js
//监听自定义事件 setItemEvent
localStorage.setItem = (Orgin=>{
    return function(key,value){
        let setItemEvent = new CustomEvent('setItemEvent',{detail:{setKey:key,value}})
        window.dispatchEvent(setItemEvent)
        Orgin.call(this,key,typeof value == 'string'? value : JSON.stringify(value))
    }
})(localStorage.setItem)

//监听自定义事件 getItemEvent
localStorage.getItem = (Orgin=>{
    return function(key){
        let result = JSON.parse(Orgin.call(this,key))
        let getItemEvent = new CustomEvent('getItemEvent',{detail:{getKey:key,value:result}})
        window.dispatchEvent(getItemEvent)
        return result 
    }
})(localStorage.getItem)


//监听自定义事件 removeItemEvent
localStorage.removeItem = (Orgin=>{
    return function(key){
        let removeItemEvent = new CustomEvent('removeItemEvent',{detail:{removeKey:key}})
        window.dispatchEvent(removeItemEvent)
        Orgin.call(this,key)
    }
})(localStorage.removeItem)
```

- 监听：

```js
//localStorage.setItem监听
window.addEventListener('setItemEvent',function(e){
    console.log(e.detail)
})

//localStorage.getItem监听
window.addEventListener('getItemEvent',function(e){
    console.log(e.detail)
}) 

//localStorage.removeItem监听
window.addEventListener('removeItemEvent',function(e){
    console.log(e.detail)
})
```