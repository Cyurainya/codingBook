//2. 实现大整数相加算法，两个数用字符串模拟函数
function add(num1, num2) {
  const A = (num1 + '').split('');
  const B = (num2 + '').split('');
  const aLen = A.length,
    bLen = B.length,
    cLen = Math.max(aLen, bLen) + 1;

  const result = [];
  let prefix = 0;
  for (let i = 0; i <= cLen - 1; i++) {
    let a = aLen - i - 1 >= 0 ? parseInt(A[aLen - i - 1]) : 0;
    let b = bLen - i - 1 >= 0 ? parseInt(B[bLen - i - 1]) : 0;
    result[i] = (a + b + prefix) % 10;
    prefix = Math.floor((a + b + prefix) / 10);
  }
  console.log(result.length);
  return result.reverse().join('');
}
let sum = add('999', '1');
console.log(sum);
