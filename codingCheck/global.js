var value = 1;
function foo() {
  console.log(value);
}
function bar() {
  value = 2;
  foo();
}
bar();

var x = 1;
function aa() {
  console.log(x);
  var x = 2;
  bb();
}
function bb() {
  console.log(x);
}
aa();
