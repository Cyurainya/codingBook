

function path(str, obj) {
  const strArr = str.split('.');
  let newArr =[];
  for(let i in strArr){
    let ifHasNum = strArr[i].search(/\d/g)
    if(ifHasNum == -1){
      newArr.push(strArr[i])
    }else{
       newArr.push(strArr[i].split('[')[0])
       newArr.push(strArr[i].charAt(ifHasNum))
    }
   
  }
  let result = obj ;
  for(let item of newArr){
    if(result[item] === undefined){
      console.log('undefiend')
      return
    }
    result = result[item];
  }

  console.log(result)
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
path('foo.bar[1].test', {
  foo: {
    bar: [
      {
        test: 'test',
      },
    ],
  },
}); // => 'undefined'
