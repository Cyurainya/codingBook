const unsortedArray = [-10, 7, 29, 30, 5, -10, -70];

function computeProduct(nums) {
  nums.sort((a, b) => b - a);
  while (nums.length < 3) nums.push(1);
  let max1 = nums[0] * nums[1] * nums[2];
  let max2 = nums[nums.length - 1] * nums[nums.length - 2] * nums[0];
  return Math.max(max1, max2);
}

console.log(computeProduct(unsortedArray)); // 21000
