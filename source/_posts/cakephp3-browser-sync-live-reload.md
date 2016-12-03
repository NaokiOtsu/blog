---
title: CakePHP3とBrowserSyncでのLiveReload
date: 2016-10-29 21:45:10
tags:
---

[CakePHP3でWebアプリの開発をしていたが、
BrowserSyncを使ってLiveReloadさせて効率よく開発していきたい。そんな時のMEMO。

CakePHPでは

<pre><code>bin/cake server
</code></pre>

で、デフォルトは、 <code>localhost:8765</code> のサーバーが立ち上がるが、

まずはこれを、

<pre><code>bin/cake server -H {IPアドレス} -p 8765
</code></pre>

で起動させて、 {IPアドレス}:8765 で立ち上げておく。

そしてBrowserSync側では、optionsのproxyとportを設定すれば良さそう。

<pre><code>{
    proxy: "{IPアドレス}:8765",
    port: 4000
}
</code></pre>

これでBrowserSyncをstartさせたら、 
http://{IPアドレス}:4000/ もしくは http://localhost:4000 へのアクセスで問題なくLiveReload出来た。