//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    //调用多模块（编译less后压缩css）
    // //确保本地已安装gulp-minify-css [cnpm install gulp-minify-css --save-dev]
    cssminify = require('gulp-minify-css'),
    //当less有各种引入关系时，编译后不容易找到对应less文件，所以需要生成sourcemap文件，方便修改
    //确保本地已安装gulp-sourcemaps [cnpm install gulp-sourcemaps --save-dev]
    sourcemaps = require('gulp-sourcemaps'),
    //当编译less时出现语法错误或者其他异常，会终止watch事件，通常需要查看命令提示符窗口才能知道，这并不是我们所希望的，所以我们需要处理出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）。
    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    //给css文件里引用url加版本号（根据引用文件的md5生产版本号）
    //确保已本地安装gulp-make-css-url-version [cnpm install gulp-make-css-url-version --save-dev]
    cssVersion = require('gulp-make-css-url-version'),
    //使用gulp-imagemin压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
    imagemin = require('gulp-imagemin'),
    //深度压缩图片
    //确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    pngquant = require('imagemin-pngquant'),
    //只压缩修改的图片。压缩图片时比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片，使用”gulp-cache”只压缩修改的图片，没有修改的图片直接从缓存文件读取（C:\Users\Administrator\AppData\Local\Temp\gulp-cache）。
    //确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]
    cache = require('gulp-cache'),
    //基本使用（给页面引用url添加版本号，以清除页面缓存）
    rev = require('gulp-rev-append');


//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    //gulp.src('src/less/index.less') //该任务针对的文件
    gulp.src('src/less/*.less')
    	.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    	//.pipe(cssVersion()) //给css文件里引用文件加版本号（文件MD5）注意摆放位置：放在生成css之后
        .pipe(less()) //该任务调用的模块
        .pipe(cssminify({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(cssVersion()) //给css文件里引用文件加版本号（文件MD5）注意摆放位置：放在生成css之后
        .pipe(sourcemaps.write())

        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css

    //gulp.src('src/css/*.css')
       // .pipe(cssVersion()) //给css文件里引用文件加版本号（文件MD5）
        //.pipe(cssmin())
        //.pipe(gulp.dest('dist/css'));
});

gulp.task('testImagemin', function () {
    gulp.src('src/image/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{removeViewBox: false}], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))

        .pipe(gulp.dest('src/image_compress'));
});

//gulp-rev-append 插件将通过正则(?:href|src)=”(.*)[?]rev=(.*)[“]查找并给指定链接填加版本号（默认根据文件MD5生成，因此文件未发生改变，此版本号将不会变）
gulp.task('testRev', function () {
    gulp.src('src/html/*.html')
        .pipe(rev())
        .pipe(gulp.dest('src/html'));
});

gulp.task('default',['testLess','testImagemin','testRev']); //定义默认任务


gulp.task('watch1', function () {
	//监听事件（自动编译less）
    gulp.watch('src/less/*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
});

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径