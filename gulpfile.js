// 引入gulp
const gulp = require("gulp"),
    jshint = require("jshint"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    minhtml = require("gulp-minify-html"),
    mincss = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    imageminJpegRecompress = require("imagemin-jpeg-recompress"),
    imageminOptipng = require("imagemin-optipng"),
    cache = require("gulp-cache"),
    connect = require("gulp-connect"),
    runSequence = require("run-sequence");

gulp.task("hello", function(){
    console.log("hello hello hello");
});
gulp.task('sass', function(){
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});
gulp.task('minifyhtml', function(){
    return gulp.src('index.html')
        .pipe(minhtml())
        .pipe(gulp.dest('dist'))
    
    return gulp.src(['./html/*.html'])
        .pipe(minhtml())
        .pipe(gulp.dest('dist/html'));
});
gulp.task('minifycss', function(){
    return gulp.src('./css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('minifyjs', function(){
    return gulp.src('./js/*.js')
        .pipe(babel())
        .pipe(rename({suffix:'.min'})) // .min.js
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('minifyImage', function(){
    var jpgmin = imageminJpegRecompress({
        accurate: true,//高精度模式
        quality: "high",//图像质量:low, medium, high and veryhigh;
        method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
        min: 70,//最低质量
        loops: 0,//循环尝试次数, 默认为6;
        progressive: false,//基线优化
        subsample: "default"//子采样:default, disable;
    }),
    pngmin = imageminOptipng({
        optimizationLevel: 4
    });
    return gulp.src('image/*.{jpeg,jpg,png,gif,svg}')
        .pipe(cache(imagemin({
            use: [jpgmin, pngmin]
        })))
        .pipe(gulp.dest('dist/image'))
})
gulp.task("html", function(){
    return gulp.src(['index.html','./html/*.html'])
        .pipe(connect.reload());
})
gulp.task("css", function(){
    return gulp.src('./css/*.css')
        .pipe(connect.reload());
})
gulp.task("js", function(){
    return gulp.src('./js/*.js')
        .pipe(connect.reload());
})
gulp.task("image", function(){
    gulp.src('./image/*.{jpeg,jpg,png,gif,svg}')
        .pipe(connect.reload());
})
// gulp.task('sequence', function(cb){
//     runSequence(
//         'clean', // first: 清理目标目录
//         ['html','css','js','image'], // second: 打包
//         'watch', // third: 监控
//         cb
//     );
// })
gulp.task('watch', function(){
    gulp.watch(['index.html','./html/*.html'],['html']);
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./image/*.{jpeg,png,gif,jpe,svg}', ['image'])
})
gulp.task('connect', function(){
    connect.server({
        // root: '', // 服务器根目录
        port: 9999,
        livereload: true
    })
})
gulp.task('webConnect',['watch','connect']);