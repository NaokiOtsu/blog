---
title: git checkout --ours と --theirs - コンフリした時の対処
date: 2016-12-20
---

gitでコンフリした時に、通常だと差分を見て手動で解決していきますが、
HEAD側か、マージさせた側かに全ての変更を適用したい場合もあったりして、
その場合は、 `git checkout --ours` もしくは `git checkout --theirs` を使うと良いのですが、
どちらがどちらになるのかよく忘れてしまうので備忘録です。

![git checkout --ours or --theirs](/blog/images/git_checkout_ours_theirs.png)

`--ours`がHEAD側、`--theirs`がマージさせた側(自分が直前に作業した内容な事が多そうでしょうか)となるようです。
