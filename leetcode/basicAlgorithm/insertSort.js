function insertSort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

let duplicate = [1, 3, 2, 5, 4, 8, 6, 9, 11, 15, 12, 13, 10, 14, 16];
console.log(insertSort(duplicate));
