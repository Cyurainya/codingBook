var missingNumber = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (mid === nums[mid]) {
      //证明小的数在右边
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
console.log(missingNumber([0, 1, 3]));
