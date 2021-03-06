let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState];
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

function useEffect(callback, depArray) {}

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('fan');
  useEffect(() => {
    console.log(count);
  }, [count]);
  useEffect(() => {
    console.log(username);
  }, [username]);
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
      <div>{username}</div>
      <Button
        onClick={() => {
          setUsername(username + ' hello');
        }}
      >
        点击
      </Button>
    </div>
  );
}

const rootElement = document.getElementById('root');

function render() {
  cursor = 0;
  ReactDOM.render(<App />, rootElement);
}
render();
