//防抖节流结合
function throBounce(fn, delay) {
  let start = parseInt(Date.now(), 10);
  let timer = null;
  return function (...args) {
    const now = parseInt(Date.now(), 10);

    if (now - start >= delay) {
      //如果两次触发的间隔超过你的预留时间
      //就要清除定时器 直接触发
      //其实就是防抖
      clearTimeout(timer);
      timer = null;
      setTimeout(() => {
        fn.apply(this, args);
      }, delay);
      start = now;
    } else {
      //节流触发
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
