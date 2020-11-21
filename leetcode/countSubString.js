function countSubstrings(s) {
  const n = s.length;
  let ans = 0;
  for (let i = 0; i < 2 * n - 1; ++i) {
    let l = i / 2,
      r = i / 2 + (i % 2);
    while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
      --l;
      ++r;
      ++ans;
    }
  }
  return ans;
}
console.log(countSubstrings('aaa'));
