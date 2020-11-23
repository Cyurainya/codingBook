const array = [7, 8, 4, 9, 9, 15, 3, 1, 10];
function findMaxDiff(array) {
  if (array.length <= 1) return -1;
  let min = array[0];
  let maxDiff = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] > min && array[i] - min > maxDiff) {
      maxDiff = array[i] - min;
    } else {
      min = array[i];
    }
  }
  return maxDiff <= 0 ? -1 : maxDiff;
}
console.log(findMaxDiff(array));
