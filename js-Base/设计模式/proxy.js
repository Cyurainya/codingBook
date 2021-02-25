//为一个对象提供一个代用品或占位符，以便控制对它的访问

//例如高消耗操作 懒加载

var imgFunc = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();

var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    imgFunc.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      imgFunc.setSrc('./loading.gif');
      img.src = src;
    },
  };
})();

proxyImage.setSrc('./pic.png');
