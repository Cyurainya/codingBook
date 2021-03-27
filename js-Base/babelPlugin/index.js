const { transform } = require('@babel/core');

const fs = require('fs');

//读取需要转换的js字符串
const before = fs.readFileSync('./before.js', 'utf-8');

//使用babel-core的transform API和插件进行字符串 -> AST转化
const res = transform(`${before}`, {
  plugins: [require('./plugin')]
})

//存在after.js删除
fs.existsSync('./after.js') && fs.unlinkSync('./after.js')

//写入转化后的结果到after.js
fs.writeFileSync('./after.js', res.code, 'utf-8')