//单例对象 一个类只有一个实例，并提供一个访问塔的全局访问点。
//先判断实力存在与否，如果存在则直接返回，如果不存在就创建了在返回。

class CreateUser {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
}

//代理实现单例模式
var ProxyMode = (function () {
  var instance = null;
  return function (name) {
    if (!instance) instance = new CreateUser(name);
    return instance;
  };
})();

// 测试单体模式的实例
var a = new ProxyMode('aaa');
var b = new ProxyMode('bbb');
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b); //true
