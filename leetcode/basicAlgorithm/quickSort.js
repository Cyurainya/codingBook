function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let index = Math.floor(arr.length / 2);
  let pivot = arr.splice(index, 1)[0];
  let left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.pus(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
let arr = [6, 8, 3, 5, 9, 1, 13, 45, 2, 1];
console.log(quickSort(arr));
