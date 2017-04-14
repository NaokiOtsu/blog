---
title: BrowserSync導入メモ
date: 2016-09-18 21:30:35
tags: browsersync
---

さっとローカルサーバーを立ち上げて、BrowserSyncさせたい時のメモ。

## セットアップ
まずは作業場所で、セットアップ。

``` shell
$ yarn init -y
$ yarn add -D browser-sync
```

package.jsonにシェルを記載する。

``` json package.json
"scripts": {
  "start": "browser-sync start --server --files '**/*'"
},
```

## yarn start でスタート
`yarn start`でブラウザが開いてローカルサーバーが立ち上がり、
ファイルを監視して、BrowserSyncが開始される。

Sync時に右上に表示されるお知らせは無くしたい時は、`--no-notify`を付けると良い。  
他にオプションを付けたい時は下記を参照すると良いです。  
[https://www.browsersync.io/docs/command-line#start](https://www.browsersync.io/docs/command-line#start)
