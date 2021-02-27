var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b);
  let count = 0;
  function binarySearch(arr, left, right, sum) {
    //找出小于sum的最大的那个数
    while (right >= left && right < arr.length) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] > sum) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
      return left;
    }
  }

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      let k = binarySearch(nums, j + 1, nums.length - 1, nums[i] + nums[j]);
      if (nums[k] < nums[i] + nums[j]) {
        //最近的这个数是可以用的
        count += k - j;
      } else {
        count += k - j - 1;
      }
    }
  }
  return count;
};
triangleNumber([24, 3, 82, 22, 35, 84, 19]);
console.log(triangleNumber([66, 99, 36, 44, 26, 99, 32, 64, 19, 69]));

if (!nums || nums.length < 3) return 0;
let count = 0;
// 排序
nums.sort((a, b) => a - b);
for (let k = nums.length - 1; k > 1; k--) {
  let i = 0,
    j = k - 1;
  while (i < j) {
    if (nums[i] + nums[j] > nums[k]) {
      count += j - i;
      j--;
    } else {
      i++;
    }
  }
}
return count;
