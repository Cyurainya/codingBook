function downloadImage (imgsrc, name) {
  let image = new Image();
  //解决跨域Canvas污染问题
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    let canvas = document.getElementById('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    let event = new MouseEvent('click');
    a.download = name || "photo"; // 设置图片名称  
    a.href = url; // 将生成的URL设置为a.href属性  
    a.dispatchEvent(event); // 触发a的单击事件 
  }
  image.src = imgsrc;
}

