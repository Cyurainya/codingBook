//babel插件模块需要我们暴露一个function,function内返回一个visitor对象
module.exports = function ({ types: t }) {
  return {
    visitor: {
      VariableDeclaration (path) {
        const node = path.node;
        ['let', 'const'].includes(node.kind) && (node.kind = 'var');
      },
      //箭头函数对应的访问者方法(节点)
      ArrowFunctionExpression (path) {
        //该路径对应的节点信息  
        let { id, params, body, generator, async } = path.node;

        //箭头函数我们可能把return简约掉
        if (!t.isBlockStatement(body)) {
          const node = t.returnStatement(body);
          body = t.blockStatement([node]);
        }

        //进行节点替换 (arrowFunctionExpression->functionExpression)
        path.replaceWith(t.functionExpression(id, params, body, generator, async));
      }
    }
  };
};

