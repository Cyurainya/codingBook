// 狐进行了一次黑客马拉松大赛，全公司一共分为了N个组，每组一个房间排成一排开始比赛
// 比赛结束后没有公布成绩，但是每个组能够看到自己相邻的两个组里比自己成绩低的组的成绩
// 比赛结束之后要发奖金，以1w为单位，每个组都至少会发1w的奖金
// 另外，如果一个组发现自己的奖金没有高于比自己成绩低的组发的奖金，就会不满意
// 作为比赛的组织方，根据成绩计算出至少需要发多少奖金才能让所有的组满意。 

const example = [1,5,6,8,3,2,4,7]; 

function name(list) {
   if(list.length <= 0) return
   let sum = 0;
   let numberArr = [];
   for(let j = 0;j < list.length; j++){
      numberArr[j] = list[j]
   }
   for(let i = 0; i < list.length; i++){
      if(list[i] < list[i+ 1]){

      }
   }
}