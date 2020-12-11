Number.prototype.add = function (number) {
  if (typeof number !== 'number') {
    throw new 'please enter a number'();
  }
  return this + number;
};
Number.prototype.minus = function (number) {
  if (typeof number !== 'number') {
    throw new 'please enter a number'();
  }
  return this - number;
};
