# 小程序框架对比

## 为什么选用uniapp

## 产品简介

uniapp是一个使用vuejs开发跨平台应用的前端框架
![uni](https://cdn.nlark.com/yuque/0/2020/png/397315/1593512403017-b2bc6d81-cc81-437e-90cd-688da07516a9.png?x-oss-process=image%2Fresize%2Cw_746)

## 平台框架

![uniapp-function](https://cdn.nlark.com/yuque/0/2020/png/397315/1593582073998-549c4af4-54b8-42ab-8f37-fc829468cded.png?x-oss-process=image%2Fresize%2Cw_746)

- 跟很多大公司有合作
- 也有被阿里、华为、vivo等公司的编译器继承，助力跨端开发

## 跨端方案
- 多端兼容

## 原理

 uniapp遵循vuejs语法规范，vuejs是单文件、三段式结构。而小程序是多文件结构，有`wxml/wxss/js/json`,vuejs跟小程序都有一个逻辑层跟视图层双向去打动的工作方式

具体工作流程如下：

- `uniapp Runtime`将小程序的数据绑定功能托管给了vue；vue数据变更后，通过`uniapp Runtime`的数据同步机制将最新数据同步到小程序
- 小程序负责`视图层展示及用户交互`,用户在小程序视图中触发点击、滚动等操作后，先触发小程序的事件函数，再通过`uniapp Runtime`的时间代理机制触发Vue的时间函数，因为同样的收敛在vue上

![runtime](https://cdn.nlark.com/yuque/0/2020/png/397315/1593509697894-7f6d5825-6d08-44ba-948a-44324bf4f3d3.png?x-oss-process=image%2Fresize%2Cw_746)

##

## 参考文章:
1. [跨端开发框架深度横评之2020版](https://zhuanlan.zhihu.com/p/127915625)
2. [小程序全面测评](https://jelly.jd.com/article/6006b1055b6c6a01506c8818)
3. [小程序原理实现和思考](https://github.com/berwin/Blog/issues/49)

