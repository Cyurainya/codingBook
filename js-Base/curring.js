function curry(func) {
  return function curried(...args) {
    if (args.length > func.length) {
      return func.apply(this, args);
    } else {
      return function pass(...arg2) {
        return curried.apply(this, args.concat(arg2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化
