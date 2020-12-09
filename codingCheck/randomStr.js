function randomStr() {
  //随机字母
  let lowerLetter = String.fromCharCode(
    Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)
  );
  let upperLetter = String.fromCharCode(
    Math.floor(Math.random() * 26) + 'A'.charCodeAt(0)
  );
  //随机数字
  let num = Math.floor(Math.random() * 10);

  //生成8 - 32的一个随机数
  let length = Math.floor(Math.random() * 24) + 8;

  let result = new Array(length);

  //再生成三个随机数
  result[Math.floor(Math.random() * length)] = lowerLetter;
  result[Math.floor(Math.random() * length)] = upperLetter;
  result[Math.floor(Math.random() * length)] = num;

  for (let i = 0; i < length; i++) {
    const newArr = [
      String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)),
      String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt(0)),
      Math.floor(Math.random() * 10),
    ];
    //生成0 到 2 的随机数
    let newNum = Math.floor(Math.random() * 3);
    if (!result[i]) {
      result[i] = newArr[newNum];
    }
  }
  return result;
}
console.log(randomStr());
