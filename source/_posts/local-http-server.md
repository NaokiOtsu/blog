---
title: ローカルでHTTPサーバー立ち上げる時のメモ
date: 2019-02-24 11:28:20
tags:
---

Github PagesとかNetlifyなどの静的Webコンテンツを作ったとして、本番デプロイ前にローカルサーバーを立ち上げてサクッと確認したい時のメモ。
開発中は開発用サーバーでデバッグが基本になると思うけど、実際に `yarn build` とかで本番用のファイルが書き出されて、ユーザーの元に届くファイルの構成やサイズを確認したい時とかに。
いくつか方法がありそう。

# Pythonを使う時

```bash
cd build
python -m SimpleHTTPServer
```

# http-serverを使う時
[http-server](https://github.com/indexzero/http-server)

```bash
npx http-server -d build
```

# serveを使う時
[serve](https://github.com/zeit/serve)
Create React Appとかで `yarn build` するとこの方法が載っている

```bash
npx serve -s build
```


こういう確認の時だけ使うものは `npm install http-server -g` とかでグローバルに入れずに、npxで都度最新のモジュールをオンデマンドで走らせるのが良さそうですね。
