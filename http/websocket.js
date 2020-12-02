function createWebsocket() {
  try {
    ws = new WebSocket(wsUrl);
    init();
  } catch (e) {
    console.log('catch');
    reconnect(wsUrl);
  }
}
function init() {
  ws.onclose = function () {
    console.log('链接失败');
    reconnect(wsUrl);
  };
  ws.onerror = function () {
    console.log('发生异常了');
    reconnect();
  };
  ws.onopen = function () {
    heartCheck.start();
  };
  ws.onmessage = function (event) {
    console.log('接收到销售');
    heartCheck().start();
  };
}
let lockReconnect = false;
function reconnect(url) {
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  tt && clearTimeout(tt);
  tt = setTimeout(function () {
    createWebsocket(url);
    lockReconnect = false;
  }, 4000);
}
let heartCheck = {
  timeout: 3000,
  serverTimeout: 5000,
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function () {
    let _this = this;
    //时间没有过时就可以清除定时器
    this.timeoutObj && clearTimeout(this.timeoutObj);
    //服务器时间没有过时
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(function () {
      ws.send('123456');
      _this.serverTimeoutObj = setTimeout(function () {
        ws.close();
      }, _this.serverTimeout);
    }, this.timeout);
  },
};
