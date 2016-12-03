---
title: あるボタンを押した時のアニメーション効果を連打しても確実に付けさせたい
date: 2016-09-03 21:05:17
tags: 
---

あるボタンを押した時に、  
ぽよんと反応するようなアニメーション効果を与えたい。  
その要素を押したら、例えば `.click-animation`のような、ぽよんとするCSSアニメーションを付けたクラスを、付与させる事が多いが、そんな時の実装MEMO。  

要素を押した時に、`.click-animation`が既に付与されていたら、削除してから付与しないとアニメーションしなく、また削除して即付与してもアニメーションしないので、`setTimeout()`などで適当な一定時間待って付与する事が多かった。

``` js
$(target).removeClass('click-animation');
setTimeout(function() {
    $(target).addClass('click-animation');
}, 10);
```

もしくは、`webkitAnimationEnd`などを使って、アニメーション後にクラス削除などしていた。

``` js
$(target).addClass('click-animation');
$(target).on('webkitAnimationEnd', function() {
    $(target).removeClass('click-animation');
});
```

ただこれだと連打した場合に反応してくれない場合がある。
結論、`requestAnimationFrame`を使うと良さそう。

``` js
$(target).removeClass('click-animation');
requestAnimationFrame(function() {
    $(target).addClass('click-animation');
});
```

これだと高橋名人ばりに連打した場合も確実にアニメーション効果を与える事ができた。  
ブラウザの次のレンダリングフレームを待ってクラス付与してるから確実ということだろうか。

Google I/O 2016の<a href="https://github.com/GoogleChrome/ui-element-samples/blob/gh-pages/swipeable-cards/cards.js#L166-L175">実装サンプル</a>とかでも、`requestAnimationFrame`を使った要素の付与や削除をやってるようだった。
