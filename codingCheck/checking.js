for (let i = 0; i < nums1.length; i++) {
  //如果num2没有这个数就删除它
  if (nums2.indexOf(nums1[i]) !== -1) {
    nums1.splice(i, 1);
  }
}
return nums1;
