---
title: "给 Lookingglass 安个家：从 VPS、域名到 Debian 13 的第一天"
date: "2026-11-19"
summary: "第一次为个人博客购买 VPS 和域名：在 RackNerd 上部署 Debian 13，配置普通管理员、SSH 密钥、防火墙，并关闭远程密码与 root 登录。"
tags:
  - Lookingglass
  - VPS
  - Debian
  - Linux
  - SSH
  - 运维
---

# 给 Lookingglass 安个家：从 VPS、域名到 Debian 13 的第一天

一直在本地开发的 Lookingglass，终于要有自己的互联网地址了。

这个项目既是我的个人博客，也会容纳一些有游戏感的交互、故事和彩蛋。最省事的上线方式当然是找一个静态托管平台，推送代码就完事。但我还是想拥有一台自己管理的服务器，亲手走一遍 Linux、SSH、Nginx、HTTPS 和部署流程。对我来说，**把站点做出来**和**知道它是怎么运行在互联网上的**，都是很有意思的事情。

于是，2026 年 11 月 19 日，开始给 Lookingglass 安家。

> 本文是当天的操作记录，不是面向所有生产环境的通用安全基线。文中的价格、活动及服务条款会变化，具体以实际购买时的页面为准。出于安全考虑，不记录服务器 IP、密码、私钥、账单地址等信息。

## 1. 先买服务器：为什么选 VPS？

我希望先用一台机器承载博客的静态页面和浏览器端游戏，之后视情况再尝试轻量后端。现阶段不需要复杂的集群，也没有必要为了“专业”而过度设计。

最终选的是 RackNerd 的一款年付 VPS 套餐：

| 项目 | 套餐规格 |
| --- | --- |
| CPU | 2 vCPU |
| 内存 | 2 GB |
| 磁盘 | 35 GB SSD RAID-10 |
| 月流量 | 5 TB |
| 端口 | 1 Gbps |
| IPv4 | 1 个 |
| 价格 | **US$35.99 / 年** |

实际支付约人民币 241 元，汇率和支付渠道不同，最终金额也可能不同。

这不是说 2 GB 内存适合任何场景。它只是对**现阶段以静态内容为主的 Lookingglass**足够合适：预算低、资源能覆盖当下需求，还留了一点实验空间。

购买前我也特别确认了续费问题。客服回复，这个价格属于可按同样费率继续续订的方案；不过长期使用仍要以届时账单和服务条款为准。

另一个需要记住的事实是：**VPS 不等于托管服务**。系统更新、安全配置、数据备份，基本都得自己负责。尤其不能把“服务商提供了 RAID”当成“自己已经有备份”。

## 2. 再买域名：`lisaqueen.moe`

域名最后选择了：**`lisaqueen.moe`**。

`.moe` 的气质很适合这个项目，而且主域名下面可以自行配置子域名。比如以后真的需要拆分入口，可以使用 `blog.lisaqueen.moe`、`game.lisaqueen.moe` 等；这并不意味着现在就必须拆分部署。

注册过程倒是比想象中曲折：

- 在 Namecheap 搜索时，页面一度出现无法正常加载的提示，容易让人误以为域名有问题。
- 到 `.moe` 注册局的网站查询后，确认目标域名仍可注册。
- Cloudflare Registrar 当时不提供 `.moe` 的直接注册服务；但**注册商**和 **DNS/CDN 服务商**可以是不同的，因此不妨碍之后使用 Cloudflare DNS。
- 曾考虑过其他注册商，但遇到额外的身份核验流程；最后 Namecheap 的搜索恢复正常，成功下单。

实际订单费用是：

| 项目 | 金额 |
| --- | ---: |
| 域名首年注册 | US$8.48 |
| ICANN 费用 | US$0.20 |
| **合计** | **US$8.68** |

我开启了提供的域名隐私保护，没有购买额外的 DNS、虚拟主机或付费 SSL 产品：已经有 VPS，之后也计划用 Let's Encrypt 配置 HTTPS。

付款时还遇到了银行卡表单的校验提示，不过最终成功支付。域名注册成功后，控制面板显示为 **Active**，注册期为 **2026-11-19 至 2027-11-19**。

这里还顺便学到一点：域名注册成功并不等于网站已经能访问。**注册域名、设置 DNS 解析、部署 Web 服务、签发 HTTPS 证书**，是不同的环节。

## 3. 登录 VPS，确认 Debian 13 的基础状态

收到服务器交付邮件后，我先使用 SSH 连上 VPS，以 `root` 身份完成初次检查。

```bash
cat /etc/os-release
free -h
df -h /
whoami
```

结果很让人满意：

| 检查项 | 实际结果 |
| --- | --- |
| 系统 | Debian GNU/Linux 13.7 (trixie) |
| 内存总量 | 约 1.9 GiB |
| 当时已用内存 | 约 212 MiB |
| 当时可用内存 | 约 1.7 GiB |
| Swap | 1.0 GiB |
| 根分区 | 34 GiB，已用约 906 MiB |
| 登录身份 | root |

`free -h` 里的 `available` 比单纯的 `free` 更适合用来粗略观察可用内存，因为 Linux 会把部分空闲内存用作缓存，并在需要时回收。

下一步刷新软件包索引并升级系统：

```bash
apt update
apt upgrade
```

系统版本和基础资源都没问题，接下来才开始加固远程管理方式。

## 4. 不再天天用 root：创建管理员用户

一开始直接使用服务商交付的 `root` 账户很方便，但日常管理没必要一直用最高权限。

我创建了一个普通用户 `lisa`，安装 `sudo`，并赋予它管理员权限：

```bash
adduser lisa
apt install sudo
usermod -aG sudo lisa
id lisa
```

