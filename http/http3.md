# HTTP3

## TCP VS UDP

- 基于 TCP 开发的设备和协议非常多，兼容困难
- TCP 协议栈是 Linux 内部的重要部分，修改和升级成本很大
- UDP 本身是无连接的、没有建链和拆链成本
- UDP 的数据包无队头阻塞问题
- UDP 改造成本小

## http2.0 仍存在的问题

QUIC 协议 存在的意义在于解决 TCP 协议的一些无法解决的痛点

- 多次握手：TCP 协议需要三次握手建立连接，而如果需要 TLS 证书的交换，那么则需要更多次的握手才能建立可靠连接，这在如今长肥网络的趋势下是一个巨大的痛点
- 队头阻塞：TCP 协议下，如果出现丢包，则一条连接将一直被阻塞等待该包的重传，即使后来的数据包可以被缓存，但也无法被递交给应用层去处理。
- 无法判断一个 ACK 是重传包的 ACK 还是原本包的 ACK：比如 一个包 seq=1, 超时重传的包同样是 seq=1，这样在收到一个 ack=1 之后，我们无法判断这个 ack 是对之前的包的 ack 还是对重传包的 ack，这会导致我们对 RTT 的估计出现误差，无法提供更准确的拥塞控制
- 无法进行连接迁移：一条连接由一个四元组标识，在当今移动互联网的时代，如果一台手机从一个 wifi 环境切换到另一个 wifi 环境，ip 发生变化，那么连接必须重新建立，inflight 的包全部丢失

![tcp](https://img-blog.csdnimg.cn/20200922123855517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

**谷歌决定在 UDP 基础上改造一个具备 TCP 协议优点的新协议也就顺理成章了，这个新协议就是 QUIC 协议。**

## QUIC 协议和 HTTP3.0

- QUIC 提高了当前正在使用 TCP 的面向连接的 Web 应用程序的性能。它在两个端点之间**使用用户数据报协议（UDP）建立多个复用连接来实现此目的**
- QUIC 的次要目标包括**减少连接和传输延迟**，在每个方向进行带宽估计以避免拥塞。它还将拥塞控制算法移动到用户空间，而不是内核空间，此外使用**前向纠错（FEC）进行扩展，以在出现错误时进一步提高性能**

![ip-http3.0](https://img-blog.csdnimg.cn/20200922124129106.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

### 0 RTT 建链

衡量网络建链的常用指标是 `RTT Round-Trip Time`，也就是数据包一来一回的时间消耗。

RTT 包括三部分：**往返传播时延、网络设备内排队时延、应用程序数据处理时延**。

- 传输层 0RTT 就能建立连接

- 加密层 0RTT 就能建立加密连接

- 比如上图左边是 HTTPS 的一次完全握手的建连过程，需要 3 个 RTT。就算是 Session Resumption，也需要至少 2 个 RTT。
- 基于 TCP 协议和 TLS 协议的 HTTP2.0 在真正发送数据包之前需要花费一些时间来完成握手和加密协商，完成之后才可以真正传输业务数据。
  但是 QUIC 则第一个数据包就可以发业务数据，从而在连接延时有很大优势，可以节约数百毫秒的时间

**但是 0 RTT 分首次连接和非首次链接**

#### 首次连接：

![first-connection](https://img-blog.csdnimg.cn/20200922125320566.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

#### 非首次连接

- 前面提到客户端和服务端首次连接时服务端传递了 config 包，里面包含了服务端公钥和两个随机数，客户端会将 config 存储下来，后续再连接时可以直接使用，从而跳过这个 1RTT，实现 0RTT 的业务数据交互。
- 客户端保存 config 是有时间期限的，在 config 失效之后仍然需要进行首次连接时的密钥交换。

## 总结

- 更好的连接建立方式
- 更好的拥塞控制
- 没有队头阻塞的多路复用
- 前向纠错
- 连接迁移

1. https://blog.csdn.net/wolfGuiDao/article/details/108729560
