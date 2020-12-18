var a = 1;
function foo() {
  b = 2;
  console.log(b, this.a);
}

function foo1() {
  var a = 4;
  foo();
}
foo1();
