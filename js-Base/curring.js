function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      func.apply(this, args);
    } else {
      return function pass(...arg2) {
        return curried(this, args.concat(arg2));
      };
    }
  };
}
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));
