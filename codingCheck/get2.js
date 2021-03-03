let obj = {};
function changeValue(obj) {
  obj.name = 'ConardLi';
  obj = { name: 'code秘密花园' };
}
changeValue(obj);
console.log(obj);
