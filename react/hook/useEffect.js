import React, { useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';

let _state, _deps;
function useState(init) {
  _state = _state | init;
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; //如果dependencies不存在
  const hasChangedDeps = _deps
    ? !depArray.every((el, i) => el === _deps[i]) // 两次的 dependencies 是否完全相等
    : true;

  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
}

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('update' + count);
  }, [count]);
  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click
      </button>
    </div>
  );
}

const rootElement = document.getElementById('root');
function render() {
  ReactDOM.render(<App />, rootElement);
}
render();
