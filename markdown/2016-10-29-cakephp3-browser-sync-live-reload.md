---
title: CakePHP3とBrowserSyncでのLiveReload
date: 2016-10-29
---

CakePHP3でWebアプリの開発をしていましたが、
BrowserSyncを使ってLiveReloadさせて効率よく開発していきたい事があります。そんな時のMEMOを残しておきます。

## 実装方法
CakePHPでは

``` shell
bin/cake server
```

で、デフォルトは、 <code>localhost:8765</code> のサーバーが立ち上がりますが、

まずはこれを、

``` shell
bin/cake server -H {IPアドレス} -p 8765
```

で起動させて、 {IPアドレス}:8765 で立ち上がるようにします。

そしてBrowserSync側では、optionsのproxyとportを設定すれば良さそうです。

``` js gulpfile.js
{
    proxy: "{IPアドレス}:8765",
    port: 4000
}
```

これでBrowserSyncをstartさせたら、
http://{IPアドレス}:4000/ もしくは http://localhost:4000 へのアクセスで問題なくLiveReload出来ました。
