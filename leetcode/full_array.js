let list = [
  ['A', 'B', 'C'],
  ['A1', 'B1', 'C1'],
  ['A2', 'B2'],
];

function compose(arr) {
  let len = arr.length;
  let res = [];
  const dfs = (index, path) => {
    if (index === len) {
      res.push([...path]);
      return;
    }
    let item = arr[index];
    for (let i = 0; i < item.length; i++) {
      path.push(item[i]);
      dfs(index + 1, path);
      path.pop();
    }
  };
  dfs(0, []);
  return res.map((item) => item.join(''));
}
console.log(compose(list));
