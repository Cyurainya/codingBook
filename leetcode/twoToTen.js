let arr1 = [1, 5, 7, 10];
let arr2 = [2, 6, 7, 8];
function concat(arr1, arr2) {
  let newArr = [];
  let i = 0,
    j = 0;
  let arr1Len = arr1.length;
  let arr2Len = arr2.length;
  while (i < arr1Len && j < arr2Len) {
    if (arr1[i] < arr2[j]) {
      newArr.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      newArr.push(arr2[j]);
      j++;
    } else {
      //两个相等
      newArr.push(arr1[i]);
      i++;
      j++;
    }
  }

  if (i < arr1Len - 1) {
    newArr = newArr.concat(arr2.slice(j));
  } else {
    newArr = newArr.concat(arr1.slice(i));
  }
  return newArr;
}
console.log(concat(arr1, arr2));
