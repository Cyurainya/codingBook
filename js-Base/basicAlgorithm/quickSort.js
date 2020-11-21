function swap(items, firstIndex, secondIndex) {
  let temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right) {
  let pivot = items[Math.floor(left + (right - left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
    //拿到基数
    index = partition(items, left, right);
    //左边排序
    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }
    //右边排序
    if (index < right) {
      quickSort(items, index, right);
    }
  }
  return items;
}

let items = [3, 8, 7, 2, 9, 4, 10];
let result = quickSort(items, 0, items.length - 1);
console.log(result);
