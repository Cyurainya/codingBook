//先顺序生成然后打乱
let a = new Array();
for (let i = 0; i < 100; i++) {
  a[i] = i;
}
a.sort(() => {
  return 0.5 - Math.random();
});
a.map((item) => console.log(item));
