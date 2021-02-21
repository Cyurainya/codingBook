function foo() {
  var test = 1;
  let myname = 'LuckyWinty';
  try {
    {
      console.log(myname);
      let myname = 'winty';
    }
  } catch (ex) {
    console.error(ex);
  }
  console.log(test, '---', myname);
}
foo();
