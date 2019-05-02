---
title: JavaScriptでペアな配列を作る時のMEMO
date: 2016-09-22
---

神経衰弱を作る時のような、[1, 1, 2, 2]のようなペアな値を持った配列が欲しい時の実装MEMOです。

``` js
var cards = [];
for (var i = 1; i &lt;= 2; i++) {
    cards[cards.length] = i;
    cards[cards.length] = i;
}
console.log(cards); // [1, 1, 2, 2]
```