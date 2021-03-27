import { HashRouter } from './hash';
import { HistoryRouter } from './history';
import { ROUTELIST } from './routeList';
//路由模式
const MODE = 'hash';  

class WebRouter {
  constructor({ mode = 'hash', routeList }) {
    this.router = mode === 'hash' ? new HashRouter(routeList) : new HistoryRouter(routeList)
  }
  push(path) {
    this.router.push(path);
  }
  replace(path) {
    this.router.replace(path);
  }
  go(num) {
    this.router.go(num);
  }
}

const webRouter = new WebRouter({
  mode: MODE,
  routeList: ROUTELIST
});

