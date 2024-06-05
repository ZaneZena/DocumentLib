# Docker

>  虚拟化容器 ，Docker 是基于 Go 语言实现的开源容器项目 它诞生于 2013 年年初 。
>
>  Docker 的构想是要实现“ Build Ship and Run Any App, Anywhere ”，即通过对应用的封装（ Packaging ）、分发（ Distribution ）、部署（ Deployment ）、运行（ Runtime ）生命周期进行管理，达到应用组件级别的“一次封装 ，到处运行” 
>
>  Docker 提供了高效、敏捷和轻量级的容器方案，并支持部署到本地环境和多种主流云平台 可以说 Docker 首次为应用的开发 、运行和部署提供了“ 一站式”的实用解决方案。

## Docker 的优势

- 快速分发和部署
- 通过容器来打包应用、解藕应用和运行平台
- 更高效的资源利用。 Docker 是内核级的虚拟化，可以实现更高的性能，同时对资源的额外需求很低 与传统虚拟机方式相比， Docker 的性能要提高 1 ~ 2 个数量级
- 更轻松的迁移和扩展。Docker 容器几乎可以在任意的平台上运行，包括物理机、虚拟机、公有云、私有云 个人电脑 服务器等
- 更简单的更新管理。 使用 Dockerfile ，只需要小小的配置修改，就可以替代以往大量的更新工作 所有修改都以增量的方式被分发和更新，从而实现自动化并且高效的容器管理

<br/>

## Docker 和 传统虚拟机 比较

| 特征     | 容器               | 虚拟机     |
| :------- | ------------------ | ---------- |
| 启动速度 | 秒级               | 分钟级     |
| 性能     | 接近原生           | 较弱       |
| 内存代价 | 很小               | 较多       |
| 硬盘使用 | 一般为 MB          | 一般为 GB  |
| 运行密度 | 单机支持上千个容器 | 一般几十个 |
| 隔离性   | 安全隔离           | 完全隔离   |
| 迁移性   | 优秀               | 一般       |

## 三大核心

- 镜像

  > Docker 镜像类似于虚拟机镜像，可以将它理解为一个只读的模板。 
  >
  > 镜像是创建 Docker 容器的基础

- 容器

  > Docker 容器类似于一个轻量级的沙箱， Docker 利用容器来运行和隔离应用
  >
  > 容器是从镜像创建的应用运行实例 它可以启动、开始、停止 删除，而这些容器都是彼此相互隔离、互不可见的

- 仓库

  > Docker 仓库类似于代码仓库，是 Docker 集中存放镜像文件的场所。

## Docker 安装

- Ubuntu 上安装 docker 

  ```
  sudo  apt install docker.io
  ```

## 镜像 image 的基本操作

1. 搜索镜像

```
docket search name
```

2. 获取镜像

```
docker  pull  name[:tag]
```

> 如果不显式指定 tag , 则默认 拉去 latest 版本、 镜像的 latest 版本意味着该镜像的内容会跟踪最新版本的变更而变化，内容是不稳定的。 

3. 查看本地镜像信息

```
docker  images   
docker  image  ls 
```

4. 删除镜像

```
docker image rm  [-f] name[:tag]
```

5. 导出镜像文件到本地

```
docker  save  -o  <导出的文件名.tar>  -output <存储的路径>   name[:tag]
```

6. 导入镜像

```
docker  load  -i  <导入的文件名> -input <导入的路径>
```

7. 创建镜像

```
docker  build  -t  <repository>:<tag>  <dest> 

docker build -t  haredot/qikux:1.0  .
```

>  -t  列表 tag 标签列表 
>
>  -build-arg  :  设置 编译镜像需要用到的参数、可以覆盖 ARG 中指定的默认值 

### 基于Dockerfile 创建镜像 image

- FROM :  创建镜像的基础镜像

  ```
  FROM   openjdk:17
  ```

>  FROM 配置指令 必须出现在 Dockerfile 的第一行命令中， 一个镜像只能有一个 FROM,  但一个 Dockerfile 中 可以配置多个 镜像， 定义多个 FROM

- ARG :  定义创建镜像过程中使用的变量

  ```
  ARG  JAR_FILE=qikux.jar
  ```

  > 设置 临时变量及 默认值。  在执行 docker builder 命令的时候，可以通过 -build-arg  给变量赋值 、 当 镜像编译成功后， ARG 定义的变量 将不再存在。

- LABEL :  定义镜像的元数据标签信息

  ```
  LABEL  kundianhuo@sina.com  haredot
  ```

- EXPOSE :  声明 镜像内 服务监听的 端口 (可以监听多个端口、以 空格分隔)

  ```
  EXPOSE  8080
  ```

- ENV :  指定环境变量 

  ```
  ENV APP_version=l.0
  ```

  > 和 ARG 不同的时候， 镜像编译后，该变量依旧存在。

