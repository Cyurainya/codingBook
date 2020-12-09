let xhr = new XMLHttpRequest();
xhr.open('GET', '/article/xmlhttprequest/example/load');

xhr.send();

//收到相应之后
xhr.onload = function () {
  if (xhr.status != 200) {
    console.log('error');
  } else {
    console.log('done');
  }
};

//下载相应期间定期触发，报告已经下载了多少

xhr.onprogress = function (event) {
  if (event.lengthComputable) {
    console.log(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    console.log(`Received ${event.loaded} bytes`);
  }
};

xhr.onerror = function () {};
