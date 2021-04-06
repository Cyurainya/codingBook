# merge 和 rebase

## 共同点

> 都是讲一个分支提交合并到另一个分支上

### merge

![merge](https://mmbiz.qpic.cn/mmbiz_svg/SQd7RF5caa2crcv2atiarMHHTk0scF8ASF5uS052OXgUicxBULradgTMh1JwmBYOA4g03pB9JVdaM6yfjngmFVVmJuc3CBhv9ib/640?wx_fmt=svg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

保留了分支和历史提交目录，但同时也导致了提交历史会被大量的merge污染

### rebase


![merge](https://mmbiz.qpic.cn/mmbiz_svg/SQd7RF5caa2crcv2atiarMHHTk0scF8ASC28gOg3DslTb4cxCT2vQiaMKkaPC6wfuXTRiaC9pMvhm0ChLoRXjd3SogeaVu1Y7N7/640?wx_fmt=svg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)


它是将把所有的提交压缩成一个 patch 。然后把 patch 添加到目标分支里。rebase 与 merge 不同的是，rebase 通过为原始分支中的每个提交创建全新的 commits 来重写项目历史记录


## git merge vs git rebase
**git merge：**

- 记录下合并动作，很多时候这种合并动作是垃圾信息
- 不会修改原 commit ID
- 冲突只解决一次
- 分支看着不大整洁，但是能看出合并的先后顺序
- 记录了真实的 commit 情况，包括每个分支的详情

 **git rebase：**

- 改变当前分支 branch out 的位置
- 得到更简洁的项目历史
- 每个 commit 都需要解决冲突
- 修改所有 commit ID