const arr = ['1', 'a', 1, '1', 'a', 'b', 'c'];
console.log(Array.from(new Set(arr)));

//不用api
const newArr = [];
for (let i = 0; i < arr.length; i++) {
  if (newArr.indexOf(arr[i]) === -1) {
    newArr.push(arr[i]);
  }
}
console.log(newArr);

//filter
function filterUnique(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}
console.log(filterUnique(arr));
