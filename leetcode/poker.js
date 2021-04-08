// 1.三张牌一样即为豹子

// 2.三张牌相连为顺子（A23不算顺子）

// 3.有且仅有两张牌一样为对子 豹子>顺子>对子>普通牌型

// 在牌型一样时，比较牌型数值大小（如AAA>KKK,QAK>534，QQ2>10104） 在二人均无特殊牌型时，依次比较三张牌中最大的。大的人获胜，
// 如果最大的牌一样，则比较第二大，以此类推（如37K>89Q） 如二人牌面相同，则为平局。
// 1代表玩家1赢   0代表平局   -1代表玩家2赢   -2代表不合法的输入
function poker(player1, player2) {
  //palyer的牌数不确定
  const pokerList = [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]
  let result = 0
  if (play1.length < 3 || play2.length < 1) return -2
  //豹子 三个相同
  const baoZi = player => {
    let maxResult = 0
    let playArr = player.split('').sort() //先排列
    for (let i = 0; i < playArr.length; i++) {
      if (
        (playArr[i] == playArr[i + 1]) == playArr[i + 2] &&
        (pokerList.indexOf(playArr[i]) > pokerList.indexOf(maxResult) || maxResult == 0)
      ) {
        maxResult = playArr[i]
      }
    }
    return maxResult == 0 ? false : maxResult
  }
  //顺子 三个相连
  const shunZi = player => {
    let maxResult = 0
    for (let k of player) {
      //只有10 J Q K A 要特殊处理
      // 2- 9都直接判断下一个
      let playArr = player.split('')

      for (let i = 0; i < playArr.length; i++) {
        let add2 = pokerList[pokerList.indexOf(playArr[i]) + 1]
        let add3 = pokerList[pokerList.indexOf(playArr[i]) + 2]
        if (add2 && add3 && (pokerList.indexOf(playArr[i]) > pokerList.indexOf(maxResult) || maxResult == 0)) {
          maxResult = playArr[i]
        }
      }
      return maxResult == 0 ? false : maxResult
    }
  }
  // 对子 仅有两个牌相同
  const duiZi = player => {
    if (baoZi(player)) return false
    let maxResult = 0
    let playArr = player.split('').sort() //先排列
    for (let i = 0; i < playArr.length; i++) {
      if (playArr[i] == playArr[i + 1] && (pokerList.indexOf(playArr[i]) > pokerList.indexOf(maxResult) || maxResult == 0)) {
        maxResult = playArr[i]
      }
    }
    return maxResult == 0 ? false : maxResult
  }

  const funList = [baoZi, shunZi, duiZi]
  funList.forEach(cur => {
    let result1 = cur[player1]
    let result2 = cur[player2]
    if (result1 && result2) {
      //两个都是
      result = result1 == result2 ? 0 : result1 > result2 ? 1 : -2
    }
  })
  //这下子好了 没有同样的特殊牌型出现
  funList.forEach(cur => {
    if (cur(player1) && !cur(player1)) {
      result = 1
    } else if (cur(player1) && !cur(player1)) {
      result = 2
    }
  })
  //最后一种好家伙 两个都没有特殊牌型
  //那就找出两个最大的牌然后比较

  const findMax = player => {
    let maxNum = 0
    for (let k of player) {
      if (pokerList.indexOf(k) > maxNum) maxNum = k
    }
    return k
  }
  result = findMax(player1) > findMax(player1) ? 1 : -2
  return result
}
