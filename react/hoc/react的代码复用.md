参考：

[react 复用深入](https://juejin.cn/post/6844903815762673671)

## Mixin

1. 使用方法

```javascript
var LogMixin = {
  log: function () {
    console.log('log');
  },
  componentDidMount: function () {
    console.log('in');
  },
  componentWillUnmount: function () {
    console.log('out');
  },
};

var User = React.createClass({
  mixins: [LogMixin],
  render: function () {
    return <div>...</div>;
  },
});

var Goods = React.createClass({
  mixins: [LogMixin],
  render: function () {
    return <div>...</div>;
  },
});
```

### Mixin 的危害

- Mixin 可能会相互依赖，相互耦合，不利于代码维护
- 不同的 Mixin 中的方法可能会存在相互冲突
- 代码滚雪球

## HOC 高阶组件

> HOC 是一种高级技术，用来重用组件逻辑。但是本身并不是 React API。它只是一种`模式`，是由 React 自身的组合性质必然产生的

### 高阶函数就是一个没有副作用的纯函数

```javascript
function visible(WrappedComponent) {
  return class extends Component {
    render() {
      const { visible, ...props } = this.props;
      if (visible === false) return null;
      return <WrappedComponent {...props} />;
    }
  };
}
```

、

![hoc](./hoc.png)

### HOC 的实现方式

```javascript
function proxyHOC(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

对`原生组件`增强的项：

- 可操作所有传入的 `props`
- 可操作组件的`生命周期`
- 可操作组件的`static`方法
- 获取 `refs`

#### 反向继承

返回一个组件，继承原组件，在 render 中调用原组件的 render。由于继承了原组件，能用过 this 访问到原组件的`生命周期`,`props`,`state`,`rendre`等，

```javscript
function inheritHOC(WrappedComponent){
    return class extend WrappedComponent{
        return super.render()
    }
}
```

### 对比原生组件增强的项：

- 可操作所有传入的 props
- 可操作组件的生命周期
- 可操作组件的 static 方法
- 获取 refs
- 可操作 state
- 可以渲染劫持

### 对比 Mixin 的优点

- 高阶组件就是一个`没有副作用的纯函数`，各个告诫组件不会互相依赖耦合
- 高阶组件也有可能造成冲突，但我们可以在遵守约定的情况下避免这些行为
- 高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不会关心数据来自何处。高阶组件的增加不会为原组件增加负担。

### 但是也有缺点的

- HOC 需要在原组件上进行包裹或者嵌套，那么如果使用大量的 HOC 的话就会产生非常多的嵌套。这让调试变得困难。
- HOC 可以劫持 props，同时肯定也是会产生冲突的

### 用 HOC 模拟双向绑定

![react-mvvm](./react-mvvm.png)

### redux 的 connect 也可以实现组件的复用
