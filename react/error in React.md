React 内部其实也是通过 `try...catch... `形式是捕获各阶段的异常，但是只在两个阶段的特定几处进行了异常捕获，这也是为什么异常边界只能捕获到子组件在构造函数、render 函数以及所有生命周期函数中抛出的异常

细心的小伙伴应该注意到，`throwException` 和 `dispatch` 在遍历节点时，是从`异常节点的父节点`开始遍历，这也是为什么异常边界组件自身的异常不会捕获并处理

我们也提到了 React 内部将异常分为了两种异常处理方法：`RootError`、`ClassError`，我们只重点分析了 ClassError 类型的异常处理函数，其实 RootError 是一样的，区别在于最后调用的处理方法不同，在遍历所有父节点过程中，如果有`异常边界组件`，则会调用` ClassError` 类型的异常处理函数，如果没有，一直遍历到根节点，则会调用 `RootError` 类型的异常处理函数，最后调用的 `onUncaughtError` 方法，此方法做的事情很简单，其实就是将 hasUnhandledError 变量赋值为 true，将 unhandledError 变量赋值为异常对象，此异常对象最终将在 finishRendering 函数中被抛出，而 finishRendering 函数是在 performWork 函数的最后被调用
