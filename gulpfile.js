var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('default', function () {
    return gulp.src('src/*')
        .pipe(zip('chrome_auto_player_dotinstall.zip'))
        .pipe(gulp.dest('app'));
});
