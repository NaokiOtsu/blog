---
title: addEventListenerに引数を渡しつつremoveEventListenerしたい時
date: 2016-09-22 21:38:36
tags: js
---

全然スマートじゃないので、もっと良い方法ありそうですが、、一応備忘録で残しておきます。

``` js
element.addEventListener('click', function onClick() {
    onClickHandler(onClick, '渡したい引数');
});

function onClickHandler(func, text) {
    console.log(text); // 渡したい引数
    element.removeEventListener('click', func);
}
```