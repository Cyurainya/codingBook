参考链接 :
[react 事件机制](https://juejin.cn/post/6844903790198571021)

- `react` 的所有事件都挂载在`document`中
- 当`真实 dom` 触发后冒泡到 `document` 后才会对 react 事件进行处理
- 所以是`原生事件会先执行`
- 然后再执行` react 合成事件`
- 最后执行真正的 `document `挂载事件
