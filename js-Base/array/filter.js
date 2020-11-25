function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}
