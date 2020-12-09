function LazyMan(name) {
  let list = [];

  setTimeout(async () => {
    for (let i = 0; i < list.length; i++) {
      await list[i].cb();
      // if (!!list[i].cb && typeof list[i].cb.then === 'function') {
      //   await list[i].cb();
      // } else {
      //   list[i].cb();
      // }
    }
  }, 0);
  const actions = {
    eat: (foodName) => {
      list.push({
        cb: () => {
          console.log(`I am eating ${foodName}`);
        },
      });
      return actions;
    },
    sleep: (time) => {
      list.push({
        cb: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), time * 1000);
          });
        },
      });
      return actions;
    },
  };
  console.log(`I am ${name}`);
  return actions;
}

// LazyMan('Tony');
// LazyMan('Tony').sleep(2).eat('lunch');
// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
LazyMan('Tony').eat('lunch').eat('dinner').sleep(2).sleep(3).eat('junk food');
