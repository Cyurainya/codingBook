function Person(name) {
  this.name = name;
}
Person.prototype.eat = function () {
  console.log('eating');
};
function create() {
  //1. 获取构造函数，并且删除arguments中的第一项
  var Con = [].shift.call(arguments);

  //2.创建一个空的对象并连接到构造函数的原型上，使它能访问原型中的属性
  var obj = Object.create(Con.prototype);

  //3.改变this指向
  var ret = Con.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
var linda = create(Person, 'Linda');
console.log(linda);
linda.eat();
