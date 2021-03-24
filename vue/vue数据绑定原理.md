### 先搞清三个对象

- **Observer:** vue中的数据对象在初始化过程钟转换为Observer对象

- **Watcher:** 将模板和Observer对象结合在一起生成Watcher实例，Watcher是订阅者中的订阅者。

- **Dep:**  Watcher对象和Observer对象之间纽带，每一个Observer都有一个Dep实例，用来存储订阅者Watcher。

当属性变化会执行主题对象Observer的dep.notify方法， 这个方法会遍历订阅者Watcher列表向其发送消息， Watcher会执行run方法去更新视图。

### 所以其实可以这么回答

1. initState的时候将`data, prop, method, computed, watch`中的数据劫持，然后通过`Object.defineProperty`方法将相关对象转换为`Observer`对象

2. 然后再initRender方法中解析模板，通过`Watcher对象`，`Dep`对象与模板中的指令与对象的数据简历依赖关系，使用全局对象`Dep.target`实现依赖收集

3. 当数据发生变化时，setter被调用，触发Object.defineProperty中的`notify`方法，遍历该依赖李彪，然后update方法通知Watcher对试图进行更新

