//实现ES5中Function原型的bind方法， 使得以下程序最后能输出'success'

function Animal(name, color) {
  this.name = name;

  this.color = color;
}

Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`;
};
const Cat = Animal.bind(null, 'cat');

const cat = new Cat('white');
if (
  cat.say() === "I'm a white cat" &&
  cat instanceof Cat &&
  cat instanceof Animal
) {
  console.log('success');
}
