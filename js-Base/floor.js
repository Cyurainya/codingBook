let climbStairs = function (n) {
  if (n <= 2) return n;
  let n1 = 1;
  let n2 = 2;
  let nn = 0;
  for (let i = 3; i <= n; i++) {
    nn = n1 + n2;
    n1 = n2;
    n2 = nn;
  }
  return nn;
};
