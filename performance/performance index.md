参考链接：

1. https://web.dev/
2. https://mp.weixin.qq.com/s/NYqdeQm5tnQZ1NrgL9vsJQ

##  LCP The largest contentful Paint 

### Definition

Reports the render time of the largest image or text block visible within the viewport, relative to when the page first started loading.

### How to know it

> performance - timings - LCP

### What is a good LCP score

To provide a good user experience, sites should strive to have Largest Contentful Paint of  2.5 seconds or less. To ensure you're hitting this targetfot moust of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.


### What element will change the LCP

Only the element's initial size and position in the viewport is considered


##  FID First Input Delay

### Definitionb

A user-centric metric for measuring load responsiveness for it quantifies the experience users feel when trying to interact with unresponsive pages —— a load FID ensure that the page is usable.

It measures the time from when a user first **interacts with a page** to then time when then browser is actually able to begin **processing event handles in response** to theat intaraction.

In short, the first Input Delay metric helps measures your user's first impression of your site's interactivity and responsivenss.

### what is a good FID score

Sites should strive to have a First Input Delay of 100 milliseconds or less. A good threshold to measure is the 75th persentile of page loads, segmented across mobile and desktop devices.

### What makes it delay

The browser is busy parsing and executing a large JS file loaded by yout app


### more
- **FCP First Contentfule Paint**
- **Time to Interactiive**
 ![svg](FCP-TTI-FID.svg)

 ### why only consider the first input

 - To make a good impression
 - The biggest interactivity issues we see on the web today occur during page load

 ### What counts as a first input

click ,taps, key pressss

### Something protect the FID

The developer sometimes would wrap their event handler logic in an asynchronous callback (`setTimeout()` or `requestAnimationFrame()`) in order to separate it from the task assocaited with the event. The result would be an improvement in the metric score but a lower response as percervied by the uesr. 


## CLS Cumulative Layout Shift

> A user-centric for measuring visual stability

### Definition

CLS measures the sum total of all individual layout shift  for wcery unexpected leyout shift that occurs during the entire lifespan of the page.

### Good CLD score
The CLS score of 0.1 or less 

### Layout shift score

> layout shift score = impact fraction * distance franction

For example for first
![](layout-shift-1.png)


#### impact fraction
In this image above there's an element that takes up half of the viewport in one frame. Then, in the next frame, the elemnt shift down by 25% of viewport height. The red, dotted rectangle indicated the union of hte element's visible area in both frames, which, in this case, is 75% of the total viewport, so its `impact fraction `is 0.75

#### Distance fraction

In this image, the largest viewport dimension is the heiht, and the unstable element has moved by 25% of the viewport hright, which makes the `distance frantion` 0.5

the layout shift score is `0.75 * 0.25 = 0.1875`

For example for second


