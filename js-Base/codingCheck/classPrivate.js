function People() {}

People.prototype = (function () {
  var self = this;
  var _notPublicProperty = 2;
  function _notPublicMethod() {
    return _notPublicProperty;
  }

  return {
    constructor: People,
    getNotPublicProperty: function () {
      return _notPublicMethod.call(self);
    },
  };
})();

var Bob = new People();
console.log(People);
console.log(Bob.getNotPublicProperty()); // 2
console.log(Bob.constructor); // ReferenceError: _notPublicProperty is not defined
