function printNumbers(from, to) {
  let currentNum = from;
  function go() {
    console.log(currentNum);
    if (currentNum == to) {
      clearInterval(timerId);
    }
    currentNum++;
  }

  go();
  let timerId = setInterval(go, 1000);
}
console.log(printNumbers(1, 5));
