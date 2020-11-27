// let fun = 'function(){console.log(123);}';
// let f1 = new Function('console.log(123)')();
// let f2 = new Function('return ' + fun)();
// f2();

function path(str, obj) {
  let strArr = str.split('.');
  console.log(obj);
  strArr.forEach((item, index) => {
    let objItem = JSON.stringify(item);
    new Function('console.log(' + obj + '.' + objItem + ')');
  });
  //console.log(new Function(obj + '.' + str)());
}

path('foo.bar[0].test', {
  foo: {
    bar: [
      {
        test: 'test',
      },
    ],
  },
}); // => 'test'
// path('foo.bar[1].test', {
//   foo: {
//     bar: [
//       {
//         test: 'test',
//       },
//     ],
//   },
// }); // => 'undefined'
