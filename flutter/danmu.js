// container 表示弹幕展示的容器
const containerPos = container.getBoundingClientRect();
const {
  left: containerLeft,
  width: containerWidth
} = containerPos;

// bullet 表示候选弹幕对象（下同）
const { width, right } = bullet.getBoundingClientRect();

// 计算弹幕移动速度
const moveV = (containerWidth + width) / duration;

// 弹幕需要移动的距离
const leftDistance = right - containerLeft;

// 弹幕剩余跑完时间（单位s）
const leftDuration = leftDistance / moveV;

// 弹幕参照容器定位
bullet.style.position = 'absolute';

// 弹幕出生点位（水平偏移量）
bullet.style.left = `${containerWidth}px`;

// pos是当前弹幕元素被分配到的轨道编号，channelHeight表示轨道高度
bullet.style.top = `${pos * channelHeight}px`;

// 弹幕水平向左运动
bullet.style.transition = `transform ${leftDuration}s linear 0s`;
bullet.style.transform = `translateX(-${right - containerLeft}px)`;

//所以其实每条弹幕进入之前都判断一下当前轨道是否能用就可以 不用把一个队列缓存了
function checkChannel () {
  //bullet表示候选弹幕元素
  //channel表示前一个存储进入轨道的弹幕对象
  const lastPos = channel.length - 1;
  const lastBullet = channel[lastPos];
  //如果前一条对象存在的话
  if (lastBullet) {
    const lastBulletPos = lastBullet.getBoundingClientRect();


    if (lastBulletPos.right > 0) {
      return true
    }
    //然后继续随机下一条的那幕
  }
}