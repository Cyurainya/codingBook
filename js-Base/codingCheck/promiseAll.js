function promiseAll(promiseList) {
  const result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i in promiseList) {
      if (promiseList[i] instanceof Promise) {
        Promise.resolve(promiseList[i]).then(
          (res) => {
            count++;
            result[index] = res;
            if (count == promiseList.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        break;
      }
    }
  });
}

const p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
const p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
const str = '';
const p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p1, str, p2, p3]).then((res) => {
  console.log(res);
});
