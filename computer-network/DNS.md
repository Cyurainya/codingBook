[阮一峰的 DNS](https://www.ruanyifeng.com/blog/2016/06/dns.html)

[某博主的 DNS](https://juejin.cn/post/6844903752890056711)

## 概念
解析域名-》ip

## 具体步骤

1. 本地 hosts 文件
2. 本地 DNS 缓存
3. DNS 服务器缓存
4. DNS 服务器递归查找

### 本地 hosts 文件

windows 所在位置：C:\Windows\System32\drivers\etc\hosts

#### 主要内容：

1. 网络 ip 地址
2. 主机名或域名
3. 主机别名

#### hostname 和 domain 的区别

主机名通常在局域网内使用，用过 hosts 文件，主机名就被解析到对应的 IP

域名通常在 INTERNET 上使用，但是如果本机不想使用 internet 上的域名解析，就可以就该 hosts 文件了

### 本地 DNS 缓存

### DNS 服务器缓存

### DNS 服务器递归缓存

例子： tlab.cloud.tencent.com

**递归查询步骤**

1. 询问根域名，获取顶级域名`.com`的 name server 和 address，name server 就是顶级域名的名字，address 就是对应的 ip 地址

2. 询问顶级域名，获取二级域名的`tencen.com`的 name server 和 address

3.询问二级域名，获取三级域名` .cloud.tencent.com` 的 NS 和 A

4. 询问三级域名，获取四级域名` .tlab.cloud.tencent.com` 的 NS 和 A

5. 最后，将 `tlab.cloud.tencent.com `的 **ip 地址**返回给用户，并且**缓存**

6. 用户获取到真正的 ip 地址，并且**缓存**
