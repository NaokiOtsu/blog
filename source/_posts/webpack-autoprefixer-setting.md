---
title: webpack + AutoPrefixerで、"display:-webkit-flex;"が消えてしまう問題
date: 2017-03-13 05:29:33
tags:
---

とある案件で、webpack + AutoPrefixerを使ってて、  
CSSの出力結果から `display: -webkit-flex;` とかが何故か抜けててしまってて、  
Android4系とかの一部端末で横並びが効いてない事があったので、その時の実装メモ。

[AutoPrefixerのドキュメント](https://github.com/postcss/autoprefixer#no-prefixes-in-production)に記載がありましたが、  
原因は、webpackとかのビルドツールにもAutoPrefixerが含まれていて、  
そのツールを使ってAutoPrefixerを使うとそのツールの  
デフォルトのブラウザリストを使うので、  
結果的にプレフィックスを削除するよ、的な事のようでした。    

AutoPrefixerのブラウザリストの設定は、   
`browserslist` のファイルをルートに置くか、  
package.jsonのkeyに `browserslist` を設定する事が推奨されているようなので、  
package.jsonに設定を移す事で無事に解決できました。  

webpack2 + ReactでCSSモジュールを構築した時も同じ問題に直面したりして、  
webpack.config.jsやgulpfile.jsなどに記載していたAutoPrefixerのBrowserlistを、  
こちらの[package.json](https://github.com/NaokiOtsu/Tips/blob/master/React/ReactCSSModule/package.json#L26-L30)のように記載して解消されました。  
