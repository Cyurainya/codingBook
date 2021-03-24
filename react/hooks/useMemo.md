### 作用

当指定的 start 发生变化的时候，才允许重新计算新的 result

> 使用 `Object.is()`进行比较

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





简单来说就是

```javascript
if(依赖项和一缓存依赖项相同){
    返回已缓存计算结果
}else{
    执行计算函数，获取新计算结果
    缓存新计算结果和新依赖项
    返回新计算结果
}
```


### 组件初始化：

1. 执行计算函数，获取计算结果
2. 缓存结果结果和依赖项
3. 返回计算结果