react16 相比于 15 的底层改动很大，16 的一大特色就是**时间切片功能**。把一条路走到底的任务通过时间切片分为多个切片间断执行，使得执行的期间浏览器可以进行操作响应。

因为浏览器的 js 执行线程是**单线程**。

为了实现时间切片所以 react 官方自己造了一个 `fiber` 数据结构，

本质是使用**链表来串联父子节点以及兄弟节点来达到状态中断以及状态恢复**的功能

> Fiber 其实是一个节点对象，react 使用链表的形式将所有 Fiber 节点链接，形成连表述，即虚拟 DOM 树。当有更新出现，React

### 背景：

- react 在进行组件渲染的时候，从 setState 开始到渲染完成整个过程是同步的。如果渲染的组件很大，JS 的单线程执行就会**占据主线程事件比较长**

## 实现原理

Fiber 有自己的组件调用栈，以`链表`的形式遍历组件树，可以`灵活地暂停、继续和丢弃执行地任务`,通过串联父子节点以及兄弟节点来达到状态中断以及状态恢复。其实是利用了 `requestIdleCallback` 这个 API

## 3.24 更新

新版本的时间已经不是用 `requestIdleCallback` 了，而是用`MessageChannel`

首先 React 会默认有许多微小任务，也就是 fiber 节点

在执行调度工作和计算工作循环时，执行每一个工作中的 Fiber。但是，有一个条件是每隔 5 毫秒，会跳出工作循环，运行一次**异步的`MessageChannel`的`port.postMesage()`方法，检查是否存在事件响应、更高优先级任务及其他代码需要执行** 。如果有则执行，如果没有则重新创建工作循环，执行剩下的工作中的 Fiber。 但是，由于检查也会费一点时间，所以 5 毫秒有时候不会精准。

### 接下来看 react 如何调度一个任务

#### 初始化

1. 当出现新的更新时，React 会运行一个确保 root 被安排任务的函数

2. 当 root 的`回调函数为空值且新的更新对应的过期时间标记是异步类型`时，根据当前时间和过期时间标记推断出`优先级和timeout`，然后根据优先级、timeout， 解和执行工作的回调函数，执行一个任务，将该任务放入任务队列中，调用 DOM 调度配置文件中的`requestHostCallback`，回调函数为调度中心的清空任务方法

#### 运行任务

1. `requestHostCallback`调用`MessageChannel`中的异步函数:`port.postMessage()`，从而异步执行之前另一个端口`port1`订阅的方法，在该方法中，执行 requestIdCallback 的回调函数，即调度中心的清空任务方法

2. 清空任务方法中，会执行调度中心的工作循环，循环执行任务队列中的任务

3. 任务的回调函数是一个执行同时模式下 root 工作的方法。执行该方法时将循环执行工作中 fiber，同样使用 5 毫秒左右的时间切片进行计算和 diff，5 毫秒时间切片过期后就会返回其自身

#### 完成任务

1. 在执行完所有工作中 fiber 后，react 进入提交步骤，更新 DOM

2. 任务的回调函数返回空值，调度工作循环，完成此任务，并将此任务从任务队列中删除

### react 内部运转分三层

1. Vitual DOM 层，描述页面长什么样
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

参考文档：

[彻底搞懂 react 调度](https://terry-su.github.io/cn/undestand-react-scheduling-mechanism-from-source-code-concurrent-mode/)
