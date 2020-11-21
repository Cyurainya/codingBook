function promiseAll(promiseList) {
  const result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseList.forEach((promise, index) => {
      Promise.resolve(promise).then(
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
    });
  });
}
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});

let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p1, p2, p3]).then((res) => {
  console.log(res);
});
