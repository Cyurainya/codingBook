Function.prototype.myBind = function (context, ...args1) {
  if (this === Function.prototype) {
    throw new TypeError('Error');
  }
  const _this = this;
  return function F(...args2) {
    //如果用于构造函数
    if (this instanceof F) {
      return new _this(...args1, ...args2);
    }
    return _this.apply(context, args1.concat(args2));
  };
};
