let data = { 1: 222, 2: 123, 5: 888 };
let arr = Array.from({ length: 12 }).map(
  (item, index) => data[index + 1] || null
);
console.log(arr);
