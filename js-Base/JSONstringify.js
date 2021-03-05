function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== 'object' || type === null) {
    if (/string|undefined|function/.test(type)) {
      //这几个都要加上“”
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = obj && obj.constructor === Array;
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === 'object') {
        v = jsonStringify(v);
      }
      //如果是对象需要加上属性值
      json.push((arr ? ' ' : '"' + k + '":') + String(v));
    }
    return (arr ? '[' : '{') + String(json) + (arr ? '[' : '{');
  }
}
function a() {
  let b = h;
}
jsonStringify({ x: 5 });
// "{"x":5}"
jsonStringify([1, 'false', false]);
// "[1,"false",false]"
jsonStringify({ b: undefined });

// "{"b":"undefined"}"

jsonStringify(Symbol('23'));
