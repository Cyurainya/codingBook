let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  
  function unknow(arr) {
    let i = 0,
      j = 0;
    let res=[arr[0][0]];
    let n = arr.length,
    m = arr[0].length;
    while(i < n && j < m){
        //每一列每一列地数
        let tempi = i , tempj = j;
        while(tempi < n && tempj >= 0){
            res.push(arr[tempi++][tempj--])
        }
        j < m - 1 ?j++:i++
    }
    return res;
  }
  console.log(unknow(arr));