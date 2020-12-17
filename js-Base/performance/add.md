## 使用 Service Worker 监控页面卡死/崩溃

### 背景

对于目前的前端监控而言：

- 有完善的错误上报方案
- 有科学的加载性能监控方案（performance 等）
- 以及部分运行时性能监控：
- FPS 监控：使用 requestAnimationFrame/setInterval 来计算每秒页面渲染次数，如 stats.js
- 内存监控：使用 chrome 的私有实现 window.performance.memory

然而，对于以上方法，无一不依赖于 JS 的执行，那对于 JS 无法执行的情况，如页面卡死/崩溃的时候又该如何监控呢？

本文将会对卡死/崩溃的上报进行一番探究和对比，并给出一种切实可行的方案。

## 方案一：使用 beforeunload + sessionStorage 监控页面是否卡死

```window.addEventListener('load', function() {
    sessionStorage.setItem('good_exit', 'pending');
    setInterval(function () {
    sessionStorage.setItem('time_before_crash', new Date().toString());
    }, 5000);
    });
    window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('good_exit', 'true');
    });
    if (sessionStorage.getItem('good_exit') &&
    sessionStorage.getItem('good_exit') !== 'true') {
    /_ 卡死了 _/
    alert('crashed on: ' + sessionStorage.getItem('time_before_crash'));
}
```

很朴素的方案：利用页面卡死以后 JS 无法执行的特性，在页面进来的时候开启定时器，每 5 秒去刷新一次标志，在退出时重置标志。这样一来，如果下一次进入页面的时候发现标志位状态不对，则可认为上一次页面没有被正常关闭，判断为卡死/崩溃
然而这个方案有着如下缺陷：

1. 如果页面卡死以后用户不选择刷新（很多时候卡死的时候连刷新和关闭都点不动，只能用任务管理器杀掉），那么由于 sessionStorage 的特性（页面关闭后被清理），实际上是无法成功上报的。

## 方案二： 使用 beforeunload + localStorage 监控页面是否卡死

既然页面关掉以后 sessionStorage 就没有了，那我我们是不是能把数据写入 localStorage 来保证数据存在呢？

但是对于 localStorage 来说，由于同源的页面会共同使用同一个 localStorage ， 那么方案一中的方法势必会导致页面间数据相互覆盖和错误上报等问题。

解决方案也很简单，只需要为每个页面单独生成一个 uniqueKey 即可。然后下次页面打开的时候，遍历 localStorage 中储存的数据，如果发现有超过阈值没有更新的数据，则认为该页面卡死。

```
const CRASH_TIME = 5000;
window.addEventListener('load', function() {
const uniqueKey = generatorKey();
localStorage.setItem(uniqueKey, {
timeBeforeCrash: +new Date()
});
setInterval(function () {
localStorage.setItem(uniqueKey, {
timeBeforeCrash: +new Date()
});
}, CRASH_TIME);
});
window.addEventListener('beforeunload', function () {
localStorage.removeItem(uniqueKey);
});
// 遍历 localStorage 中储存的数据，如果发现有超过阈值没有更新的数据，则认为该页面卡死。
for (let key in localStorage.valueOf()) {
const item = localStorage.getItem(key);
// 超过 CRASH_TIME 没有更新时间，则认为页面卡死
if (typeof item === 'object' && item.timeBeforeCrash && (+new Date() - item.timeBeforeCrash) > CRASH_TIME) {
// 执行上报等操作
localStorage.removeItem(key)
}
}
```

然而这个方法有其他缺点：

1. 上报不及时，用户必须下一次打开含有卡死检查的页面才能上报。

### 方案三： 使用 beforeunload + Service Worker 监控页面是否卡死

如果想要及时上报，那我们就需要一个在页面卡死的时候还能运行的家伙，很自然的就能想到 Web Workers 、 Shared Worker 、 Service Worker 这三兄弟了。

我们就卡死上报这个点，分别对比一下三兄弟的异同：

- Web Workers: 专属于一个页面，如果用户在 卡死阈值 内关闭页面，即这个时候页面实际已经卡死了，但是还没有到认为页面卡死的时间（比如 5 秒都没响应），WebWorkers 会在关闭的时候被销毁，那么就无法完成这次上报了
- Shared Worker: 同理，如果关联的页面全都关闭了，那这次上报也无法完成
- Service Worker: 生命周期较长，即使关联的页面都关闭了，也不会关闭自身。因此可以在所有关联页面都关闭的时候，完成上报工作
  现在我们只需要解决以下问题就可以获得一个卡死上报套餐：

1. 如何在页面和 Service Worker 间通信：
   网页可以通过 `navigator.serviceWorker.controller.postMessage API` 向掌管自己的 SW 发送消息。这条消息中，`event.source.id `可以拿到对应的 clientId , 那么有了 id 我们就可以通过 `clients.get(clientId)` 来拿到对应的 client ，最后再通过 `client.postMessage `就可以向对应的页面发送消息了。这就构成了一个双向的关系。
