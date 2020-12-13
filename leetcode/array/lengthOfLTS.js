var lengthOfLIS = function (nums) {
  let n = nums.length;
  if (n <= 1) {
    return n;
  }
  let tail = [nums[0]];
  for (let i = 0; i < n; i++) {
    if (nums[i] > tail[tail.length - 1]) {
      tail.push(nums[i]);
    } else {
      //如果后面的数没有比前面的数大的话
      let left = 0;
      let right = tail.length - 1;
      //找到比num[i]大的最小数 找到之后
      while (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (tail[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      tail[left] = nums[i];
    }
  }
  console.log(tail);
  return tail.length;
};
let arr = [10, 9, 2, 5, 3, 7, 101, 18];
lengthOfLIS(arr);
