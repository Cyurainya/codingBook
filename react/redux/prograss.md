[redux](https://github.com/brickspert/blog/issues/22)

### 历程

```
const craeteStore = function(initState){
    let state = initState;
    let listeners = [];

    //订阅
    function subscribe(listener){
        listeners.push(listener)
    }

    //数据改变
    function changeState(newState){
        state = newState;

        //通知
        for(let i = 0; i < listeners.length; i++){
            const listener = listeners[i];
            listeners()
        }
    }

    function getState(){
        return state
    }

    return {
        subscribe;
        changeState;
        getState
    }
}
```

然后我们使用这个状态管理器来管理多个状态试试

```
    let initState = {
        counter:{
            count:0
        },
        info:{
            name:'',
            description:''
        }
    }

    let store = createStore(initState)
    store.subscribe(()=>{
        let state = store.getState()
        console.log(state.counter.name)
    })

    store.changeState({
        ...store.getState(),
        info:{
            name:'前端人'
            description:'前端魂'
        }
    })
    store.changeState({
        ...store.getState(),
        counter:{
            count:1
        }
    })
```

然后我们得对 changeState 做**限制**

```
    function plan(state,action){
        switch(action.type){
            case 'INCREMENT':
                return {
                    ...state,
                    count:state.count + 1
              }
            case 'DECREMENT':
                return {
                    ...state,
                    count:state.count - 1
                }
            default:
            return state
        }
    }
```

```
const craeteStore = function(initState){
    let state = initState;
    let listeners = [];

    //订阅
    function subscribe(listener){
        listeners.push(listener)
    }

    //数据改变
    function dispatch(newState){
        state = newState;

        //添加在我的state中
        state = reducer(state,action)
        //通知
        for(let i = 0; i < listeners.length; i++){
            const listener = listeners[i];
            listeners()
        }
    }

    function getState(){
        return state
    }

    return {
        subscribe;
        changeState;
        getState
    }
}
```

> 所以 reduce 就是接受要给老的 State，返回一个新的 state，我们通常把一些 reducer 分割管理，每个 reudcer 管理一个 state

**然后用`combineReducers`函数来把多个 reducer 函数合并成一个 reducer 函数。**

```
const reducer = combineReducers({
    counter : counterReducer,
    info:infoReducer
})
```

接下来实现一些`combineReducers`函数

```
function combineReducer(reducers){
    //reducersKeys = ['counter','info']
    const reducerKeys = Object.keys(reducers)

    //合并完成之后返回一个新的reducer函数
    return function combination(state = {},action){
        //生成一个新的State
        const nextState = {}

        //遍历执行所有的reducers，整合成为一个新的state
        for(let i = 0; i < reducerKeys.length; i++){
            const key = reducerKey[i];
            const reducer = reducers[key];
            //之前的key的state
            const previousStateForKey = state[key]

            //执行分reducer,获得新的state
            const nextStateForKey = reducer(previousStateForKey,action)

            nextState[key] = nextStateForKey
        }
        return nextStete
    }
}
```

**接下来我们对 state 进行拆分和合并**

1. 实现一个 counterReducer

```
    let initState = {
        count:0
    }
    function counterReducer(state,action){
        if(!state){
            state = initState
        }
        switch(action.type){
            case 'INCREMENT':
                return {
                    count: state.count + 1
                }
            default:
            return state
        }
    }
```

2. 对 createStore 加一个 dispatch

   1.createStore 的时候，用一个不匹配任何 type 的 action，来触发`state = reducer(state,action)`

   2. 因为 action.type 不匹配，每个子 reducer 都会进到 default 项，返回自己初始化的 state,这样就获得初始化的 state 树了

```
const createStore = function (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }
  /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState
  }
}
```

### 中间件 middleware

    中间件其实就是把中间处理的东西整合

```
const store = createStore(reducer);
const next = store.dispatch;

const loggerMiddleware = (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

store.dispatch = (action) => {
  try {
    loggerMiddleware(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}
```

整合一下，做一个动态的中间件

```
const store = createStore(reducer);
const next  = store.dispatch;

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

const logger = loggerMiddleware(store);
const exception = exceptionMiddleware(store);
store.dispatch = exception(logger(next));
```

> 来一个小 demo，在打印日志之前输出当前的时间戳

```
const timeMiddleware = (store) => (next) => (action) =>{
    console.log('time',new Date().getTime());
    next(action)
}
const time = timeMiddleware(store);
store.dispatch = exception(time(logger(next)))
```

> 实现多个中间件的封装

```
/*接收旧的 createStore，返回新的 createStore*/
const newCreateStore = applyMiddleware(exceptionMiddleware,timeMiddleware, loggerMiddleware)(createStore);

/*返回了一个 dispatch 被重写过的 store*/
const store = newCreateStore(reducer);
```

> 然后实现 applyMiddleware

```
const applyMiddleware = function (...middlewares){
    //返回一个重写createStore的方法
    return function rewriteCreateStoreFunc(oldCreateStore){
        /*返回重写后新的 createStore*/
        return function newCreateStore(reducer,initState){
            //1.生成store
            const store = oldCreateStore(reducer,initState);
            const chain = middlewares.map(middleware => middleware(store));
            let dispatch = store.dispatch;
            //把 [A, B, C] 转换成 A(B(C(next)))
            chain.reverse().map(middleware => {
                dispatch = middleware(dispatch)
            })
            //2.重写dispatch
            store.dispatch = dispatch;
            return store
        }
    }
}
```

```
const chain = [A,B,C];
let dispatch = store.dispatch;
chain.reverse().map(middleware => {
    dispatch = middleware(dispatch)
})
```

上面把 [A, B, C] 转换成 A(B(C(next)))的方法可以改成

```
const chain = [A, B, C];
dispatch = compose(...chain)(store.dispatch)
```

那他内部是怎么样实现的呢

```
export default function compose(...funcs){
    if(funcs.length === 1){
        return funcs[0]
    }
    return funcs.reduce((a,b) => (...args) => a(b(...args)))
}
```

### 总结

- **creatStore**
  创建 store 对象，包括 getState,dispatch,subscribe,replaceReducer
- **reducer**

  reducer 是一个计划函数，接受旧的 state 和 action，生成新的 state

- **action**

  action 是一个对象，必须包含 type 字段

- **dispatch**

  dispatch（action）触发 action，生成新的 state

- **subscribe**

  实现订阅功能，每次触发 dispatch 的时候都会执行订阅函数

- **combineReducers**

  多个 reducer 合并成一个 reducer

- **replaceReducer**

  替换 reducer 函数

- **midleware**

  扩展 dispatch 函数
