---
title: さくっとLiveReload導入メモ
date: 2016-09-18 21:30:35
tags:
---

さっとローカルサーバーを立ち上げて、LiveReloadさせて作業する時のメモ。

## セットアップ
まずは作業場所で、セットアップ。

``` shell
$ npm init -y
$ npm i -g browser-sync # グローバルに入れてなかったら
$ npm i -D browser-sync
```

package.jsonにシェルを記載。

``` json package.json
"scripts": {
  "live": "browser-sync start --server --no-notify --files \"**/*\""
},
```

## npm run
<code>npm run live</code>を実行すると、ブラウザが開いてローカルサーバーが立ち上がり、
ファイルを監視して、LiveReload開始。
Sync時に右上に表示されるお知らせは無くしたかったので、<code>--no-notify</code>を付けてる。

``` shell
$ npm run live
```

オプションを付けたりしたい時は下記から
<a href="https://www.browsersync.io/docs/command-line#start">https://www.browsersync.io/docs/command-line#start</a>