- WORKDIR

  ```
  WORKDIR /path/to/workdir
  ```

  > 为后续的 RUN ，  CMD ， ENTRYPOINT 指令配置工作目录 , 后续命令中如果使用 相对路径， 会生效。

- ENTRYPOINT :  镜像默认 入口命令

  ```
  ENTRYPOINT  ["java",  "-jar" ,  "qikux.jar"]
  ```

  > 每个 Dockerfile 中 只能由一个 ENTRYPOINT , 当指定多个的时候，最后一个生效。
  >
  > ENTRYPOINT 支持两种格式：
  >
  > 1. ENTRYPOINT ["executable", "paraml ", "param2"]  使用 exec 方式执行 
  > 2. ENTRYPOINT command param 1 param2    使用 shell 中执行

- VOLUME :  生成一个数据卷挂载点

  ```
  VOLUME  /temp
  ```

  > 运行容器时可以从本地主机或其他容器挂载数据卷， 一般用来存放数据库和需要保存的文件等

- USER   : 指定 运行容器时的用户 或 用户ID

  ```
  USER  haredot
  ```

- RUN :   运行指定的命令 

  ```
  RUN  apt install mysql 
  ```

- CMD  :  启动容器时，默认执行的命令

  ```
  CMD  ["java" , "-jar",  "qikux.jar"]
  ```

  > CMD 指令用来指定启动容器时默认执行的命令,  每个 Dockerfile 中 只能由一个CMD  , 当指定多个的时候，最后一个生效。
  >
  > i. CMD ［"executable“，“param”，  “param2” ］：相当于执行 executable param 1  param2 ，推荐方式；
  >
  > ii. CMD command paraml param2 ：在默认的 Shell 中执行，提供给需要交互的应用；
  >
  > iii. CMD  ["paraml"，“param2”] ：提供给 ENTRYPOINT 的默认参数

- ADD  :  添加内容到镜像 

  ```
  ADD  target/qikux-1.0.jar  /qikux.jar
  ```

  
  ```
  ADD <src> <dest> 指令 将复制指定的＜src＞路径下内容到容器中的＜dest＞路径下 ， 
  src 是 Dockerfile 所在目录 的一个相对路径 (文件/目录) 、也可以是一个 URL,  
  还可以是一个 tar(会自动解压为目录)
  dest  是 docker 镜像内的 绝对路径、  或者 相对于 WORKDIR 的一个 相对路径
  ```

- COPY  : 复制内容到镜像

  ```
  COPY  target/qikux-1.0.jar  /qikux.jar
  ```

  > 作用和 ADD 相同、如果是拷贝本地文件，推荐使用 COPY

###  .dockerignore 忽略文件

> 作用 和用法 类似于 .gitignore  , 忽略 不与需要 docker 管理 文件/目录。
>
> dockerignore 文件中模式语法支持 Golang 风格的路径正则格式：
>
> `*` ： 表示任意多个字符
>
> `?`:  表示单个字符
>
> `!` : 表示不匹配  （即不忽略指定的文件/目录）

### 部署 SpringBoot 项目到 Docker 步骤

1. 在 Linux 上 修改 docker 开机自启 配置文件  /usr/lib/systemd/system/docker.service 文件

   ```
   ...
   [Service]
   Type = notify
   ExecStart = /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock  -H  tcp://0.0.0.0:2375  - H unix:///var/run/docker.sock
   ...
   ```

>  在 ExecStart 后面添加   -H  tcp://0.0.0.0:2375  - H unix:///var/run/docker.sock (方便后面 idea 自动部署项目到  docker)

