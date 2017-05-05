---
title: JavaScriptでCSSの値を取得する / getComputedStyleとparseInt,parseFloat
date: 2017-02-10 07:03:28
tags:
---

# getComputedStyle

普段、jQueryなどを使っていたら `.css()` などを使うので、ほとんど使わないメソッドだとは思うんですが、ピュア(Vanilla)なJavaScriptでCSSの値を取得したい時は、 `window.getComputedStyle()` を使うと取得できます。  
IE9以上のモダンブラウザで使用出来ます。  

例えば要素の高さを取得したい時は、下記のように取得できます。  

```
var element = document.getElementById('target');
window.getComputedStyle(element, null).height; // `30px` など
```

第一引数が取得したいDOM要素、第二引数は基本的にnullで `:before` 要素とかを取得したい時に ':before' などを指定すると良さそうです。  

# parseIntとparseFloat

この時、例えば `30px` など `px` が入った文字列が取得できるのですが、これを `30` など数値のみに変換したい事も出てきます。  
自分は数値変換では `Number()` を使う事が多いんですが、 `Number()` だと数値に変換出来ない文字列があった場合は `NaN` を返してしまうので、この場合は使えません。  

正規表現でやるのかなと思いましたがそんな事はなく、 `parseInt()` や `parseFloat()` を使うと柔軟に対応してくれそうです。  
 `parseInt()` は整数だけを解析、 `parseFloat()` は整数と浮動小数点の両方を解析してくれて、両方とも文字列の前の空白や最後の数値変換出来ない文字列は無視してくれます。

 ```
 parseInt('30px', 10); // 30
 ```

無事に数値のみ取得できました。  
良くわかってなかった部分の備忘録でした。  
