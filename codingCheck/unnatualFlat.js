// var arr = [
//   [1, 2, '2', 2],
//   [3, 4, 5, 5],
//   [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
//   10,
// ];
// Array.prototype.flat = function () {
//   return [].concat(
//     ...this.map((item) => (Array.isArray(item) ? item.flat() : [item]))
//   );
// };
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// const sort = (a, b) => a - b;
// console.log(arr.flat().unique().sort(sort));
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
a.x = { n: 3 };
console.log(b);
