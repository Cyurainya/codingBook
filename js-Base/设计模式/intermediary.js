//中介者模式

//通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用。而当其中的一个对象发生改变时，只需要通知中介对象即可。
//通过中介者模式可以解除对象与对象之间的紧耦合关系

var goods = {
  //手机库存
  'red|32G': 3,
  'red|64G': 1,
  'blue|32G': 7,
  'blue|32G': 6,
};

var mediator = (function () {
  var colorSelect = document.getElementById('colorSelect');
  var memorySelect = document.getElementById('memorySelect');
  var numSelect = document.getElementById('numSelect');
  return {
    changed: function (obj) {
      switch (obj) {
        case colorSelect:
          //do something
          break;
        case memorySelect:
          //do something
          break;
        case numSelect:
          //do something
          break;
      }
    },
  };
})();

colorSelect.onchange = function () {
  mediator.changed(this);
};
memorySelect.onchange = function () {
  mediator.changed(this);
};
numSelect.onchange = function () {
  mediator.changed(this);
};
