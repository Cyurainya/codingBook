Promise.allSeleted = function (promises) {
  let count = 0;
  let result = [];
  return new Promise(
    (resolve, reject) => {
      result[index] = {
        value: res,
        reason: null,
      };
    },
    (err) => {
      result[index] = {
        value: null,
        reason: err,
      };
    }
  ).finnally(() => {
    count++;
    if (count == promises.length) {
      resolve(result);
    }
  });
};
