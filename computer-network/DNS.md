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

##### hostname 和 domain 的区别

主机名通常在局域网内使用，用过 hosts 文件，主机名就被解析到对应的 IP

域名通常在 INTERNET 上使用，但是如果本机不想使用 internet 上的域名解析，就可以就该 hosts 文件了
