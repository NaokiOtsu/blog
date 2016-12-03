---
title: ボタンのデザインを変えずに、クリック領域だけ広げるTips
date: 2016-09-18 21:37:05
tags:
---

「<a href="https://www.amazon.co.jp/CSS%E3%82%B7%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88-%E2%80%9547%E3%81%AE%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF%E3%81%A7CSS%E3%82%92%E8%87%AA%E5%9C%A8%E3%81%AB%E6%93%8D%E3%82%8B-Lea-Verou/dp/4873117666/ref=sr_1_1?ie=UTF8&amp;qid=1474188594&amp;sr=8-1&amp;keywords=CSS%E3%82%B7%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88">CSSシークレット</a>」で書かれていた備忘録だが、
ボタンのデザインは変えたくない、でもクリックできる領域を広げたい時のTips。

## 実装方法
擬似要素を使って下記のように実装する。

``` css
.target {
    position: relative;
}
.target:before {
    content: '';
    position: absolute;
    top: -15px; bottom: -15px; right: -15px; left: -15px;
}
```

上記の場合、ボタンの周りに15pxクリック領域が出来る。

## 他のやり方も
擬似要素を既に使っている時は、ボーダーを使ったやり方もある。

``` css
.target {
    border: 15px solid transparent;
}
```

この場合、ボタン領域に15pxの透明なボーダーが出来て領域が広がる。

もしこれでボタンの背景が広がってしまう場合は、background-clip: padding-box;を指定することで回避することもできる。

``` css
.target {
    border: 15px solid transparent;
    background-clip: padding-box;
}
```
