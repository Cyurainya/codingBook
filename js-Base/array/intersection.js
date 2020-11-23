function intersection(firstArray, secondArray) {
  const hashmap = {};
  const intersectionArray = [];

  firstArray.forEach((item) => {
    hashmap[item] = 1;
  });

  secondArray.forEach((item) => {
    if (hashmap[item] == 1) {
      intersectionArray.push(item);
      hashmap[item]++;
    }
  });

  return intersectionArray;
}
const firstArray = [2, 2, 4, 1];
const secondArray = [1, 2, 0, 2];
console.log(intersection(firstArray, secondArray)); // [2, 1]
