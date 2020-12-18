function Observer() {
  this.observerContainer = [];
}
Observer.prototype.subscribe = function (element) {
  this.observerContainer.push(element);
};
// 下面是从 container 中移除一个元素
Observer.prototype.unsubscribe = function (element) {
  const elementIndex = this.observerContainer.indexOf(element);
  if (elementIndex > -1) {
    this.observerContainer.splice(elementIndex, 1);
  }
};
/**
 * we notify elements added to the container by calling
 * each subscribed components added to our container
 */
Observer.prototype.notifyAll = function (element) {
  this.observerContainer.forEach(function (observerElement) {
    observerElement(element);
  });
};
