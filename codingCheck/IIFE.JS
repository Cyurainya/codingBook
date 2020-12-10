var name = 'Tom';
(function (name) {
  console.info('name', name);
  console.info('typeof name', typeof name);
  if (typeof name == 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})(name);
