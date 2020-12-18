## 参考文章

[常见的设计模式](https://www.infoq.cn/article/judjspggczx7fkkhwucc)

### 构造函数设计模式

### 原型模式

## 模块设计模式

缺点：无法覆盖外部环境中创建的函数

```
function AnimalContainter() {
  const container = [];
  function addAnimal(name) {
    container.push(name);
  }
  function getAllAnimals() {
    return container;
  }
  function removeAnimal(name) {
    const index = container.indexOf(name);
    if (index < 1) {
      throw new Error('Animal not found in container');
    }
    container.splice(index, 1);
  }
  return {
    add: addAnimal,
    get: getAllAnimals,
    remove: removeAnimal,
  };
}
const container = AnimalContainter();
container.add('Hen');
container.add('Goat');
container.add('Sheep');
console.log(container.get()); //Array(3) ["Hen", "Goat", "Sheep"]
container.remove('Sheep');
console.log(container.get()); //Array(2) ["Hen", "Goat"]
```

### 单例模式

在仅需要创建一个实例的情况下（例如一个数据库连接），这个模式是必需的。在这个模式中，只能在关闭连接时创建一个实例，或者在打开新实例之前必须关闭已有的实例。此模式也称为严格模式，

它的一个缺点是**测试时的体验很差，因为它隐藏的依赖项对象很难挑出来进行测试**。

```
function DatabaseConnection () {
let databaseInstance = null;
// 追踪特定时间创建实例的数量
let count = 0;
function init() {
console.log(`Opening database #${count + 1}`);
// 现在执行操作
}
function createIntance() {
if(databaseInstance == null) {
databaseInstance = init();
}
return databaseInstance;
}
function closeIntance() {
console.log('closing database');
databaseInstance = null;
}
return {
open: createIntance,
close: closeIntance
}
}
const database = DatabseConnection();
database.open(); //Open database #1
database.open(); //Open database #1
database.open(); //Open database #1
database.close(); //close database

```

### 工厂对象

不需要创建构造函数就能创建对象，提供创建对象的接口

### 观察者模式

缺点：耦合度太高
