---
title: あるボタンを押した時のアニメーション効果を連打しても確実に付けさせたい
date: 2016-09-03
---

あるボタンを押した時に、
ぽよんと反応するようなアニメーション効果を与えたい時があります。
その要素を押したら、例えば `.click-animation`のような、ぽよんとするCSSアニメーションを付けたクラスを、付与させる事が多いのですが、そんな時の実装MEMOを残しておこうと思います。

## 従来の方法
要素を押した時に、`.click-animation`が既に付与されていたら、
削除してから付与しないとアニメーションしなく、
また削除して即付与してもアニメーションしないので、
`setTimeout()`などで適当な一定時間待って付与する事が多かったです。

``` js
$(target).removeClass('click-animation');
setTimeout(function() {
    $(target).addClass('click-animation');
}, 10);
```

もしくは、`webkitAnimationEnd`などを使って、アニメーション後にクラス削除などしていました。

``` js
$(target).addClass('click-animation');
$(target).on('webkitAnimationEnd', function() {
    $(target).removeClass('click-animation');
});
```

ただこれだと連打した場合に反応してくれない場合があります。

## 実装方法
`requestAnimationFrame`を使うと良さそうです。
``` js
$(target).removeClass('click-animation');
requestAnimationFrame(function() {
    $(target).addClass('click-animation');
});
```

これだと高橋名人ばりに連打した場合も確実にアニメーション効果を与える事ができました。
ブラウザの次のレンダリングフレームを待ってクラス付与してるから確実ということでしょうか。

Google I/O 2016の<a href="https://github.com/GoogleChrome/ui-element-samples/blob/gh-pages/swipeable-cards/cards.js#L166-L175">実装サンプル</a>でも、`requestAnimationFrame`を使った要素の付与や削除をやってるようでした。
