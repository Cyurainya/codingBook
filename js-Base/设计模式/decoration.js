//装饰模式
//原有方法维持不变，在原有方法上再挂在其他方法来满足现有需求；函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂在到某个含书上

Function.prototype.before = function (beforefn) {
  var self = this; //保存原函数引用
  return function () {
    //返回包含了原函数和新函数的‘代理函数’
    beforefn.apply(this, arguments); //执行新函数，修正this
    return self.apply(this, arguments); //执行原函数
  };
};

Function.prototype.after = function (afterfn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};

var func = function () {
  console.log('2');
};
//func1和func3为挂载函数
var func1 = function () {
  console.log('1');
};
var func3 = function () {
  console.log('3');
};
func = func.before(func1).after(func3);
func();
