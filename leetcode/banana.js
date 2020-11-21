var minEatingSpeed = function (piles, H) {
  let left = 1;
  let right = Math.max(...piles);
  const canEat = (piles, speed, H) => {
    let sumTime = 0;
    for (let pile of piles) {
      sumTime += Math.ceil(pile / speed);
    }
    return sumTime <= H;
  };
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (canEat(piles, mid, H)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return right;
};
