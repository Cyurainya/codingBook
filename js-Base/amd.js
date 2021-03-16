define(function () {
  var consoleName = function (str) {
    console.log('I am' + str);
  };
  var consoleAge = function(num){
    console.log(("I am " + num + " years old");
  }
  return {
      consoleName:consoleName,
      consoleAge:consoleAge
  }
});
