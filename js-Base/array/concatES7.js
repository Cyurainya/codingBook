let a = [1, 2, 3],
  b = [2, 4, 5];

let union = a.concat(b.filter((v) => !a.includes(v)));

let intersection = a.filter((v) => b.includes(v));

let diff = a.concat(b).filter((v) => !a.includes(v) || !b.includes(v));
