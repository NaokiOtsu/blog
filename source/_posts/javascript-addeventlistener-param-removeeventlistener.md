---
title: addEventListenerに引数を渡しつつremoveEventListenerしたい時
date: 2016-09-22 21:38:36
tags:
---

全然スマートじゃないからもっと良い方法ありそうだけど、一応備忘録。

``` js
element.addEventListener('click', function onClick() {
    onClickHandler(onClick, '渡したい引数');
});

function onClickHandler(func, text) {
    console.log(text); // 渡したい引数
    element.removeEventListener('click', func);
}
```