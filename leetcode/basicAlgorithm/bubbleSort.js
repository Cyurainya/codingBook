function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1 - i; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
let duplicate = [1, 3, 2, 5, 4, 8, 6, 9, 11, 15, 12, 13, 10, 14, 16];
console.log(bubbleSort(duplicate));
