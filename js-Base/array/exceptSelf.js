const firstArray = [2, 2, 4, 1];
const secondArray = [0, 0, 0, 2];
const thirdArray = [-2, -2, -3, 2];

function productExceptSelf(arr) {
  const ret = [];
  for (let i = 0, temp = 1; i < arr.length; i++) {
    ret[i] = temp;
    temp *= arr[i];
  }
  //这个时候ret[i]就是前i个元素相乘的结果（不包括i）
  //所以将除i外 i后面的结果乘上去就可以
  for (let i = arr.length - 1, temp = 1; i >= 0; i--) {
    ret[i] *= temp;
    temp *= arr[i];
  }
  console.log(ret);
  return ret;
}

productExceptSelf(firstArray); // [8, 8, 4, 16]
productExceptSelf(secondArray); // [0, 0, 0, 0]
productExceptSelf(thirdArray); // [12, 12, 8, -12]
