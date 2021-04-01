const a = { b :3}

function foo(obj) {
  obj.b = 5

  return obj
}

const aa = foo(a)

console.log(a.b)

console.log(aa.b)