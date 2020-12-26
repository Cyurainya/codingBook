### 作用

当指定的 start 发生变化的时候，才允许重新计算新的 result

例子的`computeExpensiveFunc` 是一个复杂运算

```
const App = (props) =>{
    const [boolean,setBoolean] = useState(false);
    const [start,setStart] = useState(0)

    const result = computeExpensiveFunc(start,[start])
}

```

### 而`useCallback`就是相对组件的

相对的 State 变化时，才出发组件的 render
