import { BaseRouter } from './base.js'; 
export class HistoryRouter extends BaseRouter{
    constructor(list){
        super(list);
        this.handler();
        window.addEventListener('popstate', e=>{
            this.handler()
        })
    }
    handler(){
        this.render(this.getState())
    }
    //获取路由路径
    getState(){
        const path = window.location.pathname;
        return path ? path : '/'
    }

    //使用pushState方法实现压入功能
    //pushState不会触发popState事件，所以需要手动调用渲染函数
    push(){
        history.pushState(null,null,path);
        this.handler()
    }

    //使用replace实现替换功能
    //replaceState不会触发popState事件，所以需要手动调用渲染函数
    replace(path){
        history.replaceState(null,null.path);
        this.handler()
    }
    go(n){
        window.history.go(n)
    }
}
