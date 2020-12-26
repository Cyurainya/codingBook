//通过闭包把dispatch和actionCreatory隐藏起来，让其他地方感知不到redux的存在
const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer,
});

const store = createStore(reducer);
/*返回 action 的函数就叫 actionCreator*/
function increment() {
  return {
    type: 'INCREMENT',
  };
}

function setName(name) {
  return {
    type: 'SET_NAME',
    name: name,
  };
}

const actions = {
  increment: function () {
    return store.dispatch(increment.apply(this, arguments));
  },
  setName: function () {
    return store.dispatch(setName.apply(this, arguments));
  },
};

actions.increment(); /*自增*/
actions.setName('九部威武'); /*修改 info.name*/

const actions = bindActioncreatos({ increment, setName }, store.dispatch);

function bindActioncreatos(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
export default function bindActioncreatos(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error();
  }
  const keys = Object.keys(actionCreators);
  const boundActionCreators = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActioncreatos(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
