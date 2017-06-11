---
title: シンプルなSPA構築 director
date: 2017-05-06 20:27:22
tags:
---

2017年でこのポストはだいぶ時代遅れ間がありそうだけど、  
シンプルなSPA構築する時に便利なdirectorの使い方メモ。

そんなに大きくないアプリケーションとかで、  
jQueryとか流行りのフレームワークなしでシンプルにSPA構築したい時に  
自分で一からネイティブに実装しても良いとは思うけど、  
シンプルに使えるdirectorを使うと良さそう。  

[director](https://www.npmjs.com/package/director#history-api)  

Usageに使い方など載ってはいるけど、簡単なexampleを。  

directorのインストール  
```bash
yarn init -y
yarn add director # or npm install director --save
```

`#/hoge`と`#/fuga`へのアクセスで指定の関数を実行する例だとすると..  
```js
// app.js

var hoge = function() {
  console.log('hoge');
};

var fuga = function() {
  console.log('fuga');
};

var routes = {
  '/hoge': hoge,
  '/fuga': fuga
}

var route = new Router(routes);
route.init();
```

HTMLで`#/hoge`、`#/fuga`のリンク設定。  
```html
<ul>
  <li><a href="#/hoge">#/hoge</a></li>
  <li><a href="#/fuga">#/fuga</a></li>
</ul>
<script src="./node_modules/director/build/director.min.js"></script>
<script src="./app.js"></script>
```

小規模サイトでDOM操作もそんなに無いって要件の時は良いかもしれない。  

