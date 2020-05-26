# linux基本使用

## 修改主机登录密码

``` bash
passwd
# 输入新密码
```

## 修改主机ssh端口号 --ssh登录的端口

1. 修改/etc/ssh/sshd_config

``` bash
  vi /etc/ssh/sshd_config
  #Port 22         #这行去掉#号
  Port 20000      #下面添加这一行
```

2. 修改SELinux

``` bash
  yum -y install policycoreutils-python
  semanage port -l | grep ssh  # 查看ssh端口
  semanage port -a -t ssh_port_t -p tcp 20000  # 将2000端口
  semanage port -l | grep ssh # 确认端口添加成功
  systemctl restart sshd.service #重启ssh服务
```

3. 防火墙添加端口

``` bash
firewall-cmd --zone=public --add-port=2000/tcp --permanent
firewall-cmd --reload #重启防火墙
firewall-cmd --list-ports # 查看开放了哪些端口
firewall-cmd --state # 查看防火墙状态
```

## 使用shadowscoks实现科学上网

``` bash
1. yum -y update  # 更新
2. yum install -y python-setuptools && easy_install pip   # 安装python环境和pip工具
3. pip install shadowsocks  # 使用pip工具安装shadowsocks 
4. yum install libevent # 安装依赖
5. pip install greenlet
6. pip install gevent  安装gevent提高性能
7. yum clean all # 清除缓存
8. mkdir -p /home/shadowsocks  #在home文件夹下创建shadowsocks文件夹
9. vi /home/shadowsocks/ss.json  # 在shadowsocks文件夹下创建配置文件并写入内容
{
"server":"0.0.0.0",
"server_port":8111,
"local_address": "127.0.0.1",
"local_port":1080,
"password":"xxxxxx",
"timeout":300,
"method":"aes-256-cfb",
"fast_open": false,
"workers": 1
}

10. firewall-cmd --zone=public --add-port=8111/tcp --permanent  # 向防火墙开放配置的端口
11. firewall-cmd --reload  # 重启防火墙


12. ssserver -c  /home/shadowsocks/ss.json    >/dev/null 2>1&    #启动ssserver服务


``` 

## 启动服务 systemctl start xxxx.service

## 查看运行的服务 systemctl list-units --type=service

