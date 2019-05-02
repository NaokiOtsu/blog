---
title: Reactとwebpack2での環境構築
date: 2017-05-15
---

webpack2でReact環境を小さく構築する時の備忘録。
webpack-dev-serverでローカルサーバーを立ち上げて、Reactで単なる`hoge`を出力させるまで。

### 全体の構成図
```bash
/
├public
  └index.html 本番のhtmlファイル
└src
  └index.js 開発時のjsファイル
.babelrc
package.json
webpack.config.js
```

### package.jsonの作成
```bash
yarn init -y
```

### dependenciesなモジュールをインストール
```bash
yarn add react react-dom
```

### devDependenciesなモジュールをインストール
```bash
yarn add -D babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server
```

### .babelrcをルートに作成
```json .babelrc
{
  "presets": ["es2015", "react"]
}
```

### srcとpublicの2つのディレクトリを作成
```bash
mkdir src public
```

### publicの中に、index.htmlを作成
```html index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```

### webpack.config.jsを作成
```js webpack.config.js
const path = require('path');

const src_path = path.resolve(__dirname, 'src');
const public_path = path.resolve(__dirname, 'public');

module.exports = {
  entry: `${src_path}/index.js`,

  output: {
    path: public_path,
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: public_path // webpack-dev-serverのルートディレクトリ
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  }
};
```

### srcの中に、index.jsを作成
```js index.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>hoge</div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### package.jsonに"scripts"を追記する
```json package.json
{
  ...
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  ...
}
```

ここまでで環境構築が完了したので、
開発時は、`yarn start` すると`http://localhost:8080/`でローカルサーバー(LiveReroad)が立ち上がり、
本番時は、`yarn build` するとpublicにbundle.jsが書き出される。

※ただ`yarn build`は本番用のminifyなど何も入ってないので、本番用の設定は適宜入れる必要がある。
[https://webpack.js.org/guides/production-build/](https://webpack.js.org/guides/production-build/)

### [追記 2017/5/15]
PropTypesはクラスのstaticなプロパティで指定するのが流れのようで、
babelだと、`babel-plugin-transform-class-properties`を使う事が多そうなので追記しておく。

```bash
yarn add -D babel-plugin-transform-class-properties
```

```json .babelrc
{
  ...
  "plugins": ["transform-class-properties"] // 追記
}
```

PropTypesの設定例
```js Counter.js
...
import PropTypes from 'prop-types';

class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  }
  ...
}
```
