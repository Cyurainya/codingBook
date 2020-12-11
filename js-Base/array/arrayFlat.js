let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
const falt = (arr) => {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};

function reduceFlat(arr) {
  return arr.reduce((acc, item) => {
    return Array.isArray(item) ? [...acc, ...reduceFlat(item)] : [...acc, cur];
    // return acc.concat(Array.isArray(item) ? reduceFlat(item) : item);
  }, []);
}
