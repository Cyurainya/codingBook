let a = [1, 2, 3],
  b = [2, 4, 5];

let aSet = new Set(a);
let bSet = new Set(b);

let union = Array.from(new Set(a.concat(b)));

let intersetion = Array.from(new Set(a.filter((v) => bSet.has(v))));

let diff = Array.from(
  new Set(a.concat(b).filter((v) => !aSet.has(v) || !bSet.has(v)))
);

console.log(union);

console.log(intersetion);

console.log(diff);
