# toy-ui

## 组件通信方式

### dispatch

`parent.$emit.apply(parent, [eventName].concat(params));`

dispatch是向上去发送事件，需要在上层的组件中通过`$on`监听，这样能够将事件或者参数直接发送到对应的组件的方法中。

子组件在mounted的时候dispatch，父组件在created的时候监听即可。



### broadcast

`child.$emit.apply(child, [eventName].concat(params));`

broadcast是向下去广播对应的事件，从父向子广播，需要用递归的方式一层一层的去广播，知道找到对应名称的组件。



### findComponent



## Form Component

1.在form-item组件中，在子组件Mounted的时候将子组件的监听事件发送到父组件中。

> Vue的父子组件渲染的顺序是：
>
> 父(beforeMounted) => 父(mounted) => 子(beforeMounted) => 子(mounted)
>
> Vue中的组件渲染顺序是由内而外的，类似冒泡的顺序
>
> 所以这里在子组件加载完成的时候吧子组件的实例给到父组件



2.在form的input中，在实际的input事件中发送两个事件

```js
handleInput(event) {
  const { value } = event.target;
  this.currentValue = value;
  this.$emit('input', value);
  this.dispatch('toyFormItem', 'on-form-change', value);
},
```

第一个事件是将input的实际值发送到最顶层的业务组件里，这个值最后会绑定到form组件的model里，form-item也是通过这个值来获取对应的输入值。

第二个事件是调用form-item中的change事件，通过这个可以在change的时候出发form-item中的验证。

通过这两个事件的发送才算是搞清楚表单组件是如何工作的。



---


Vue `$emit`& `$on` source code: https://github.com/vuejs/vue/blob/master/src/core/instance/events.js