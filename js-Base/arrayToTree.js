function start(id) {
    
    //另一种方法是用数组存储模拟微任务队列
    this.list = this.list ? this.list : [];
    this.list.push(()=>execute)(id);
    //然后判断上一个setTimeout执行完没有 上一个执行完了就执行下一个
    
}
for (let i = 0; i < 5; i++) {
    start(i);
}
function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
}
function execute(id) {
    return sleep().then(() => {
        console.log("id", id);
    });
}