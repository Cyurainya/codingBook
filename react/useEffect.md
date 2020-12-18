### useEffect 做了什么

告诉 React 组件需要在渲染之后执行某些操作。react 会保存你传递的函数（effect），并且在执行 DOM 更新之后调用他

### 为什么要用 useEffect

利用 js 的闭包，将`useEffect`放在组件内部让我们可以在 effect 中直接访问 count state 变量，保存在了函数作用域中

### 每次都会渲染吗

yes。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕，并在每次更新 DOM 后执行该 effect

### 相比 componentDidMount 和 componentDidUpdate 有什么不同

使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕
