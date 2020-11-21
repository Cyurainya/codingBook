let url = [
    'https://www.baidu.com/',
    'http://192.168.1.1',
    'http://192.168.1.1:8080',
    'https://news.163.com/18/1224/15/E3Q6EJDA0001875N.html#top',
    'https://baidu.com:80/?wd=wq&url=ksks#ddsx2',
    'http://192.168.1.1/p/#name',
    'https://neets.cc/subcriberlist?recommendInventoryId=QNZfMjCRQtS4z8MQrFa7qo',
  ],
  result = null,
  match = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9a-z]+)?/i,
  info = ['完整URL', '协议', '地址', '端口', '路径', '查询', '锚点'];
url.forEach((value) => {
  result = match.exec(value);
  console.log(
    '---------------------------------------------------------------------------------'
  );
  for (let i = 0; i < result.length; i++) {
    console.log(`${info[i]} = ${result[i]}`);
  }
});
