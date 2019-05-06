---
title: D3をwebpack2でbundleしてる時に、Objectでstyleやattrを設定したかったけどエラーが出てしまう件
date: 2017-05-16
---

[D3(Data-Driven-Documents)](https://d3js.org/)をwebpack2を使ってbundleしてる時に、styleやattrをobjectで設定したかったが、エラーが出てしまうので調べてみると、どうも昔は出来たがモジュールを分けたようで、object形式で指定したい時は、[d3-selection-multi](https://github.com/d3/d3-selection-multi)をimportして使ってください、という事だったので使う事にしたけど、うまく行かずハマってしまった...

つたない英語力で調べていくと、どうもwebpack側の設定が必要そうだった。
[https://github.com/d3/d3-selection-multi/issues/8](https://github.com/d3/d3-selection-multi/issues/8)

まずはwebpack側の設定に下記を追記し、
```js webpack.config.js
resolve: {
  alias: {
    'd3': 'd3/index.js'
  }
},
```

実際に使いたいJSでは、下記のように設定する事で無事に解決できた。
```js index.js
import * as d3 from 'd3';
import "d3-selection-multi";

d3.select("body").append("div")
  .attrs({
    title: "A cheery, timeless greeting.",
    class: "greeting"
  })
  .text("Hello, world!");
```

package.jsonは下記のような形。
```json package.json
"dependencies": {
  "d3": "^4.8.0",
  "d3-selection-multi": "^1.0.1"
},
"devDependencies": {
  "babel-core": "^6.24.1",
  "babel-loader": "^7.0.0",
  "babel-preset-es2015": "^6.24.1",
  "webpack": "^2.5.1",
  "webpack-dev-server": "^2.4.5"
}
```

もうこれからは言い訳抜きで英語力が必要になってきたと感じる今日このごろ..
