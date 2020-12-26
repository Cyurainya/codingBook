import React from 'react';
import ReactDOM, { render } from 'react-dom';
let _state; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state | initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击
      </Button>
    </div>
  );
}

const rootElement = document.getElementById('root');

function render() {
  ReactDOM.render(<App />, rootElement);
}
render();
