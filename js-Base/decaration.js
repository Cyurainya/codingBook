let worker = {
  slow(x, y) {
    console.log(`Called with ${x}, ${y}`);
    return min + max;
  },
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function () {
    let keys = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments);
    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert(worker.slow(3, 5)); // works
alert('Again ' + worker.slow(3, 5)); // same (cached)
