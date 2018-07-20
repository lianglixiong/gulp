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

   <img src="http://static.ydcss.com/uploads/2015/03/gulp-01.png" alt="">

#### 3、npm介绍


    3.1、说明：npm（node package manager）nodejs的包管理器，用于node插件管理（包括安装、卸载、管理依赖等）；

    3.2、使用npm安装插件：命令提示符执行npm install <name> [-g] [--save-dev]；

        3.2.1、<name>：node插件名称。例：npm install gulp-less --save-dev

        3.2.2、-g：全局安装。将会安装在C:\Users\Administrator\AppData\Roaming\npm，并且写入系统环境变量；  非全局安装：将会安装在当前定位目录；  全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的node_modules文件夹下，通过require()调用；

        3.2.3、--save：将保存配置信息至package.json（package.json是nodejs项目配置文件）；

        3.2.4、-dev：保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；一般保存在dependencies的像这些express/ejs/body-parser等等。

        3.2.5、为什么要保存至package.json？因为node插件包相对来说非常庞大，所以不加入版本管理，将配置信息写入package.json并将其加入版本管理，其他开发者对应下载即可（命令提示符执行npm install，则会根据package.json下载所有需要的包，npm install --production只下载dependencies节点的包）。

    3.3、使用npm卸载插件：npm uninstall <name> [-g] [--save-dev]  PS：不要直接删除本地插件包

        3.3.1、删除全部插件：npm uninstall gulp-less gulp-uglify gulp-concat ……???太麻烦

        3.3.2、借助rimraf：npm install rimraf -g 用法：rimraf node_modules

    3.4、使用npm更新插件：npm update <name> [-g] [--save-dev]

        3.4.1、更新全部插件：npm update [--save-dev]

    3.5、查看npm帮助：npm help

    3.6、当前目录已安装插件：npm list

#### 4、选装cnpm

4.1、说明：因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。32个！来自官网：`“这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”`；

4.2、官方网址：[http://npm.taobao.org](http://npm.taobao.org)；

4.3、安装：命令提示符执行npm install cnpm -g --registry=<strong>`https://registry.npm.taobao.org`</strong>；  注意：安装完后最好查看其版本号`cnpm -v`或关闭命令提示符重新打开，安装完直接使用有可能会出现错误；

注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm（以下操作将以cnpm代替npm）。