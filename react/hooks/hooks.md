## hook 原理

### 1. 初始化

![初始化图片](./init.png)

### 2.初次渲染

    每次（使用useState或者useEffect）渲染更新一次memoixedState，即维护hooks的队列，下标cursor也做相对应的更新

    可以注意到，useEffect使用的时候使用数组更新的

`const [count,setCount] = useState(0)`

`useEffect(()=>{console.log(count)},[count])`

![初次渲染](./first-render.png)

### 3. 事件触发

每次事件触发 cursor 会重新**更新为 0**

![事件触发](./event.png)

### 4. Re Render

![re-render](./re-render.png)

### 接下来可以回答相应的问题了

Q：为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或者子函数中调用。

A：memoizedState 数组是按 hook 定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。

Q：自定义的 Hook 是如何影响使用它的函数组件的？

A：共享同一个 memoizedState，共享同一个顺序。

Q：“Capture Value” 特性是如何产生的？

A：每一次 ReRender 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作。

### useState 和 useEffect 组合

```
let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}
```

## 使用 hook 的动机

1. 减少状态太逻辑复用

   mixin 的状态逻辑就是可以相互覆盖的，hook 就不会

2. 避免地狱式嵌套
   hoc 的地狱式嵌套会非常深

3. 让组件更容易理解

他们拥有自己的各种状态，然后将组件分割成更小的各种更小的函数

4. 使用函数代替 class

class 比函数好用

## 闭包陷阱

我们知道 hooks 的原理是有闭包的，memoizedState 数组是按 hook 定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到，所以 react 是通过判断以来是否有改变，改变了才会执行回调函数，我们来看下面的代码

```javascript
function App() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    setInterval(() => {
      console.log(count);
    }, 1000);
  }, []);
  function click() {
    setCount(2);
  }
}
```

现在有这样一个场景：组件第一次渲染执行 `App()`，执行 `useState` 设置了初始状态为 `1`，所以此时的 `count` 为 1。然后执行了 `useEffect`，回调函数执行，设置了一个定时器每隔 `1s` 打印一次 `count`。接着，当我们再次调用`click()`的时候，就会触发 react 的更新，这个时候也是执行 App(),那`useState`就会将`Hook`对象上保存的状态为`2`。但是由于在执行 useEffect 由于依赖数组是一个空的数组，所以此时回调并不会被执行。在整个过程中，定时器一直执行，且设置`count`为 1，这个闭包就被一直保存着了。

### 参考文章

[React hook 原理](https://github.com/brickspert/blog/issues/26)
[react about hoc 等组件服用](https://juejin.cn/post/6844903815762673671#heading-33)
[轻松掌握 React Hooks 底层原理](https://segmentfault.com/a/1190000038768433)
