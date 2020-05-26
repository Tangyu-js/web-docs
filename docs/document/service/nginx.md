# 在服务器上安装nginx

> nginx用来做做web服务

1. 安装

``` bash
sudo yum install epel-release   # 添加存储库
sudo yum install nginx   # 安装nginx
```

2. 启动

``` bash
sudo systemctl start nginx
```