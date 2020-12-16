class A {
  constructor(name) {
    this.name = name;
  }
  getF() {
    console.log(this);
  }
}
const a = new A();
const funcA = a.getF.bind(A);
funcA();
