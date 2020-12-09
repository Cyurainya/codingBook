function foo() {
  Promise.all([p1, p2])
    .then((arr) => {
      return arr;
    })
    .then((res) => {
      return res;
    })
    .then((r3) => {
      console.log(r3);
    });
}
let p1 = new Promise((resolve) => {
  setTimeout(() => resolve(1), 1000);
});
let p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
let p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 1000);
});
foo();
