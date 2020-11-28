Function.prototype.MyApply = function (context, args) {
  //防止Function.prototype.myApply直接调用
  if (this === Function.prototype) {
    return undefined;
  }
  const fn = Symbol();
  context[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};
