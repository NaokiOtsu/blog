---
title: JavaScriptで要素の入れ替え - replaceChild, cloneNode
date: 2016-09-24 21:42:55
tags: js
---

ピュア(Vanilla)なJavaScriptでの要素の入れ替えのMEMOです。
例えばAとBの要素を入れ替えたい時などに使います。

## 実装方法
``` js
var clone_A = element_A.cloneNode(true);
var clone_B = element_B.cloneNode(true);

element_A.parentNode.replaceChild(clone_A, element_B);
element_B.parentNode.replaceChild(clone_B, element_A);
```

cloneNodeで要素のクローンを作った後に、replaceChildで置換します。
cloneNodeの引数は、nodeの子孫ノードも複製する場合はtrue
nodeのみを複製する場合はfalseとなります。