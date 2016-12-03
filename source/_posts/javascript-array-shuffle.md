---
title: JavaScriptで配列をシャッフルさせる
date: 2016-09-22 21:41:44
tags:
---

[ピュア(Vanilla)なJavaScriptでの配列のシャッフル。

``` js
var targets = [1,2,3,4,5];
var results = [];
while (targets.length) {
    results.push(targets.splice(Math.floor(Math.random() * targets.length), 1)[0]);
}
console.log(results); // 例: [5, 1, 4, 3, 2]
```

## ただちょっと注意も
※ただこのやり方だと全く同じ配列が返されてしまう場合もある。
間違いなくシャッフルさせなければいけない時の記述はもう少し複雑になるが、下記を参照。

<a href="https://h2ham.net/javascript-%E3%81%A7%E9%85%8D%E5%88%97%E3%81%AE%E3%82%B7%E3%83%A3%E3%83%83%E3%83%95%E3%83%AB">JavaScriptで配列のシャッフル</a>