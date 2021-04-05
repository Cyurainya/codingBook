# setState 原理

## setState 执行过程

### 1. 流程图

![setState](setState.png)

分析一下流程：

1. `partialState`:`setState`传入的第一个参数，对象或者函数
2. `_pendingStateQueue` :当前组件等待执行的`state`队列
3. `isBatchingUpdate`:react 用于表示当前是否处于批量更新状态，所有组件公用
4. `dirtyComponent`:当前所有处于待更新状态的组件队列
5. `transcation`:react 的十五机制，在被十五调用的方法外包装 n 个`wraper`对象，并依次执行：`waper.init`、被调用方法、`waper.close`
6. `FLUSH_BATCHED_UPDATES`：用于执行更新的`waper`，只有一个 close 方法

### 2. 执行过程

1. 将 setState 传入的`partialState`参数存储在当前组件实例的 state 暂存在`队列`中
2. 判断当前 React 是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中
3. 如果未处于批量更新状态，将`批量更新状态`表示为 true,用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。
4. 调用事务的`waper`方法，遍历待更新组件队列依次执行更新。
5. 执行生命周期`componentWillReceiveProps`
6. 将组件的 state 暂存队列中`state`进行合并，获得最终要更新的 state 对象，并将队列置为空
7. 执行生命周期`componentShouldUpdate`，根据返回值判断是狗需要合并
8. 执行真正的更新 render
9. 执行`componentDidUpdate`

### 总结

### 参考文章

1. https://juejin.cn/post/6844903781813993486