2. 如何检测页面卡死
   在这里，我们采用 Service Worker 发送心跳包的形式来检测页面是否卡死，如果在规定时间内有回包，则认为页面没有卡死。

   上报全家桶如下:

```
   // 主页面
   function sendMessageToSw(msg){
   navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg);
   }
   function tryToRegister() {
   sendMessageToSw({
   type: 'register',
   reportData: {
   url: location.href,
   }
   });
   }
   // 页面注册
   tryToRegister();
   // 心跳回包
   navigator.serviceWorker.addEventListener('message', function(event){
   if (event.data.type === 'checkHealth') {
   sendMessageToSw({type: 'keepHealth'});
   }
   });
   // 页面关之前发送退出信息
   window.addEventListener("beforeunload", function (event) {
   sendMessageToSw({
   type: 'unregister',
   })
   });
   // sw 代码
   const heartDetection = {};
   const CRASH_TIME = 5000;
   /\*\*
```

```
- @param {Object} client
- @param {Object} msg
- 给对应的 client 发送消息
  \*/
  function sendMessageToClient(client, msg){
  client.postMessage(msg);
  }
  /\*\*
- @param {String} id
- 给根据 id 给主页面发送心跳包并检测是否存活
- 下一个心跳包发送的的时候，上一个还没回来，则认为页面卡死
  \*/
  function checkHealth(id) {
  if (heartDetection[id]) {
  // 不健康就上报
  if (heartDetection[id].flag !== 'healthy') {
  reportCrash(heartDetection[id].reportData);
  removeCheck(id);
  return;
  }
  // 设置成不健康，下次定时器的时候检查
  heartDetection[id].flag = 'unhealthy';
  sendMessageToClient(heartDetection[id].client, {type: 'checkHealth'})
  }
  }
  /\*\*
- @param {String} id
- 清理心跳定时器并从 map 中移除
  \*/
  function removeCheck(id) {
  if (heartDetection[id]) {
  heartDetection[id].timer && clearInterval(heartDetection[id].timer);
  delete heartDetection[id];
  }
  }
  self.addEventListener('message', function(event){
  const sourceId = event.source.id;
  switch (type) {
  // 页面新来的时候注册
  case 'register':
  // 根据 id 拿到对应的页面
  self.clients.get(sourceId)
  .then(function(client) {
  heartDetection[sourceId] = {
  client: client,
  reportData: event.data.reportData,
  timer: setInterval(function() {
  checkHealth(sourceId);
  }, CRASH_TIME),
  flag: 'healthy',
  };
  client.postMessage({type: 'registerSuccess'})
  })
  .catch(function(err) {
  console.log(err);
  })
  break;
  // 页面关闭的时候会删除有关信息
  case 'unregister':
  removeCheck(sourceId);
  break;
  case 'keepHealth':
  if(heartDetection[sourceId]) {
  heartDetection[sourceId].flag = 'healthy';
  }
  }
  });
```

如果觉得上面代码收发消息这块不优雅，也可以使用 MessageChannel 来为每个页面单独注册消息，可以参考此文

### 进一步展望

#### 使用 indexDB 上报额外数据辅助定位

在 Service Worker 中上报页面卡死的时候，可能会希望额外上报一些用户操作等信息帮助定位。这个时候我们可以每次心跳的时候更新上需要上报的信息。但是如果信息量太大，则可能给页面带来进一步负担。
其实在 Service Worker 中，虽然不能访问 localStorage， 但却能够使用 indexDB，那我们现在可以将各种日志从主线程写入 indexDB， 然后在页面卡死时由 Service Worker 从 indexDB 中捞取日志上报到服务器来帮助定位。
更细粒度地记录页面卡顿
目前该方案只支持检测页面卡死，视阈值不同甚至可能有误报的风险（如卡死阈值为 5 秒，页面卡了 6 秒，实际上没卡死也被上报）。而且单一粒度的上报对进一步的分析并不友好。所以期望可以更细粒度地上报页面卡顿时间。

这里提供一个细化思路：

1. Service Worker 向页面发送心跳包，并记录时间戳，并启动一个 3 秒的定时器
2. 定时器在 3 秒后检查心跳包是否返回，如果没有返回，则启动一个 7 秒的定时器，在 7 秒后上报页面彻底卡死，并清理 Service Worker 的页面数据
3. 心跳包回包的时候对比发送的时间戳和接收的时间戳，大于 3 秒则上报页面无响应的时长，上报完成后清理定时器并回到步骤一；小于 3 秒则如方案 3 中所示，设置页面健康标志位，等待下一次检查
