## 原理概括

1. ES6 代码输入
2. Babylon 进行解析得到 AST
3. plugin 用 babel-tranverse 对 ast 树进行遍历转译，得新的 AST 树
4. 用 babel-generator 用过 AST 树生成 ES5 代码

### babylun

`babel`使用的引擎是`babylon`
