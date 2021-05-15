# 为什么选用 uniapp

## 产品简介

uniapp 是一个使用 vuejs 开发跨平台应用的前端框架
![uni](https://cdn.nlark.com/yuque/0/2020/png/397315/1593512403017-b2bc6d81-cc81-437e-90cd-688da07516a9.png?x-oss-process=image%2Fresize%2Cw_746)

## 平台框架

![uniapp-function](https://cdn.nlark.com/yuque/0/2020/png/397315/1593582073998-549c4af4-54b8-42ab-8f37-fc829468cded.png?x-oss-process=image%2Fresize%2Cw_746)

- 跟很多大公司有合作
- 也有被阿里、华为、vivo 等公司的编译器继承，助力跨端开发

## 跨端方案

- 多端兼容

## 原理

uniapp 遵循 vuejs 语法规范，vuejs 是单文件、三段式结构。而小程序是多文件结构，有`wxml/wxss/js/json`,vuejs 跟小程序都有一个逻辑层跟视图层双向去打动的工作方式

具体工作流程如下：

- `uniapp Runtime`将小程序的数据绑定功能托管给了 vue；vue 数据变更后，通过`uniapp Runtime`的数据同步机制将最新数据同步到小程序
- 小程序负责`视图层展示及用户交互`,用户在小程序视图中触发点击、滚动等操作后，先触发小程序的事件函数，再通过`uniapp Runtime`的时间代理机制触发 Vue 的时间函数，因为同样的收敛在 vue 上

![runtime](https://cdn.nlark.com/yuque/0/2020/png/397315/1593509697894-7f6d5825-6d08-44ba-948a-44324bf4f3d3.png?x-oss-process=image%2Fresize%2Cw_746)

## 性能优化

![optimisize](https://cdn.nlark.com/yuque/0/2020/png/397315/1593520536254-c03a821c-bffc-4189-aaf2-047748bf1791.png?x-oss-process=image%2Fresize%2Cw_746)

### renderjs 解决通讯阻塞

例子：实现一个菜单手势滑动

#### 原生小程序很难流畅实现

因为小程序在视图层与逻辑层两个线程间提供了数据传输和事件系统的功能

**好处**：环境隔离，即保证了安全性，同时也是一种性能提升的手段，就算你业务逻辑计算非常繁忙也不会阻塞交互
**坏处**：两个各负其责，跨线程通信成本极高

- ①② 用户拖动，视图层触发 touchmove 事件，经 native 层中转通知逻辑层
- ③④ 逻辑层计算移动的计算位置，在通过 setState 传递位置数据非视图层，中间同样会通过 Native 中转

**WXS 是一个在视图层(webview)中运行的 JS，又叫 renderjs**

- WXS 无法直接修改业务数据，仅能设置当前组件的 class 和 style，或者对数据进行格式化。
- 要修改逻辑层的数据，需要通过 callMethod，传递参数给逻辑层
- WXS 是被限制过的 JavaScript，可以进行一些简单的逻辑运算
- WXS 可以监听 touch 事件，处理滚动、拖动交互

其他框架的解决方法:

![stop](https://cdn.nlark.com/yuque/0/2020/png/397315/1593520536241-abd2bcf7-1034-4192-952a-73d2f57207dc.png?x-oss-process=image%2Fresize%2Cw_746)

### 定制 vue 移除 DOM

回顾下 uni-app 的运行时原理，

Vue.js 负责数据管理， 小程序负责页面渲染， 因此我们可以得出如下结论：

- 小程序负责视图渲染， 页面 DOM 由小程序负责生成， 小程序只接受 data 数据传递；
- Vue 的 vnode 遍历对比维度复杂， 但 Vue 维护的 vnode 无法和小程序的真实 DOM 对应。

换句话说， **Vue.js 的 vnode 管理在小程序端没有意义， 徒增资源消耗**， 应该移除。

对应着 Vue 的执行流程， 我们大概可以做三方面优化：

- compile：optimize 过程可取消， 因为该环节是为了标注静态文本节点， 而 Vue 只负责数据， 不需要关注 DOM
  节点；
- render function：不生成 vnode；
- patch：不比对 vnode， 因为 set Data 仅能传递数据， 所以我们只比对 data。

修改 Vue.js 源码后，Vue Runtime 减少了 1/3，提升运行性能的同时，还提升了小程序加载性能。

![youhua](https://cdn.nlark.com/yuque/0/2020/png/397315/1593526107879-ed94872f-b472-499e-b191-c07adc156abc.png?x-oss-process=image%2Fresize%2Cw_746)

`uniapp`借鉴了`westore JSON Diff`库，在调用 setData 之前，会先比对历史数据，精确高效计算出有变化的差量数据，然后再调用 setData，仅传输变化的数据，这样可实现传递数据量的最小化，提升通讯性能

### 减少 setState 的次数

背景：多次 setState 会多次渲染
解决：合并

## 参考文章:

1. [跨端开发框架深度横评之 2020 版](https://zhuanlan.zhihu.com/p/127915625)
2. [小程序全面测评](https://jelly.jd.com/article/6006b1055b6c6a01506c8818)
3. [uniapp 高性能](https://www.yuque.com/zaotalk/posts/vab0md)
4. [谜之 WXS](https://zhuanlan.zhihu.com/p/82741561)
