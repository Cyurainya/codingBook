let sleep = {
  // sleep  in promise;
  sleepInPromise: function (delayTime) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve('do something in promise');
      }, delayTime);
    });
  },
  sleepInGenerator: function* (delayTime) {
    yield new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('do in generator');
      }, delayTime);
    });
  },
  sleepInES5: function (callback, delayTime) {
    if (typeof callback === 'function') {
      setTimeout(() => {
        callback();
      }, delayTime);
    }
  },
};
// 执行函数；
function doSomeThing() {
  console.log('sleepInES5');
}
sleep.sleepInES5(doSomeThing, 1000);

// 执行函数
sleep
  .sleepInPromise(1000)
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });
// 执行函数
sleep
  .sleepInGenerator(1000)
  .next()
  .value.then((res) => {
    console.log(res);
  });
// async 函数声明；
async function sleepAsync(delayTime) {
  let result;
  try {
    result = await sleep.sleepInPromise(delayTime);
  } catch (e) {
    console.log(e);
  }
  console.log(result);
}
// 执行函数
sleepAsync(1000);
