let arr = [[1, [1, 2, 3], 1, 2, [3, 4]]];

//列举多种方法

//1
console.log(arr.flat(Infinity));

//2
function flat1(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flat1(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
console.log(flat1(arr));

//while循环
function flat2(arr) {
  let newArr = arr;
  while (newArr.some((item) => Array.isArray(item))) {
    newArr = [].concat(...newArr);
    console.log(newArr);
  }
  return newArr;
}
console.log(flat2(arr));

//reduce
function flatByReduce(arr) {
  const arrReduce = arr;
  return arrReduce.reduce((res, next) => {
    return res.concat(Array.isArray(next) ? flatByReduce(next) : next);
  }, []);
}

//byStack
function flatByStack(arr) {
  const stack = [...input];
  const result = [];
  while (stack.length) {
    const first = stack.shift();
    if (Array.isArray(first)) {
      stack.unshift([...first]);
    } else {
      result.push(first);
    }
  }
  return result;
}

console.log(flatByReduce(arr));
