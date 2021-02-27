参考链接: [移动端 1px](https://juejin.cn/post/6844903877947424782)

## 一、产生原因

DPR 设备像素比 ：`window.devicePixelRatio = 物理像素/ CSS像素`

目前大多都是 DPR = 2. 所以如果设备的物理像素要实现 1 像素，DPR = 2 的手机的 css 像素只需要 0.5。但是一般设计稿是按照 750 涉及的，但是我们写 CSS 样式是以设备 275 为参考的。

## 二、解决方法

### 1. iOS 直接写 0.5px

### 2. 使用边框图片

有个缺点是图片要制作

```css
border: 1px solid transparent;
border-image: url('./../../image/96.jpg') 2 repeat;
```

### 3. box-shadow

```css
box-shadow: 0 -1px 1px -1px #e5e5e5, //上边线
  1px 0 1px -1px #e5e5e5,
  //右边线
  0 1px 1px -1px #e5e5e5, //下边线
  -1px 0 1px -1px #e5e5e5; //左边线
```

### 4、使用伪元素

将伪元素设置绝对定位，并且和父元素的左上角对齐，将 width 设置 100%，height 设置为 1px，然后进行在 Y 方向缩小 0.5 倍。

！ 伪元素可能影响浮动

one border

```css
.setonePx:{
          position:relative;
          &::after{
                position: absolute;
                content: '';
                background-color: #e5e5e5;
                display: block;
                width: 100%;
                height: 1px; /*no*/
                transform: scale(1, 0.5);
                top: 0;
                left: 0;
          }
```

four borders

```css
.setBorderAll {
  position: relative;
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }
}
```

### 设置 viewport 的 scale 值

```html
<html>
  <head>
    <title>1px question</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta
      name="viewport"
      id="WebViewport"
      content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <style>
      html {
        font-size: 1px;
      }
      * {
        padding: 0;
        margin: 0;
      }
      .top_b {
        border-bottom: 1px solid #e5e5e5;
      }

      .a,
      .b {
        box-sizing: border-box;
        margin-top: 1rem;
        padding: 1rem;
        font-size: 1.4rem;
      }

      .a {
        width: 100%;
      }

      .b {
        background: #f5f5f5;
        width: 100%;
      }
    </style>
    <script>
      var viewport = document.querySelector('meta[name=viewport]');
      //下面是根据设备像素设置viewport
      if (window.devicePixelRatio == 1) {
        viewport.setAttribute(
          'content',
          'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
        );
      }
      if (window.devicePixelRatio == 2) {
        viewport.setAttribute(
          'content',
          'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no'
        );
      }
      if (window.devicePixelRatio == 3) {
        viewport.setAttribute(
          'content',
          'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no'
        );
      }
      var docEl = document.documentElement;
      var fontsize = 32 * (docEl.clientWidth / 750) + 'px';
      docEl.style.fontSize = fontsize;
    </script>
  </head>
  <body>
    <div class="top_b a">下面的底边宽度是虚拟1像素的</div>
    <div class="b">上面的边框宽度是虚拟1像素的</div>
  </body>
</html>
```
