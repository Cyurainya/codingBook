async function subscribe() {
  let response = await fetch('/subscribe');
  if (response.status === 502) {
    //服务器错误 再次请求
    await subscribe();
  } else if (response.status !== 200) {
    showMessage(response.status != 200);

    //一秒后重新连接
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    let message = await response.text();
    showMessage(message);
    await subscribe();
  }
}
