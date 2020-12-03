function selectionSort(arr) {
  //每次找后面最小的数 放到前面
  let len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

let duplicate = [1, 3, 2, 5, 4, 8, 6, 9, 11, 15, 12, 13, 10, 14, 16];
console.log(selectionSort(duplicate));
