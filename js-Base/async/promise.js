const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
  let that = this;
  that.status = PENDING; //状态
  that.value = undefined; //返回的信息
  that.reason = undefined; //拒绝的原因
  that.onFulfilledCallbacks = []; //成功的事件队列
  that.onRejectedCallbacks = []; //reject的事件队列
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach((cb) => cb(that.value));
      }
    });
  }
  function reject(reason) {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED;
        that.value = value;
        that.onRejectedCallbacks.forEach((cb) => cb(that.reason));
      }
    });
  }
  try {
    excutor(resolve, reject);
  } catch {
    reject(e);
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  //处理参数默认值，保证参数后续能够继续执行
  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };
  //已经fulfilled了
  if (that.status === FULFILLED) {
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
  if (that.status === REJECTED) {
    return (newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          rejectPromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
  if (that.status === PENDING) {
    return (newPromise = new Promise((resolve, reject) => {
      that.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(value);
          rejectPromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};
