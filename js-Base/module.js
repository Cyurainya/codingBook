//commonjs  同步加载 主要用于modejs服务器编程
//exports上的方法和变量是私有的
//特点：所有代码都运行在模块作用域，不会污染全局作用域
// 可以多次加载，但是只会在第一次运行一次，然后就被缓存，以后再加载就直接读缓存结果。要想模块再次运行，必须清除模块
//模块加载的顺序，按照其在代码中出现的顺序

// var foobar = new foobar();
// exports.foobar = foobar;
// var test = require('./foobar').foobar;

//AMD Asynchromous Module Definition 异步模块定义
// define(function (require, exports, module) {
//   var reqModule = require('./fdf');
//   requModule.test();
//   exports.asplode = function () {};
// });

//CMD Common Module Definition 通用模块定义
//和AMD的区别：1、 AMD是提前执行的 CMD是延迟执行的  2、CMD推崇依赖就近 AMD推崇依赖前置

//UMD Universal Module Definition 希望解决跨平台解决方案
//先判断是否支持nodejs模块是否存在，存在则使用nodejs模块模式
//再判断是否支持AMD define是否存在，存在则使用AMD方式加载模块
(function (window, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    window.eventUtil = factory();
  }
});
