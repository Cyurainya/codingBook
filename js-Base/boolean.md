```
if ([] == false) {console.log(1);};
if ({} == false ) {console.log(2);};
if ([]) {console.log(3);};
if ([1] == [1]) {console.log(4);};
//输出 1 3
```

### [] == false 是对的

false 转换为 0，[]也转换为 0

### {} == false 是错的

false 转换为 0，{}转换为 NaN
,m

### []是 true

空数组是`object`类型，会转为 true

### [1] == [1]是错的

两个引用类型的空间不一样

### ![] == []是对的

- ！的优先级大于 == ， []是 true, ![]是 false，变成`false == []`
- 根据规则**如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值**, false 转为 0=>`[]==0`
- 再根据规则**如果有一个操作数是对象，另一个操作数不是，则调用对象的 valueof 方法，用得到的基本类型值按照规则比较，没有 valueof 就调用 toString** ，` [].toString -> ''` ,又变成了`'' == 0`

- 再在根据规则 **如果有一个操作数是字符串，另一个操作数是数值，在比较之前先将字符串转换为数值**, `Number('') = 0` --> `0 == 0`

### {} == !{} ---> false

关键： `{}.toString() --> NaN`

- {} == ! {} -> {} == false -> {} == 0 -> NaN == 0 -> false