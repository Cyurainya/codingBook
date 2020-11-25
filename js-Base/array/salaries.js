function topSalary(salaries) {
  let max = 0;
  let maxName = null;
  for (let [name, salary] of Object.entries(salaries)) {
    if (max < salary) {
      max = salary;
      maxName = name;
    }
  }

  return maxName;
}
let user = {
  name: 'John Smith',
  age: 35,
};

let user2 = JSON.parse(JSON.stringify(user));
console.log(user2);
