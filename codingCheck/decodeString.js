const decodeString = (s) => {
  let numStack = []; // 存倍数的栈
  let strStack = []; // 存 待拼接的str 的栈
  let num = 0; // 倍数的“搬运工”
  let result = ''; // 字符串的“搬运工”
  for (const char of s) {
    // 逐字符扫描
    if (!isNaN(char)) {
      // 遇到数字
      num = num * 10 + Number(char); // 算出倍数
    } else if (char == '[') {
      // 遇到 [
      strStack.push(result); // result串入栈
      result = ''; // 入栈后清零
      numStack.push(num); // 倍数num进入栈等待
      num = 0; // 入栈后清零
    } else if (char == ']') {
      // 遇到 ]，两个栈的栈顶出栈
      let repeatTimes = numStack.pop(); // 获取拷贝次数
      result = strStack.pop() + result.repeat(repeatTimes); // 构建子串
    } else {
      result += char; // 遇到字母，追加给result串
    }
  }
  return result;
};

let s = '3[a]2[bc]';
decodeString(s);
