let x = { a: 2, b: 4 };
let y = x;
y.a = 6;
delete y.b;
console.log(x);
console.log(y.b);
