# 小程序框架对比

## 不选用原生开发的原因

- 原生开发对 NODE、预编译器、webpack 支持不好
- 小程序语法不是很好
- vue、react 生态很多周边工具
- 微信开发工具不好用

## 多端是什么

### 1. 全包型

- 这类框架最大的特点就是**从底层的渲染引擎、布局引擎，到中层的 DSL，再到上层的框架全部由自己开发**，代表框架是 Qt 和 Flutter。
- 这类框架优点非常明显：性能（的上限）高；各平台渲染结果一致。
- 缺点也非常明显：
  - 需要完全重新学习 DSL（QML/Dart），以及难以适配中国特色的端：小程序。
  - 框架研发成本巨大，渲染引擎、布局引擎、DSL、上层框架每个部分都需要大量人力开发维护

### 2. web 技术型

代表框架是 React Native 和 Weex

> Web 技术（JavaScript，CSS）带到移动开发中，自研布局引擎处理 CSS，使用 JavaScript 写业务逻辑，使用流行的前端框架作为 DSL，各端分别使用各自的原生组件渲染

优点：

1. 开发迅速
2. 复用前端生态
3. 易于学习上手，不管前端后端移动端，多多少少都会一点 JS、CSS

缺点:

1. 交互复杂时难以写出高性能的代码，这类框架的设计就必然导致 JS 和 Native 之间需要通信，类似于手势操作这样频繁地触发通信就很可能使得 UI 无法在 16ms 内及时绘制。React Native 有一些声明式的组件可以避免这个问题，但声明式的写法很难满足复杂交互的需求。
2. 由于没有渲染引擎，使用各端的原生组件渲染，相同代码渲染的一致性没有第一种高。

### 3. JavaScript 编译型

代表框架:Taro、WePY 、uni-app 、 mpvue 、 chameleon

> 它们的原理也都大同小异：先以 JavaScript 作为基础选定一个 DSL 框架，以这个 DSL 框架为标准在各端分别编译为不同的代码，各端分别有一个运行时框架或兼容组件库保证代码正确运行。

优点：

1. 小程序，因为第一第二种框架其实除了可以跨系统平台之外，也都能编译运行在浏览器中。(Qt 有 Qt for WebAssembly, Flutter 有 Hummingbird，React Native 有 react-native-web, Weex 原生支持)
2. 在移动端一般会编译到 React Native/Weex，所以它们也都拥有 Web 技术型框架的优点。这看起来很美好，但实际上 React Native/Weex 的缺点编译型框架也无法避免。除此之外，编译型框架的抽象也不是免费的：当 bug 出现时，问题的根源可能出在运行时、编译时、组件库以及三者依赖的库等等各个方面。在 Taro 开源的过程中，我们就遇到过 Babel 的 bug，React Native 的 bug，JavaScript 引擎的 bug，当然也少不了 Taro 本身的 bug。相信其它原理相同的框架也无法避免这一问题

## 从几个维度去 compare 小程序

[小程序全面测评](https://jelly.jd.com/article/6006b1055b6c6a01506c8818)

## 参考文章:

1. [跨端开发框架深度横评之 2020 版](https://zhuanlan.zhihu.com/p/127915625)
2. [小程序全面测评](https://jelly.jd.com/article/6006b1055b6c6a01506c8818)
3. [小程序原理实现和思考](https://github.com/berwin/Blog/issues/49)
4. [深入浅出主流的几款小程序跨端框架原理](https://juejin.cn/post/6881597846307635214)
