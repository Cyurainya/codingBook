function sumInput() {
  let numbers = [];
  while (true) {
    let value = prompt('A number please', 0);

    if (value === '' || value === null || !isFinite(value)) break;
    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}
