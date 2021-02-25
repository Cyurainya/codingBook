//将算法的使用算法的实现分离开来

//至少有两个部分组成

//第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程
//第二个部分是环境类Context,COntext接受客户的请求，随后将请求委托给某一个策略类，Context要维持对某个策略对象的引用

var levelOBJ = {
  A: function (money) {
    return money * 3;
  },
  B: function (money) {
    return money * 4;
  },
  C: function (money) {
    return money * 2;
  },
};

var calculateBouns = function (level, money) {
  return levelOBJ[level](money);
};
console.log(calculateBouns('A', 10000));