2. 重新加载 并启动 docker 

   ```
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

3. 在 项目的根下新建一个 Dockerfile 文件，内容如下(示例)

   ```dockerfile
   # 指定镜像的基础源
   FROM openjdk:17
   
   # 指定维护者信息
   LABEL maintainer="haredot2023@gmail.com 1.0"
   
   EXPOSE 8080
   # 拷贝 jar 到 docker 中
   COPY target/qikux-zhaopin-1.0.jar /zhaopin.jar
   
   # 指定容器启动时执行的命令
   ENTRYPOINT ["java", "-jar", "/zhaopin.jar"]
   ```

4. 在 idea 开发工具中 安装 docker 插件 (如已安装、可自行忽略该步骤)   File -> settings ->  plugins 

5. 配置 并 链接 Linux 远程 docker    File ->  settings ->  Build  Exection Deployment -> Docker  -> (点击 + 号)  ->  在 TCP socket 中输入  tcp://192.168.10.139:2375  （IP地址为 Linux docker所在系统的IP地址）看到 Connection Successful 即可！

6. 在 pom.xml 中 添加 docker 插件

   ```xml
   <plugin>
       <groupId>com.spotify</groupId>
       <artifactId>docker-maven-plugin</artifactId>
       <version>1.2.2</version>
       <executions>
           <execution>
               <id>build-image</id>
               <phase>package</phase>
               <goals>
                   <goal>build</goal>
               </goals>
           </execution>
       </executions>
       <configuration>
           <dockerHost>http://192.168.10.139:2375</dockerHost>
           <imageName>qiku/${project.artifactId}</imageName>
           <imageTags>
               <imageTag>${project.version}</imageTag>
           </imageTags>
           <forceTags>true</forceTags>
           <dockerDirectory>${project.basedir}</dockerDirectory>
           <resources>
               <resource>
                   <targetPath>/</targetPath>
                   <directory>${project.build.directory}</directory>
                   <include>${project.build.finalName}.jar</include>
               </resource>
           </resources>
       </configuration>
   </plugin>
   ```

>  execution 配置 当 在 maven 中执行 package 命令的时候， 会自动在 docker 中 build 构建镜像
>
>  dockerHost  设置 docker 镜像 地址
>
>  imageName 设置 镜像名 
>
>  imageTags  设置 镜像 Tag 
>
>  dockerDirectory  设置 Dockerfile 的 路径
>
>  resource 设置 要拷贝的 jar 的路径 

7. 在 maven 中 执行 mvn  package 命令 就会自动将 代码 部署并分发到 docker 服务中

8. 在 docker 中 运行 系统即可

   ```
   sudo  docker  run  -d  -p  8080:8080  --restart=always  --name haredot  qikux/<artifactId>:<version>  ;
   ```

##  Docker 容器 container

Docker 中的 容器 是 镜像的 运行实例。不同的是 镜像是一个静态的 只读文件，  而容器 是 带有运行时 可写的 文件层。 容器的应用进程 处理 运行状态。 

- 创建容器 

  ```
  docker  create  <repository>:<tag>  ;
  ```

>  创建一个 随机生成名字 的 容器，  也可以 通过  --name  设置容器的名字 。
>
>  使用 create 创建的容器 处于 停止状态， 可以通过  docker  start 命令启动它

- 启动 容器 

  ```
  docker  start  <containerName> ;
  ```

>  容器启动后，可以通过 docker  ps  命令 查看 运行的 容器 信息

- 停止容器 

  ```
  docker  stop  <containerName> ; 
  ```

- 创建并运行容器

  ```
  docker  run  -d  --name <containerName>  -p  8080:8080  <repository>:<tag>  --restart=always   -v  <volumeName>:/zhaopin/upload
  ```

> -d  :  是否在后台运行
>
> -p  :   将 docker 容器中的 应用程序 端口 映射到 外部 指定的端口上   8080:8080  第二个 端口代表 容器中 应用程序的  端口号 
>
> --name  : 设置容器的启动名称、 默认 随机 生成 
>
> --restart  :  容器的重启机制 ， 默认 no ,  如果 设置为 always 可以实现 docker 启动后 自动启动 该容器。
>
> -- v  :  配置数据源，用来 解决系统 上传的文件 临时存储在容器的问题。volumeName 是 数据卷的名字 。  /zhaopin/upload  是 服务器 文件上传的 前缀地址。

- 删除容器

  ```
  docker rm  [-f]  <containerName> ;
  ```

>  -f 强制删除 正在运行的 容器， 默认情况下 ，只能删除 终止 或 已退出 的容器 ，  可以通过 docker ps -a  查看所有容器的状态。

- 导出容器

  ```
  docker export -o  xxx.tar --output <导出的路径位置>  <containerName> 
  ```

- 导入容器

  ```
  docker  import xxx.tar  -  <repository>:<tag>
  ```

> 和  docker load 命令相似,   从容器快照文件导人时可以重新指定标签等元数据信息 , 容器快照文件将丢弃所有的历史记录和元数据信息。  load 命令导入存储文件会保存完整记录、文件体积更大。

- 查看容器内进程

  ```
  docker  top  <containerName> ;
  ```

- 更新容器

  ```
  docker  update  <options>  <containerName> ;
  ```

## Volume 数据卷

> 在Docker中，容器的文件系统是临时性的，默认情况下，当您删除容器时，容器中的所有上传文件数据都会丢失。要解决这个问题 有以下几种方案
>
> 1.   数据卷：  Docker 提供了数据卷的功能，它可以将容器中的特定目录或文件与主机的文件系统目录进行映射，从而使数据持久化存储，即使容器被删除，数据仍然保留在主机上。
> 2.   命名数据卷
> 3.   外部存储服务， 例如 OSS
> 4.   数据备份

- 创建数据卷

  ```
  docker volume create <volumnName>
  ```

- 删除数据卷

  ```
  docker  volume rm  <volumnName>
  ```

- 查看数据卷详情

  ```
  docker volume  inspect  <volumnName>
  ```

- 查看所有数据卷

  ```
  docker volume ls
  ```

