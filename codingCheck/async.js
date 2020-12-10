function wait() {
  return new Promise((resolve) => setTimeout(resolve, 2 * 1000));
}

async function main() {
  console.time();
  let a = wait();
  let b = wait();
  let c = wait();
  await a;
  await b;
  await c;
  console.timeEnd();
}
main();
