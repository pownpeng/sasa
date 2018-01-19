const gulp = require("gulp");//加载gulp模块;
const connect = require("gulp-connect");//加载 gulp-connect 插件;
const babel = require("gulp-babel");//加载gulp-babel 插件；
const sass = require("gulp-sass-china");

gulp.task("html",()=>{
	return gulp
				.src(["*.html"])
			 	.pipe(gulp.dest("dist"))
			 	.pipe(connect.reload());//自动刷新;
});
gulp.task("watch",()=>{
	gulp.watch(["./style/*.scss","./script/*.js","*.html","./images/*.*","./json/*.json"],["sass","script","html","image","json"]);
});
gulp.task('server',function(){
    connect.server({
        root:'dist',  //以谁为服务器根目录
        port:8888,  // 端口号 
        livereload:true //开启自动刷新;
    });
});
gulp.task("sass",()=>{
	 return gulp.src('./style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
gulp.task("script",()=>{
     return gulp.src('./script/*.js')
    .pipe(gulp.dest('dist/script'));
});
gulp.task("image",()=>{
     return gulp.src('./images/*.*')
    .pipe(gulp.dest('dist/images'));
});
gulp.task("json",()=>{
     return gulp.src('./json/*.json')
    .pipe(gulp.dest('dist/json'));
});
gulp.task("default",["watch","server"]);