## Referrence docuemntation

1. https://web.dev/rail/

## The way to check performance

### Devtool

1. Throttle your CPU to simulate a less-powerful device 通过节流 CPU 来模拟功能较弱的设备。

2. Throttle the network to simulate slower connections. 限制网络以模拟较慢的连接。

3. View main thread activity to view every event the occured on the main thread while you wre recording. 在表中查看主线程活动，以根据占用最多时间的活动对活动进行排序。

4. Analyze frames per second(FPS) to measure whether your animations truly run smoothly. 分析每秒帧数（FPS），以衡量动画是否真正流畅运行。

5. Monitor CPD usage, JS heap size, DOM nodes, layout per second, and more in real-time with the Perfoemance Monitor.Monitor CPU usage, JS heap size, DOM nodes, layouts per second, and more in real-time with the Performance Monitor.使用 Performance Monitor 实时监视 CPU 使用率，JS 堆大小，DOM 节点，每秒布局等。

6. Visualize network request that occcured while you wre recording with the Network section.可视化在使用“网络”部分进行记录时发生的网络请求。

7. Capture screenshots while recording to play back exactly how the page looked while the page loaded, or an animation fired, and so on.可视化在使用“网络”部分进行记录时发生的网络请求。

8. View interactions to quickly identify what happened on page after a user interacted with it. 记录时捕获屏幕快照，以准确播放页面加载或动画触发时页面的外观。

9. View interactions to quickly identify what happened on a pge after a user interated with it. 查看交互以快速确定用户与页面交互后在页面上发生了什么。

10. Find scroll performancec issues in real-time by highlighting the page whenever a potentially problematic listen fires.每当潜在的有问题的侦听器触发时，通过突出显示页面来实时查找滚动性能问题。

11. View paint events in real-time to identify costly paint events that may be harming the performance of your animations.实时查看绘画事件，以识别代价高昂的绘画事件，这些事件可能会损害动画的性能。

### Lighthouse

- Max Potential First Input Delay. Estimates how long your app will take to respond to user input, based on main thread idle time.最大潜在第一输入延迟。根据主线程空闲时间，估计您的应用需要多长时间来响应用户输入。

- Does not use passive listeners to improve scrolling performance.不使用被动侦听器来提高滚动性能

- Total Blocking Time. Measures the total amount of time that a page is blocked from responding to user input, such as mouse click, screen taps, or keyboard presses.总阻塞时间。测量阻止页面响应用户输入（例如鼠标单击，屏幕敲击或键盘按压）的总时间。

- Time to Interactive. Measures when a user can consistently interact with all page elements.衡量用户何时可以与所有页面元素持续进行交互。

### Load

- Does not register a service worker that controls page and start url. A service worker can cache common resources on user's device, reducing time spent fetching resources over the network.不注册控制 page 和 start_url 的服务工作者。服务人员可以在用户设备上缓存通用资源，从而减少了通过网络获取资源所花费的时间。
- Page load is not fast enough on mobile networks.页面加载在移动网络上不够快。
- Eliminate render-blocking resources.消除渲染阻止资源。
- Defer offscreen images. Defer the loading of offscreen iamges until they're needed.延迟屏幕外图像。推迟加载屏幕外图像，直到需要它们为止。
- Properly size images. Don't serve images that are significantly larger than the size that's rendered in the module viewport.适当调整图像大小。请勿投放明显大于移动视口中渲染的图像的图像。
- Avoid chaining critical requests.避免链接关键请求。
- Does not use HTTP/2 for all of its resources.不要将 HTTP/2 用作所有资源。
- Efficiently encode images. 有效地编码图像。
- Enable text compression. 启用文本压缩。
- Avoid enormous network payloads.避免大量的网络负载。
- Avoid an excessice DOM size. Reduce network bytes by only shipping DOM nodes thats are needed for rendering the page.避免过多的 DOM 大小。通过仅交付呈现页面所需的 DOM 节点来减少网络字节。

### Summary

- Focus on the user.

- Respond to user input in under 100 ms.

- Produce a frame in under 10 ms when animating or scrolling.

- Maximize main thread idle time.

- Load interactive content in under 5000 ms.
