

### useEffect 做了什么

告诉 React 组件需要在渲染之后执行某些操作。react 会保存你传递的函数（effect），并且在执行 DOM 更新之后调用他

### 源码实现

```javascript
let _deps; // _deps 记录 useEffect 上一次的 依赖

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 如果 dependencies 不存在
  const hasChangedDeps = _deps
    ? !depArray.every((el, i) => el === _deps[i]) // 两次的 dependencies 是否完全相等
    : true;
  /* 如果 dependencies 不存在，或者 dependencies 有变化*/
  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
}
```

### 主要功能

`输入`:依赖项和创建函数
`hook函数`:effect

组件加载后执行创建函数，创建函数执行后会返回一个函数，在组件销毁前执行

若依赖项为数组且不为空，则依赖项改变时，会执行上一个销毁函数和重新执行创建函数。

#### 组件初始化的时候做了什么

1. 生成一个effect对象，包含创建函数
2. 缓存effect和依赖项
3. 当React进入提交阶段，执行effect中的创建函数，获取销毁函数。若销毁函数不为空，则将其放入effect

#### 组件更新的时候

1. 生成一个effect对象，包含创建函数
2. 检查已缓存effect中是否有销毁函数，有的话则放入新的effect对象
3. 缓存effect
4. 若依赖项和已缓存依赖项不同，则将`hasEffect`标记添加到effect,并缓存新依赖项
5. 当React进入提交阶段

```javascript
if(effect有hasEffect标记){
    若effect中有销毁函数，则先执行销毁函数
    执行effect中的创建函数，获取销毁函数。若销毁函数不为空，则将其放入effect
}
```

#### 组件销毁：

若effect中有销毁函数，则执行。


### 为什么要用 useEffect

利用 js 的闭包，将`useEffect`放在组件内部让我们可以在 effect 中直接访问 count state 变量，保存在了函数作用域中

### 每次都会渲染吗

yes。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕，并在每次更新 DOM 后执行该 effect

### 相比 componentDidMount 和 componentDidUpdate 有什么不同

使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕


