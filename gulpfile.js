var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var sequence = require('gulp-sequence');
var mock = require('./dist/data/mock.js');
var fs = require('fs');
// var mincss = require('gulp-minify-css');
// var minjs = require('gulp-uglify');
// var minhtml = require('gulp-htmlmin');
var obj = {
    name: 'zs',
    pwd: 1234
};
var check = false;
// gulp.task('minCss', function() {
//     gulp.src('./src/css/*.css')
//         .pipe(mincss())
//         .pipe(gulp.dest('./dist/css'))
// });
// gulp.task('minJs', function() {
//     gulp.src('./src/js/**/*.js')
//         .pipe(minjs())
//         .pipe(gulp.dest('./dist/js'))
// });
// gulp.task('minHtml', function() {
//     gulp.src('./src/**/*.html')
//         .pipe(minhtml({
//             collapseWhitespace: true,
//             minifyJS: true,
//             minifyCSS: true
//         }))
//         .pipe(gulp.dest('./dist'))
// });
gulp.task('server', function() {
    gulp.src('dist')
        .pipe(webserver({
            port: 8000,
            host: 'localhost',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url, true).pathname;
                //console.log(pathname)
                //console.log(mock(pathname))
                if (req.url === '/login') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk)
                    });
                    req.on('end', function() {
                        var d = Buffer.concat(arr).toString();
                        var data = require('querystring').parse(d);
                        if (data.user == obj.name && data.pwd == obj.pwd) {
                            res.end('{"result":"success"}')
                            check = true;
                        } else {
                            res.end('{"result":"errors"}')
                        }
                        next()
                    })
                    return false;
                }
                if (req.url === '/loginhtml') {
                    res.end('{"result":"' + check + '"}')
                }
                if (/\/book/g.test(pathname)) {
                    //console.log(pathname)
                    res.end(JSON.stringify(mock(req.url)));
                }
                next()
            }
        }))
})
gulp.task('default', function(cb) {
    sequence('server', cb)
});