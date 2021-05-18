# Redux 从设计到源码

## Redux 是什么

- 是一种 Javascript 状态容器，能提供可预测化的状态管理
- 视图与状态一一对应
- 所有状态都保存在一个对象里

![redux-view](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2017/adc95a4c.png)

- Store：_保存数据的地方_，你可以把它看成一个容器，整个应用只能有一个 Store。

- State：_Store 对象包含所有数据_，如果想得到某个时点的数据，就要对 Store 生成快照，这种**时点的数据集合**，就叫做 State。

- Action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。**Action 就是 View 发出的通知**，表示 State 应该要发生变化了。

- Action Creator：View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦，所以我们*定义一个函数来生成 Action*，这个函数就叫 Action Creator。

- Reducer：Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种*State 的计算过程就叫做 Reducer*。Reducer 是一个函数，**它接受 Action 和当前 State 作为参数，返回一个新的 State**

- dispatch：是**View 发出 Action 的唯一方法**。

### 工作流程

- 用户（通过 view）发出 Action，发出的方式用到 dispatch
- Store 自动调用 Reducer（传入 State 和对应的 Action），Reducer 返回新的 State
- State 有变化就会调用监听函数，更新 View

## 为什么要用 Reduex

- 前端复杂性的根本原因是大量无规律的交互和异步操作
- 变化和异步操作的相同作用都是改变了当前 View 的状态，但是它们的无规律性导致了前端的复杂，而且随着代码量越来越大，我们要维护的状态也越来越多。

- 我们很容易就对这些状态何时发生、为什么发生以及怎么发生的失去控制。那么怎样才能让这些状态变化能被我们预先掌握，可以复制追踪呢？

这就是 Redux 设计的动机所在。

- Redux 试图让每个 State 变化都是**可预测**的，将应用中所有的动作与状态都**统一管理**，**让一切有据可循**。

## 有什么好用的中间件
1、redux-thunk

源代码简短优雅，上手简单

2、redux-saga

借助 JS 的 generator 来处理异步，避免了回调的问题

3、redux-observable

借助了 RxJS 流的思想以及其各种强大的操作符，来处理异步问题

## 总结

- 用对象展开符增加代码可读性
- 区分 smart component 和 dump component
- component 里不要出现任务 async calls,交给 action creator 来做
- Reducer 尽量简单，复杂的交给 action creator
- reducer 不要改动之前的 State，返回一个新的
- immutable.js 配合效果很好
- action creator 里面可以用 promise/async/await 以及 redux-thunk 来完成功能
- action creators 和 Reducer 请用 pure 函数。
- 请慎重选择组件树的哪一层使用 connected component(连接到 Store)，通常是比较高层的组件用来和 Store 沟通，最低层组件使用这防止太长的 prop chain。
- 请慎用自定义的 Redux-middleware，错误的配置可能会影响到其他 middleware.
- 有些时候有些项目你并不需要 Redux（毕竟引入 Redux 会增加一些额外的工作量）

参考：

1. [Redux从设计到源码](https://tech.meituan.com/2017/07/14/redux-design-code.html)