`id lisa` 的结果中出现 `sudo` 用户组，就说明组成员身份已经配置好。

需要强调的是：**加入 sudo 组并不会自动验证这个账户是否真的能够远程登录**。所以此时还不能急着禁用 root。

## 5. Windows → Debian：配置 SSH 密钥登录

相比直接使用服务器账户密码，我希望日后从自己的 Windows 电脑使用独立的 SSH 密钥连接。

在本地 PowerShell 里生成一对 Ed25519 密钥：

```powershell
ssh-keygen -t ed25519 -C "lookingglass-vps" -f "$env:USERPROFILE\.ssh\lookingglass_ed25519"
```

生成的两个文件用途不同：

| 文件 | 用途 |
| --- | --- |
| `lookingglass_ed25519` | **私钥，只保存在本地，不能公开** |
| `lookingglass_ed25519.pub` | 公钥，可以复制到 VPS |

我给私钥设置了口令（passphrase），然后在 PowerShell 查看公钥内容：

```powershell
Get-Content "$env:USERPROFILE\.ssh\lookingglass_ed25519.pub"
```

回到 VPS 上，创建 `lisa` 用户专用的 SSH 配置目录：

```bash
install -d -m 700 -o lisa -g lisa /home/lisa/.ssh
nano /home/lisa/.ssh/authorized_keys
```

把刚才复制的**公钥完整一行**写进 `authorized_keys`，保存后修正文件权限：

```bash
chown lisa:lisa /home/lisa/.ssh/authorized_keys
chmod 600 /home/lisa/.ssh/authorized_keys
```

接着**保留原来的 root 会话**，从 Windows 新开一个 PowerShell，测试登录：

```powershell
ssh -i "$env:USERPROFILE\.ssh\lookingglass_ed25519" lisa@<服务器公网IP>
```

登录后检查：

```bash
whoami
sudo whoami
```

分别返回 `lisa` 和 `root`，说明新账户既能登录，也能在需要时通过 `sudo` 管理服务器。

这里有一个非常值得记住的操作原则：**涉及远程登录的配置，先验证新路径可用，再关闭旧路径。**

## 6. 配置 UFW：先放行 SSH，再开启防火墙

服务器有了管理员账户和密钥认证后，我开始限制不必要的入站网络连接。

先确认当前 SSH 实际使用的端口：

```bash
echo "$SSH_CONNECTION"
```

输出的最后一项是服务端 SSH 端口。下面以常见的 `22` 端口为例；如果实际不是 22，必须换成真实端口。

```bash
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
```

先确认已添加的规则：

```bash
sudo ufw show added
```

确认 SSH 端口已经被允许之后，才启用防火墙：

```bash
sudo ufw enable
sudo ufw status verbose
```

随后保持现有 SSH 会话不退出，再打开一个本地终端重新登录。新连接成功，才说明没有把自己关在门外。

此时我还没有安装 Nginx，所以暂时不开放 `80/tcp`、`443/tcp`。等准备对外提供网页时再按需开放即可。

## 7. 收紧 SSH：禁用远程 root 和密码认证

防火墙验证完成后，继续加固 SSH。

先查看主配置有没有引用额外的配置目录：

```bash
grep -n 'Include' /etc/ssh/sshd_config
```

然后将项目相关的安全选项独立放进：

`/etc/ssh/sshd_config.d/00-lookingglass-security.conf`

文件内容：

```sshconfig
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
```

四行配置的含义很明确：禁止 root 通过 SSH 远程登录，关闭密码和键盘交互认证，保留公钥认证。

这里有个容易忽略的细节：**配置文件写对了，不代表最终生效值一定对**。OpenSSH 可能同时读取多个配置文件，选项出现顺序会影响实际结果。

因此先执行语法检查，再检查最终配置：

```bash
sudo /usr/sbin/sshd -t
sudo /usr/sbin/sshd -T | grep -E '^(permitrootlogin|passwordauthentication|kbdinteractiveauthentication|pubkeyauthentication) '
```

期望结果包含：

```text
permitrootlogin no
pubkeyauthentication yes
passwordauthentication no
kbdinteractiveauthentication no
```

确认无误后再重载 SSH：

```bash
sudo systemctl reload ssh
sudo systemctl status ssh --no-pager
```

最后在 Windows 另开终端验证：`lisa` 可以用密钥登录；密码认证被拒绝；`root` 远程登录被拒绝。全部成功后，本轮安全初始化才算完成。

## 8. 今天完成了什么？

从最初选购基础设施，到第一次真正登录自己的 Debian VPS，今天已经完成了：

- [x] 购买 RackNerd VPS
- [x] 注册 `lisaqueen.moe`
- [x] 确认 Debian 13 系统、内存、Swap 与磁盘状态
- [x] 更新系统软件包
- [x] 创建 `lisa` 管理员账户
- [x] 配置 Ed25519 SSH 密钥登录
- [x] 启用 UFW，并确认 SSH 没被误拦截
- [x] 禁止 SSH 远程 root 登录及密码认证
- [ ] 安装和配置 Nginx
- [ ] 部署 Lookingglass 静态站点
- [ ] 配置域名 DNS 与 HTTPS
- [ ] 建立自动部署与备份机制

整个过程最重要的收获，并不是记住了多少条命令，而是逐渐建立起一种操作顺序：**每改动一项可能让服务器失联的配置，就先保留可用连接、确认有效配置、再从新终端验证。**

现在 `lisaqueen.moe` 已经注册，Debian 也准备就绪，但网站还没有正式上线。下一步，就该让 Nginx 接过这台服务器的第一个网页请求了。

*一个自己的小世界，从一台 2 GB 内存的服务器开始。喵。*
