function throttle1(fn, time) {
  let pre = 0;
  return function (...args) {
    if (Date.now() - pre > time) {
      pre = Date.now();
      fn.apply(this, args);
    }
  };
}

function throttle2(event, time) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        event.apply(this, args);
      }, time);
    }
  };
}
