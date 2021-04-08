//春节期间小明使用微信收到很多个红包，非常开心。在查看领取红包记录时发现，
//某个红包金额出现的次数超过了红包总数的一半。请帮小明找到该红包金额。写出具体算法思路和代码实现，要求算法尽可能高效。

//给定一个红包的金额数组gifts及它的大小n，请返回所求红包的金额。

//若没有金额超过总数的一半，返回0。

//某红包出现的次数 多于红包sum / 2

const pockeyArr = [1, 2, 3, 2, 2]
function findLucky1(list) {
  //map是最简单的解法 但是空间复杂度太大
  const m = new Map()
  for (let k of list) {
    if (m.has(k)) {
      let count = m.get(k)
      m.set(k, count + 1)
    } else {
      m.set(k, 1)
    }
  }
  let max = 1
  let maxKey = 1
  for (let [key, value] of m) {
    if (value >= max) {
      max = value
      maxKey = key
    }
  }
  return maxKey
}

function findLucky2(list) {
  list.sort((a, b) => a - b)
  let maxCount = 1
  let count = 1
  let result = 0
  for (let i = 1; i < list.length; i++) {
    if (list[i] === list[i - 1]) {
      count++
      if (maxCount <= count) {
        maxCount = count
        result = list[i]
      }
    } else {
      count = 1
    }
  }
  console.log(result)
}
findLucky2(pockeyArr)
