> 仓库地址 :https://github.com/lydiahallie/javascript-questions

### 1.求代码输出

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}
sayHi();
```

<details>
<summary>答案</summary>

```
undefined
Reference
```

这道题比较简单，var 声明的 name 变量在创建变量创建阶段为其分配内存空间，默认值为`undefined`，所以未赋值（初始化）前读取的时候就是`undefined`。

let（或者 const）声明的变量也会存在变量提升，但是与 var 不同的是，初始化的时候没有被提升，所以在初始化之前是不可以访问的，成为`暂时死区`。

在这里补充一个知识，

1. `var`声明的变量没有块级作用域也没有循环局部作用域，举个例子

```javascript
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

alert(i); // 10，"i" 在循环结束后仍可见，它是一个全局变量
alert(one); // 1，"one" 在循环结束后仍可见，它是一个全局变量
```

2. `var`允许重新声明并且会改变值，`let`不允许且会报 SyntaxError 错误

```javascript
let user;
let user; // SyntaxError: 'user' has already been declared
```

3. 注意 声明会被提升，但赋值不会

```javascript
function sayHi() {
  alert(phrase);

  var phrase = 'Hello';
}
sayHi();
```

等同于

```javascript
function sayHi() {
  var phrase; //在函数刚开始时变量声明

  console.log(phrase); //undefined
  phrace = 'Hello'; //当程序执行到这行时赋值
}
sayHi();
```

### 变量赋值可以分为三个阶段

1. 创建变量，分配空间
2. 初始化变量未 undefined
3. 赋值

- `let`在创建的过程被提升，但是初始化没有提升
- `var`的创建和初始化都被提升
- `function`的创建和初始化和复制都被提升

</details>
