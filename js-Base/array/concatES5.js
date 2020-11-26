let union = a.concat(
  b.filter(function (v) {
    return a.indexOf(v) === -1;
  })
);

let intersection = a.filter(function (v) {
  return b.indexOf(v) > -1;
});

let diif = a
  .filter(function (v) {
    return b.indexOf(v) === -1;
  })
  .concat(
    b.filter(function (v) {
      return a.indexOf(v) === -1;
    })
  );
