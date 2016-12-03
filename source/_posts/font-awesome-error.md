---
title: Font Awesomeで、「Failed to decode downloaded font」が出てしまう時
date: 2016-11-11 21:46:57
tags:
---

<a href="http://fontawesome.io/" target="_blank">Font Awesome</a>を使っていて、本番サイトで確認しようとしたら、
フォントが正しく出ていない... ローカルでは大丈夫だったのに..

そして、コンソールを見たら、
**「Failed to decode downloaded font」**
とか
**「OTS parsing error: incorrect file size in WOFF header」**
とか出ている様子。

## 原因
調べてみると、gitの改行コードを変換する仕組みによって起きてる模様だった。
参考: <a href="http://ts0818.hatenablog.com/entry/2016/04/01/225341" target="_blank">『Failed to decode downloaded font』から始まるエラー</a>

## 対策
gitのルートディレクトリにある、「.gitattributes」ファイルを開いて、
変換しないように下記を追加してあげると問題なかった。

```
# Denote all files that are truly binary and should not be modified.
... 中略
*.otf binary
*.eot binary
*.svg binary
*.ttf binary
*.woff binary
*.woff2 binary
```

もう一度、正しいフォントを格納して、git pushして確認したところ無事解決でした。
