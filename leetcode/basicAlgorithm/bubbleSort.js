function bubbleSort(arr) {
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = 0; j < arr.length - i - 1; j++) {
  //     if (arr[j] > arr[j + 1]) {
  //       [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  //     }
  //   }
  // }
  // return arr;
  let i = arr.length - 1;

  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    i = pos;
  }
  return arr;
}

let duplicate = [1, 3, 2, 5, 4, 8, 6, 9, 11, 15, 12, 13, 10, 14, 16];
console.log(bubbleSort(duplicate));
