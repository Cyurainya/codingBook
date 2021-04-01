### 功能

设置一个状态的初始值，并返回当前状态和设置状态的函数

```
[状态。设置状态的函数] = useState(初始状态)
```

### 和 setState 的区别

先来看两段代码额执行结果

- class setState

```javascript
class Index extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      number: 0,
    }
  }
  handerClick = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.setState({ number: this.state.number + 1 })
        console.log(this.state.number)
      }, 1000)
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handerClick}>num++</button>
      </div>
    )
  }
}
```

- hooks useState

```javascript
function Index() {
  const [num, setNumber] = React.useState(0)
  const handerClick = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setNumber(num + 1)
        console.log(num)
      }, 1000)
    }
  }
  return <button onClick={handerClick}>{num}</button>
}
```

打印结果：

1. 1 2 3 4 5
2. 0 0 0 0 0

分析原因：

1. 在`setState`中的结果很简单，由于`state`是 _Immutable_ 的，setState 后一定会生成一个 _全新的 state 引用_
2.

### 组件初始化：

1. 若初始状态为函数，则将函数执行结果设为当前状态。否则将初始状态设为当前状态
2. 生成设置状态函数
3. 缓存当前状态和设置状态函数
4. 返回当前状态

### 组件更新：

1. 读取缓存状态和设置状态函数
2. 返回缓存状态

### 执行设置状态函数时

1. 更新缓存状态
2. 触发 React 组件树更新
3. 在下一次组件更新时，将返回已被更新的缓存状态

参考文档：

1. http://www.ptbird.cn/react-hook-usestate-setState.html
