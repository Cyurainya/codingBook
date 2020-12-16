function A(name) {
  this.name = name;
}
A.prototype.getF = function () {
  'use strict';
  console.log(this);
};
const a = new A();
const funcA = a.getF;
funcA();
