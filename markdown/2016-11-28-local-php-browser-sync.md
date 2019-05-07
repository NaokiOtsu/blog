---
title: ローカルにPHP環境構築してBrowserSyncでLiveReload
date: 2016-11-28
---

MacのローカルにPHP環境構築して、<a href="https://www.browsersync.io/" target="_blank">BrowserSync</a>でLiveReloadさせた時のMEMOです。

## 実装方法
調べた結果、<a href="https://www.npmjs.com/package/gulp-connect-php" target="_blank">gulp-connect-php</a>を使うのが早そうでした。

``` shell
$ npm init -y
$ npm install -D gulp gulp-connect-php browser-sync
```

``` js gulpfile.js
var gulp        = require('gulp');
var connect     = require('gulp-connect-php');
var browserSync = require('browser-sync').create();

gulp.task('connect-sync', function() {
  connect.server({}, function() {
    browserSync.init({
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch(['./*.php', './*.css', './*.js']).on('change', browserSync.reload);
});

gulp.task('default', ['connect-sync']);
```

これで <code>gulp</code> を叩いたら無事に構築出来ました。