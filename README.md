#定位项目 命令提示符执行cnpm install

### gulp常用地址：

gulp官方网址：[http://gulpjs.com](http://gulpjs.com)

gulp插件地址：[http://gulpjs.com/plugins](http://gulpjs.com/plugins)

gulp 官方API：[https://github.com/gulpjs/gulp/blob/master/docs/API.md](https://github.com/gulpjs/gulp/blob/master/docs/API.md)

gulp 中文API：[http://www.ydcss.com/archives/424](http://www.ydcss.com/archives/424)

在学习前，先谈谈大致使用gulp的步骤，给读者以初步的认识。首先当然是安装nodejs，通过nodejs的npm全局安装和项目安装gulp，其次在项目里安装所需要的gulp插件，然后新建gulp的配置文件gulpfile.js并写好配置信息（定义gulp任务），最后通过命令提示符运行gulp任务即可。

###### 安装nodejs -> 全局安装gulp -> 项目安装gulp以及gulp插件 -> 配置gulpfile.js -> 运行任务

#### 1、安装nodejs

1.1、说明：gulp是基于nodejs，理所当然需要安装nodejs；

1.2、安装：打开[nodejs官网](https://nodejs.org/en/)，点击硕大的绿色Download按钮，它会根据系统信息选择对应版本（.msi文件）。然后像安装QQ一样安装它就可以了（安装路径随意）。

#### 2、使用命令行（如果你熟悉命令行，可以直接跳到第3步）

2.1、说明：什么是命令行？命令行在OSX是终端（Terminal），在windows是命令提示符（Command Prompt）；

2.2、注：之后操作都是在windows系统下；

2.3、简单介绍gulp在使用过程中常用命令，打开命令提示符执行下列命令（打开方式：window + r 输入cmd回车）：

node -v查看安装的nodejs版本，出现版本号，说明刚刚已正确安装nodejs。PS：未能出现版本号，请尝试注销电脑重试；

npm -v查看npm的版本号，npm是在安装nodejs时一同安装的nodejs包管理器，那它有什么用呢？稍后解释；

cd定位到目录，用法：cd + 路径 ；

dir列出文件列表；

cls清空命令提示符窗口内容。