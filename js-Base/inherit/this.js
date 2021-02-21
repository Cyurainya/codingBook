var obj = {
  foo: function () {
    console.log(this);
  },
};

var bar = obj.foo;
obj.foo(); // 打印出的 this 是 foo
bar(); // 打印出的 this 是 window

//obj.foo() 转化为obj.foo.call(obj)

//bar()
// 转换为 bar.call()
// 由于没有传 context
// 所以 this 就是 undefined
// 最后浏览器给你一个默认的 this —— window 对象
