function maxRequest(fn, maxNum) {
  return new Promise((resolve, reject) => {
    if (maxNum === 0) {
      reject('request so many times');
      return;
    }
    Promise.resolve(fn())
      .then((value) => {
        resolve(value);
      })
      .catch(() => {
        return maxRequest(fn, maxNum - 1);
      });
  });
}
