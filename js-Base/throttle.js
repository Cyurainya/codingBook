function throttle(fn, delay) {
  let start = +Date.now(); //上一次
  let timer = null;
  return function (...args) {
    const now = +Date.now(); //这次触发
    if (now - start >= delay) {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, args);
      start = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
