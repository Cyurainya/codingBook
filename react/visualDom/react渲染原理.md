### 渲染流程

- `React.createElement`或`JSX`编写`React`组件，实际上 JSX 代码最后都会转换成`React.createElement(...)`,`Babel`帮助我们完成这个转换

- `createElement`函数对`key`和`ref`等特殊的`props`进行处理，并获取`defaultProps`对默认`props`进行赋值，并且对传入的孩子节点进行处理，最终构造成一个`ReactElement`对象（也就是`虚拟DOM`)

- `ReactDom.render`将生成好的`虚拟DOM`渲染到指定容器上，其中采用了批处理、事件等机制并且对特定浏览器进行性能优化，最终转换成`真实DOM`

### 批处理和事务

提高性能

### 针对性的性能优化

React 通过`lazyTree`，在 IE（8-11）和 Edge 中进行`单个节点依次渲染`节点，而在其他浏览器中则首先将整个大的 DOM 结构构建好，然后再`整体插入`容器
