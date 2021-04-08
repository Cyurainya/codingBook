// 狐进行了一次黑客马拉松大赛，全公司一共分为了N个组，每组一个房间排成一排开始比赛，
// 比赛结束后没有公布成绩，但是每个组能够看到自己相邻的两个组里比自己成绩低的组的成绩，
// 比赛结束之后要发奖金，以1w为单位，每个组都至少会发1w的奖金，另外，如果一个组发现自己的奖金没有高于比自己成绩低的组发的奖金，就会不满意，
// 作为比赛的组织方，根据成绩计算出至少需要发多少奖金才能让所有的组满意。

//重点是：如果一个组发现自己的奖金没有高于比自己成绩低的组发的奖金，就会不满意。所以当前的奖金应该要多于他相邻的成绩低（能看到）的奖金才会满意

//输入：每组数据先输入N，然后N行输入N个正整数，每个数表示每个组的比赛成绩。
//输出：输出至少需要多少w的奖金

//思路
// 初始化奖金数组为1，从左往右遍历成绩数组，若是右边分数大于左边分数，则将右边分配的奖金加1（知足大于左边的需求），从右往左遍历成绩数组，
// 若是左边分数大于右边分数，且左边分配的奖金小于（右边分配奖金+1）,则更新左边分配的奖金（知足大于右边的需求）
const list = [1, 5, 4, 2, 3, 1] //每个数表示每个组的比赛成绩

//思路1
//1.先给每人都算1
//两次遍历：①左到右，出现右边比左边的数高的，也就是右边看得到左边比自己分数小了，所以要这边就得增加了；②右往左遍历，左比右高分却没有高工资的话左边就得+1
//接着累加
function marathon1(list) {
  let n = list.length
  const moneyArr = new Array(n).fill(1)
  for (let i = 1; i < n; i++) {
    if (list[i] > list[i - 1]) {
      moneyArr[i] = moneyArr[i - 1] + 1
    }
  }
  //但是如果右边的分数比左边的低 但是工资没有他高就不可以了
  for (let i = n - 1; i >= 0; i--) {
    if (list[i] < list[i - 1] && moneyArr[i - 1] < moneyArr[i] + 1) {
      moneyArr[i - 1] = moneyArr[i] + 1
    }
  }
  let result = 0
  for (let k of moneyArr) {
    result += k
  }
  console.log(result)
}

//思路2
//1. 左右两边相等 都发1
//2. 左边低，右边+1
//3. 左边高，就要开始探讨了

function marathon2(list) {
  let n = list.length
  const money = []
  money[0] = 1
  for (let i = 0; i < n - 1; i++) {
    if (list[i] < list[i + 1]) {
      money[i + 1] = money[i] + 1
    } else if (list[i] == list[i + 1]) {
      money[i + 1] = money[i]
    } else {
      //list[i] > list[i + 1]
      money[i + 1] = 1
      for (let k = i + 1; k >= 0; k--) {
        if (list[k - 1] > list[k] && money[k - 1] <= money[k]) {
          money[k - 1] += 1
        }
      }
    }
  }
  let result = 0
  for (let i = 0; i < n; i++) {
    result += money[i]
  }
  console.log(result)
}
marathon2(list)
