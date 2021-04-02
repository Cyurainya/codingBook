//十个异步任务 

const ajaxMax = 3; //最多三个
let ajaxNum = 0;//当前有多少个ajax正在执行
const result = [];//结果集
const list = [];//异步请求队列

const ajax = (id) => new Promise((resolve,reject)=>{
  setTimeout(()=>{
    console.log(id)
  },200)
})


function checkAjax(list){
  //list是十个异步任务
  while(ajaxNum < ajaxMax && list.length > 0){
    ajaxNum++;
    let nowAjax = list.shift();//要发送的请求
    nowAjax().then(res=>{
      console.log(res);
      checkAjax(list);      
    }).finally(()=>{
      ajaxNum--;
    });   
  }

}