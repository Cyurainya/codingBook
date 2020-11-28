function deepCopy(obj) {
  if (typeof obj !== 'object') throw '错误啦 ';
  let res = {};
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      res[key] = deepCopy(obj[key]);
    } else {
      res[key] = obj[key];
    }
  }
  return res;
}
function deepClone(obj) {
  if (!obj) return null;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);

  if (typeof obj !== 'object') {
    return obj;
  }
  let newObj = new obj.__proto__.constructor();
  for (let key in obj) {
    newObj[key] = deepClone(obj[key]);
  }
  return newObj;
}

let ccc = {
  name: 'haha',
  fullname: {
    xixi: 'xixi',
    math: {
      jj: 'jj',
    },
  },
};
console.log(deepCopy(deepClone) === ccc);
