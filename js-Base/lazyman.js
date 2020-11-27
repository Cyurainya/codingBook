function chain() {
  let list = [];
  setTimeout(async () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].isSleep) {
        await list[i].cb();
      } else {
        list[i].cb();
      }
    }
  }, 0);
  console.log(`chain`);
  const obj = {
    eat: () => {
      list.push({
        isSleep: false,
        cb: () => {
          console.log('eating!!');
        },
      });
      return obj;
    },
    work: () => {
      list.push({
        isSleep: false,
        cb: () => {
          console.log('work');
        },
      });
      return obj;
    },
    sleep: (time) => {
      list.push({
        isSleep: true,
        cb: () =>
          new Promise((res, rej) => {
            setTimeout(() => res(), time * 1000);
          }),
      });
      return obj;
    },
  };
  return obj;
}
chain().eat().sleep(2).work().sleep(2);
