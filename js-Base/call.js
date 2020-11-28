Function.prototype.myCall = function (context = window, ...args) {
  //call是多个参数
  if (this === Function.prototype) {
    //防止Function.prototype.myCall()直接调用
    return undefined;
  }
  const fn = Symbol();

  context[fn] = this;

  const result = context[fn](...args);
  delete context;
  return result;
};

let person = { name: 'speanut' };
function sayHi(age = 20, sex = '女') {
  console.log(this.name, age, sex);
  return 1;
}
sayHi.myCall(person, 23, 'jajja');
