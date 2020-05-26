# docker中使用mysql

## 搜索mysql镜像
``` bash
  docker search mysql
```

## 拉去下载镜像
``` bash
docker pull mysql // 一般指定版本
docker images // 查看镜像
```

## 创建并运行docker容器
<pre><code>docker run -p 3306:3306 --name mymysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql

docker ps // 查看启动的mysql  
docker ps -a // 查看所有的容器
</code></pre>

>- $PWD 为当前目录 
>- -p 3306:3306：将容器的 3306 端口映射到主机的 3306 端口。
>- -v $PWD/conf:/etc/mysql/conf.d：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。
>- -v $PWD/logs:/logs：将主机当前目录下的 logs 目录挂载到容器的 /logs。
>- -v $PWD/data:/var/lib/mysql ：将主机当前目录下的data目录挂载到容器的 /var/lib/mysql 。
>- -e MYSQL_ROOT_PASSWORD=123456：初始化 root 用户的密码。

## 运行和进入容器
<pre><code>docker start 容器id   // 运行一个容器 
docker start -d 容器id  // 在后台运行容器，关闭命令行不会停止
docker exec -it 容器id /bin/bash  // 进入容器，并打开命令行
</code></pre>

## 登录mysql
<pre><code>mysql root -p 123456  // 使用root账号和初始密码登录mysql

// 在mysql8.0版本 默认使用 caching_sha2_password 身份验证机制， 从原来的 mysql_native_password 更改为caching_sha2_password 客户端不支持新的加密方式。
需要执行以下操作：
  #更换密码的验证方式，然后进行刷新
  ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
  flush privileges;
</code></pre>