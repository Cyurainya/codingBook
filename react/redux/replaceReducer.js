const createStore = function (reducer, initState) {
  function replaceReducer(nextReducer) {
    reducer = nextReducer;
    //刷新一遍state值，新来的reducer把自己默认状态放到state的树上
    dispatchEvent({ type: Symbol() });
  }

  return {
    replaceReducer,
  };
};

const reducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(reducer);

const nextReducer = combineReducers({
  counter: counterReducer,
  info: infoReducer,
});

store.replaceReducer(nextReducer);
