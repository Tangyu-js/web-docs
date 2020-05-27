# 在linux Centos7 上安装jenkins

## 1. 安装jdk

> 使用jenkins需要java环境，需要安装jdk

1. 到[官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)下载jdk 

> 注意对应的系统和位数

2. 在linux服务器下新建文件目录

``` bash
  makedir java
```

3. 将下载好的jdk上传到linux上创建好的java文件夹下

4. 解压：  tar zxvf 压缩包名称 （例如：tar zxvf jdk-8u152-linux-x64.tar.gz）

5. 配置 /etc/profile （环境变量）

```bash
vi /etc/profile  #打开配置文件


# ...
for i in /etc/profile.d/*.sh /etc/profile.d/sh.local ; do
    if [ -r "$i" ]; then
        if [ "${-#*i}" != "$-" ]; then
            . "$i"
        else
            . "$i" >/dev/null
        fi
    fi
done

# 在这个中间配置以下三句
export JAVA_HOME=/java/jdk1.8.0_231  # jdk解压目录
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
# 在这个中间

unset i
# ...

```

6. 执行配置 

``` bash
source /etc/profile
```

7. 查看java版本看看是否成功

``` bash
java -version

# 显示如下内容表示成功
java version "1.8.0_231"
Java(TM) SE Runtime Environment (build 1.8.0_231-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.231-b11, mixed mode)

```

## 2. 安装jenkins

1. 获取jenkins仓库

``` bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key  # 导入jenkins包官方秘钥
yum install -y jenkins  # 安装jenkins 可能需要一些时间

# 或者
wget https://pkg.jenkins.io/redhat/jenkins-2.156-1.1.noarch.rpm
rpm -ivh jenkins-2.156-1.1.noarch.rpm

```
> 如果导入秘钥地址失效，请登录 [官方网站](https://pkg.jenkins.io/redhat/) 查找最新的秘钥地址


2. 修改jenkins配置文件

yum安装的jenkins配置文件在 /etc/sysconfig下

``` bash
vi /etc/sysconfig/jenkins  # 主要修改端口
```

3. 运行报错，找不到java路径

``` bash
Starting Jenkins bash: /usr/bin/java: No such file or directory  # 错误

# 查找java安装路径
whereis java
# 发现是 /java/jdk1.8.0_231/bin/java

# 打开jenkins启动脚本配置
vi /etc/rc.d/init.d/jenkins

# 找到如下内容

# Search usable Java as /usr/bin/java might not point to minimal version required by Jenkins.
# see http://www.nabble.com/guinea-pigs-wanted-----Hudson-RPM-for-RedHat-Linux-td25673707.html
candidates="
/etc/alternatives/java
/usr/lib/jvm/java-1.8.0/bin/java
/usr/lib/jvm/jre-1.8.0/bin/java
/usr/lib/jvm/java-1.7.0/bin/java
/usr/lib/jvm/jre-1.7.0/bin/java
/usr/lib/jvm/java-11.0/bin/java
/usr/lib/jvm/jre-11.0/bin/java
/usr/lib/jvm/java-11-openjdk-amd64
/usr/bin/java
"
# 修改 /usr/bin/java -> /java/jdk1.8.0_231/bin/java


/java/jdk1.8.0_231/bin/java

```

4. 解决问题后重新启动服务 systemctl start jenkins

> 在浏览器中打开网址，按照提示完成后续操作,注册账号

> 接下来是最简单的实现方法，通过deploy key的方式来配置构建暂时没看

5. 给jenkins安装必要插件

在jenkins设置中找到插件管理， 搜索nodeJs插件，安装

6. 找到全局工具配置

配置使用nodejs， 选择自动安装就行

7. 开始创建jenkins任务

 - 任务名字： 任务的名字决定jenkins会在构建的时候会在workspace下创建的文件名，关系到最终执行shell脚本
 - 源码管理： 填写需要构建的项目地址， 添加Credentials key授权获取代码， 并选择获取的分支
 - 构建环境选择：  Provide Node & npm bin/ folder to PATH  
 - 添加构建后操作： 选择执行shell, 最基本的代码如下

 ``` bash
cd /var/lib/jenkins/workspace/web-docs/ #进入Jenkins工作空间下 项目目录 
node -v #检测node版本（此条命令非必要）
npm -v #检测npm版本（此条命令非必要）
npm config set registry https://registry.npm.taobao.org #把npm源设置为淘宝源（这个你懂的）
npm config get registry #检测npm是否切换成功（此条命令非必要）
npm install #安装项目中的依赖
npm run docs:build #执行前端代码打包命令
cd docs/.vuepress/dist/
rm -rf result.tar.gz #删除上次打包生成的压缩文件（一般建议备份，不要直接删除，这边测试就无所谓啦）
tar -zcvf result.tar.gz * #把生成的项目打包成压缩包，方便移动到项目部署目录
cd /usr/share/nginx/html #进入web项目根目录
mv /var/lib/jenkins/workspace/web-docs/docs/.vuepress/dist/result.tar.gz ./  #移动刚刚打包好的项目到web项目根目录
tar -zxvf result.tar.gz #解压项目到dist目录
rm -rf result.tar.gz    #删除压缩包
 ```

8. 保存、开始构建
