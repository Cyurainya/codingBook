

# 为什么选用uniapp

## 产品简介

uniapp是一个使用vuejs开发跨平台应用的前端框架
![uni](https://cdn.nlark.com/yuque/0/2020/png/397315/1593512403017-b2bc6d81-cc81-437e-90cd-688da07516a9.png?x-oss-process=image%2Fresize%2Cw_746)

## 平台框架

![uniapp-function](https://cdn.nlark.com/yuque/0/2020/png/397315/1593582073998-549c4af4-54b8-42ab-8f37-fc829468cded.png?x-oss-process=image%2Fresize%2Cw_746)

- 跟很多大公司有合作
- 也有被阿里、华为、vivo等公司的编译器继承，助力跨端开发

## 跨端方案
- 多端兼容

## 原理

 uniapp遵循vuejs语法规范，vuejs是单文件、三段式结构。而小程序是多文件结构，有`wxml/wxss/js/json`,vuejs跟小程序都有一个逻辑层跟视图层双向去打动的工作方式

具体工作流程如下：

- `uniapp Runtime`将小程序的数据绑定功能托管给了vue；vue数据变更后，通过`uniapp Runtime`的数据同步机制将最新数据同步到小程序
- 小程序负责`视图层展示及用户交互`,用户在小程序视图中触发点击、滚动等操作后，先触发小程序的事件函数，再通过`uniapp Runtime`的时间代理机制触发Vue的时间函数，因为同样的收敛在vue上

![runtime](https://cdn.nlark.com/yuque/0/2020/png/397315/1593509697894-7f6d5825-6d08-44ba-948a-44324bf4f3d3.png?x-oss-process=image%2Fresize%2Cw_746)

## 性能优化

![optimisize](https://cdn.nlark.com/yuque/0/2020/png/397315/1593520536254-c03a821c-bffc-4189-aaf2-047748bf1791.png?x-oss-process=image%2Fresize%2Cw_746)

### renderjs解决通讯阻塞

例子：实现一个菜单手势滑动

#### 原生小程序很难流畅实现

因为小程序在视图层与逻辑层两个线程间提供了数据传输和事件系统的功能

**好处**：环境隔离，即保证了安全性，同时也是一种性能提升的手段，就算你业务逻辑计算非常繁忙也不会阻塞交互

**坏处**：两个各负其责，跨线程通信成本极高
   - ①②用户拖动，视图层触发touchmove事件，经native层中转通知逻辑层
   - ③④逻辑层计算移动的计算位置，在通过setState传递位置数据非视图层，中间同样会通过Native中转

> WXS是一个在视图层(webview)中运行的JS，又叫renderjs

- WXS无法直接修改业务数据，仅能设置当前组件的class和style，或者对数据进行格式化。
- 要修改逻辑层的数据，需要通过 callMethod，传递参数给逻辑层 
- WXS是被限制过的JavaScript，可以进行一些简单的逻辑运算 
- WXS可以监听touch事件，处理滚动、拖动交互

其他框架的解决方法:

![stop](https://cdn.nlark.com/yuque/0/2020/png/397315/1593520536241-abd2bcf7-1034-4192-952a-73d2f57207dc.png?x-oss-process=image%2Fresize%2Cw_746)

### 定制vue 移除DOM

回顾下uni-app的运行时原理，

Vue.js负责数据管理， 小程序负责页面渲染， 因此我们可以得出如下结论：
- 小程序负责视图渲染， 页面DOM由小程序负责生成， 小程序只接受data数据传递；
- Vue的vnode遍历对比维度复杂， 但Vue维护的vnode无法和小程序的真实DOM对应。

换句话说， **Vue.js的vnode管理在小程序端没有意义， 徒增资源消耗**， 应该移除。

对应着Vue的执行流程， 我们大概可以做三方面优化：

- compile：optimize过程可取消， 因为该环节是为了标注静态文本节点， 而Vue只负责数据， 不需要关注DOM
节点；
- render function：不生成vnode；
- patch：不比对vnode， 因为set Data仅能传递数据， 所以我们只比对data。

修改 Vue.js 源码后，Vue Runtime 减少了1/3，提升运行性能的同时，还提升了小程序加载性能。

![youhua](https://cdn.nlark.com/yuque/0/2020/png/397315/1593526107879-ed94872f-b472-499e-b191-c07adc156abc.png?x-oss-process=image%2Fresize%2Cw_746)

 `uniapp`借鉴了`westore JSON Diff`库，在调用 setData 之前，会先比对历史数据，精确高效计算出有变化的差量数据，然后再调用 setData，仅传输变化的数据，这样可实现传递数据量的最小化，提升通讯性能

### 减少setState的次数

背景：多次setState会多次渲染
解决：合并

## 参考文章:
1. [跨端开发框架深度横评之2020版](https://zhuanlan.zhihu.com/p/127915625)
2. [小程序全面测评](https://jelly.jd.com/article/6006b1055b6c6a01506c8818)
3. [uniapp高性能](https://www.yuque.com/zaotalk/posts/vab0md)
4. [谜之WXS](https://zhuanlan.zhihu.com/p/82741561)
