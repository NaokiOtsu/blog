---
title: webpack + AutoPrefixerでFlexboxが一部端末で効かなかった時の設定メモ
date: 2017-03-13 05:29:33
tags:
---

実案件で、webpack + AutoPrefixerを使ってて、CSSの出力結果から `display: -webkit-flex;` とかが何故か抜けててしまってて、Android4系とか一部端末で横並びが効いてない事があったので、その時の実装メモ。

原因は、webpackとかのツールにもAutoPrefixerが含まれていて、そのツールを使ってAutoPrefixerを使うとそのツールのデフォルトのブラウザリストを使うので、結果的にプレフィックスを削除するよ、的な事のようでした。    
[https://github.com/postcss/autoprefixer#no-prefixes-in-production](https://github.com/postcss/autoprefixer#no-prefixes-in-production)

AutoPrefixerのブラウザ指定の設定は、 `browserslist` のファイルをルートに置くか、package.jsonのkeyに `browserslist` を設定する事が推奨されているようなので、package.jsonに設定を移す事で無事に解決できました。  

webpack2 + ReactでCSSモジュール構築した時も同じ問題に直面したので、package.jsonに移して解決した時のソースを残しておきます。  
[https://github.com/NaokiOtsu/Tips/tree/master/React/ReactCSSModule](https://github.com/NaokiOtsu/Tips/tree/master/React/ReactCSSModule)
