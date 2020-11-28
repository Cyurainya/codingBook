function newFactory(ctor, ...args) {
  //实例可以访问到私有属性
  //可以访问到构造原型所在的原型链上的属性
  //如果构造函数返回的结果不是引用类型

  //先判断ctor 必须是函数
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  let obj = new Object();
  obj.__proto__ = Object.create(ctor.prototype);

  //改变this指向
  let res = ctor.apply(obj, ...args);
  let isObject = typeof res === 'object' && typeof res !== null;
  let isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}
