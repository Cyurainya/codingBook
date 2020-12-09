const arr1 = ['', 1, 3];
const arr2 = ['', '', 9, 3];
const arr3 = ['', '', 5, '', 3];
const arr4 = ['', '', 7, '', '', 3];
//要求输出1 9 5 7
function firstNum(...args) {
  let result = [];
  args.forEach((item) => {
    for (let i of item) {
      if (i !== '') {
        result.push(i);
        break;
      }
    }
  });
  return result;
}
console.log(firstNum(arr1, arr2, arr3, arr4));
