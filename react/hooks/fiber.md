react16 相比于 15 的底层改动很大，16 的一大特色就是**时间切片功能**。把一条路走到底的任务通过时间切片分为多个切片间断执行，使得执行的期间浏览器可以进行操作响应。

因为浏览器的 js 执行线程是**单线程**。

为了实现时间切片所以 react 官方自己造了一个 `fiber` 数据结构，

本质是使用**链表来串联父子节点以及兄弟节点来达到状态中断以及状态恢复**的功能

### 背景：

- react 在进行组件渲染的时候，从 setState 开始到渲染完成整个过程是同步的。如果渲染的组件很大，JS 的单线程执行就会**占据主线程事件比较长**

## 实现原理

Fiber 有自己的组件调用栈，以`链表`的形式遍历组件树，可以`灵活地暂停、继续和丢弃执行地任务`,通过串联父子节点以及兄弟节点来达到状态中断以及状态恢复。其实是利用了 `requestIdleCallback` 这个 API

### react 内部运转分三层

1. Vitual DOM 层，描述页面张什么样
2. Reconciler 层，负责调用组件生命周期方法、Diff 运算等（Fiber）
3. Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 reactDOM 和 ReactNative

`Scheduler`用来做任务分配：

- synchronous，与之前的 Stack Reconciler 操作一样，同步执行
- task，在 nextTick 之前执行
- animation，下一帧之前执行
- high，不久将来
- low，稍微延迟执行
- offscreen 下一次 render 时或 scoll 时执行

- Fiber Reconciler（react）执行阶段：

  - 阶段一，生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断
  - 阶段二，将需要更新的节点一次过批量更新，不能打断
